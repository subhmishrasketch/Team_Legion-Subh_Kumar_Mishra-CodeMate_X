import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User as UserIcon, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "next-themes";
import codemateLogo from "@/assets/codemate-logo.png";

const Signup = () => {
  const { register, demoMode, setDemoMode } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [role, setRole] = useState<"student" | "admin">("student");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState<number | undefined>(undefined);
  const [skills, setSkills] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({
      name,
      email,
      password,
      role,
      department,
      semester,
      skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
      phone,
      linkedin,
      github,
    });
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen">
      {/* left branding similar to Login */}
      <div className="relative hidden flex-1 items-center justify-center overflow-hidden gradient-login lg:flex">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-primary/30 animate-float blur-3xl" />
        <div className="absolute bottom-10 right-[-60px] h-96 w-96 rounded-full bg-secondary/20 animate-float" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative z-10 flex flex-col items-center text-center px-8"
        >
          <img
            src={codemateLogo}
            alt="CodeMate"
            className="mb-6 max-h-28 max-w-28 rounded-2xl object-contain shadow-2xl animate-glow"
          />
          <h1 className="mb-2 font-heading text-4xl font-bold text-primary-foreground text-gradient">
            Join CodeMate
          </h1>
          <p className="mb-4 text-lg font-medium text-primary-foreground/90">
            Create an account to start collaborating.
          </p>
        </motion.div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-background p-8 relative">
        {/* theme toggle */}
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted transition-colors">
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-card/90 backdrop-blur-md rounded-2xl p-10 shadow-2xl"
        >
          <h2 className="mb-2 font-heading text-3xl font-bold text-gradient">
            Sign up
          </h2>
          <p className="mb-8 text-muted-foreground">
            {demoMode
              ? "Demo mode — fields will be ignored"
              : "Fill in the details to create your account"}
          </p>

          {/* demo mode switch */}
          <div className="mb-6 flex items-center gap-2">
            <label className="flex items-center gap-1 text-sm select-none">
              <input
                type="checkbox"
                checked={demoMode}
                onChange={(e) => setDemoMode(e.target.checked)}
                className="h-4 w-4 accent-primary"
              />
              Demo mode
            </label>
            <span className="text-xs text-muted-foreground">
              {demoMode ? "using canned users" : "enter real information"}
            </span>
          </div>

          {/* role toggle */}
          <div className="mb-6 flex rounded-lg bg-muted p-1">
            {(["student", "admin"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 rounded-md py-2 text-sm font-medium capitalize transition-all ${
                  role === r
                    ? "bg-card shadow-sm text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  disabled={demoMode}
                  className="h-11 w-full rounded-lg border border-border bg-card pl-10 pr-4 text-sm outline-none transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">College Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@college.edu"
                  disabled={demoMode}
                  className="h-11 w-full rounded-lg border border-border bg-card pl-10 pr-4 text-sm outline-none transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  disabled={demoMode}
                  className="h-11 w-full rounded-lg border border-border bg-card pl-10 pr-10 text-sm outline-none transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            {/* additional profile fields */}
            <div>
              <label className="mb-1.5 block text-sm font-medium">Department</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="CSE, Physics..."
                disabled={demoMode}
                className="h-11 w-full rounded-lg border border-border bg-card px-4 text-sm outline-none transition-all focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            {role === "student" && (
              <div>
                <label className="mb-1.5 block text-sm font-medium">Semester</label>
                <input
                  type="number"
                  value={semester ?? ""}
                  onChange={(e) => setSemester(Number(e.target.value))}
                  placeholder="6"
                  disabled={demoMode}
                  className="h-11 w-full rounded-lg border border-border bg-card px-4 text-sm outline-none transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            )}
            <div>
              <label className="mb-1.5 block text-sm font-medium">Skills (comma separated)</label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="React, Python, Node.js"
                disabled={demoMode}
                className="h-11 w-full rounded-lg border border-border bg-card px-4 text-sm outline-none transition-all focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                disabled={demoMode}
                className="h-11 w-full rounded-lg border border-border bg-card px-4 text-sm outline-none transition-all focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="mb-1.5 block text-sm font-medium">LinkedIn</label>
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="linkedin.com/in/yourname"
                  disabled={demoMode}
                  className="h-11 w-full rounded-lg border border-border bg-card px-4 text-sm outline-none transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex-1">
                <label className="mb-1.5 block text-sm font-medium">GitHub</label>
                <input
                  type="url"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="github.com/yourname"
                  disabled={demoMode}
                  className="h-11 w-full rounded-lg border border-border bg-card px-4 text-sm outline-none transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <button
              type="submit"
              className="h-11 w-full rounded-lg font-semibold text-primary-foreground gradient-cta transition-transform hover:scale-105"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have one?{' '}
            <Link to="/" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
