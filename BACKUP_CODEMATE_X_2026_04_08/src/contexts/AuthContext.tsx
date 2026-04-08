import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Role = "student" | "admin";

interface User {
  name: string;
  email: string;
  role: Role;
  initials: string;
  department: string;
  semester?: number;
  skills?: string[];
  phone?: string;
  linkedin?: string;
  github?: string;
  photo?: string; // base64 or URL
}

interface AuthContextType {
  user: User | null;
  /** whether the app is currently running in demo mode */
  demoMode: boolean;
  /** toggle demo mode; affects how login behaves */
  setDemoMode: (value: boolean) => void;
  /**
   * perform authentication; when demoMode is true this simply sets a
   * predefined user, otherwise it should call a real backend service.
   *
   * The credentials parameter is only used when demoMode is false.
   */
  login: (
    role: Role,
    credentials?: { email: string; password: string }
  ) => Promise<void>;
  /**
   * register a new user.  Demo mode will ignore the password and create a
   * fake user record; in production you would POST to your API.
   */
  register: (
    data: Partial<User> & { password: string }
  ) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USERS: Record<Role, User> = {
  student: {
    name: "Subh Mishra", email: "subhkumar.a.mishra24@slrtce.in", role: "student", initials: "SM",
    department: "IT", semester: 4, skills: ["React", "Python", "TypeScript", "ML/AI"],
    phone: "+91 8879298015", linkedin: "https://www.linkedin.com/in/subh-mishra-76a635374/", github: "https://github.com/subhmishrasketch?tab=repositories",
  },
  admin: {
    name: "Dr. Mehra", email: "admin@college.edu", role: "admin", initials: "DM",
    department: "Administration", phone: "+91 99887 76655",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [demoMode, setDemoMode] = useState(false);

  // restore session if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("currentUser");
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("failed to restore session", e);
    }
  }, []);


  const login = async (
    role: Role,
    credentials?: { email: string; password: string }
  ) => {
    if (demoMode) {
      // pick one of the canned demo users
      const demoUser = DEMO_USERS[role];
      setUser(demoUser);
      localStorage.setItem("currentUser", JSON.stringify(demoUser));
    } else {
      // NOTE: in a production setup you would call your backend API,
      // e.g. POST /api/login.  Here we stub out the HTTP request so
      // demo mode continues to work but the skeleton shows where the
      // MongoDB-connected server would be used.

      if (!credentials) {
        console.error("No credentials provided");
        throw new Error("Email and password required");
      }

      try {
        // Example fetch: replace URL with your real auth endpoint.
        const resp = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        if (!resp.ok) {
          const errText = await resp.text();
          throw new Error(errText || "Login failed");
        }
        const data = await resp.json();
        setUser(data.user);
      } catch (err) {
        // fallback to localStorage logic so the app still works offline
        console.warn("Remote login failed, falling back to local storage", err);
        try {
          const usersKey = "registeredUsers";
          const existingUsers = localStorage.getItem(usersKey);
          const allUsers = existingUsers ? JSON.parse(existingUsers) : [];
          const foundUser = allUsers.find(
            (u: any) => u.email === credentials.email && u.password === credentials.password
          );
          if (foundUser) {
            const { password, ...userWithoutPassword } = foundUser;
            setUser(userWithoutPassword);
            localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
          } else {
            throw err; // rethrow original
          }
        } catch (inner) {
          console.error("Login error:", inner);
          throw inner;
        }
      }
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const register = async (data: Partial<User> & { password: string }) => {
    if (demoMode) {
      // create a user from the supplied fields, ignoring password
      const initials = data.name
        ? data.name
            .split(" ")
            .map((s) => s[0].toUpperCase())
            .join("")
        : "";
      setUser({
        name: data.name || "",
        email: data.email || "",
        role: data.role || "student",
        initials,
        department: data.department || "",
        semester: data.semester,
        skills: data.skills,
        phone: data.phone,
        linkedin: data.linkedin,
        github: data.github,
      });
    } else {
      // real registration - save to localStorage
      try {
        // First attempt remote registration via API (Mongo backend)
        const resp = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!resp.ok) {
          const errText = await resp.text();
          throw new Error(errText || "Registration failed");
        }
        const result = await resp.json();
        setUser(result.user);
        // optionally you could sync this user into localStorage as a cache
        return;
      } catch (apiErr) {
        console.warn("Remote register failed, falling back to local storage", apiErr);
      }

      try {
        const usersKey = "registeredUsers";
        const existingUsers = localStorage.getItem(usersKey);
        const allUsers = existingUsers ? JSON.parse(existingUsers) : [];
        
        // Check if email already exists
        if (allUsers.find((u: any) => u.email === data.email)) {
          throw new Error("Email already registered");
        }

        // Create initials
        const initials = data.name
          ? data.name
              .split(" ")
              .map((s) => s[0].toUpperCase())
              .join("")
          : "";

        // Create new user object with password
        const newUser = {
          name: data.name || "",
          email: data.email || "",
          role: data.role || "student",
          initials,
          department: data.department || "",
          semester: data.semester,
          skills: data.skills,
          phone: data.phone || "",
          linkedin: data.linkedin || "",
          github: data.github || "",
          password: data.password, // Store password (in production, this would be hashed)
        };

        // Save to localStorage
        allUsers.push(newUser);
        localStorage.setItem(usersKey, JSON.stringify(allUsers));

        // Set user in state (without password)
        const { password, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword);
      } catch (err) {
        console.error("Registration error:", err);
        throw err;
      }
    }
  };

  const updateProfile = (data: Partial<User>) =>
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem("currentUser", JSON.stringify(updated));
      } catch (e) {
        console.warn("Unable to persist user profile to localStorage", e);
      }
      return updated;
    });

  return (
    <AuthContext.Provider
      value={{
        user,
        demoMode,
        setDemoMode,
        login,
        logout,
        register,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
