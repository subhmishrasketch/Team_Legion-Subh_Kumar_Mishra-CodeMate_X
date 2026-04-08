import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User as UserIcon, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import codemateLogo from "@/assets/codemate-logo.png";

const Signup = () => {
  const { register, demoMode, setDemoMode } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [role, setRole] = useState<"student" | "admin">("student");

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
  };
  const fieldVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState<number | undefined>(undefined);
  const [skills, setSkills] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name.trim()) {
      toast.error("Please enter your full name");
      return;
    }
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (!password.trim()) {
      toast.error("Please enter a password (min 6 characters)");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (!department.trim()) {
      toast.error("Please select your department");
      return;
    }

    setIsLoading(true);
    try {
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
      toast.success("Account created successfully! 🎉");
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Signup error:", err);
      toast.error(err.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* left branding with animated blobs (same as Login) */}
      <div className="relative hidden flex-1 items-center justify-center overflow-hidden lg:flex">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-teal-500/20 to-indigo-500/20 blur-3xl"
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tl from-indigo-500/20 to-blue-500/20 blur-3xl"
            animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full bg-gradient-to-br from-blue-500/10 to-teal-500/10 blur-3xl -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
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

      <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-8 relative">
        {/* theme toggle */}
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted transition-colors">
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={formVariants}
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

          <motion.form onSubmit={handleSignup} className="space-y-5" variants={formVariants}>
            <motion.div variants={fieldVariants}>
              <label className="mb-1.5 block text-sm font-medium">Full Name <span className="text-red-500">*</span></label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  required
                  disabled={demoMode}
                  className="h-11 w-full rounded-lg border border-border bg-card pl-10 pr-4 text-sm outline-none transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:scale-105"
                />
              </div>
            </motion.div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">College Email <span className="text-red-500">*</span></label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@college.edu"
                  required
                  disabled={demoMode}
                  className="h-11 w-full rounded-lg border border-border bg-card pl-10 pr-4 text-sm outline-none transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="min 6 characters"
                  minLength={6}
                  required
                  disabled={demoMode}
                  className="h-11 w-full rounded-lg border border-border bg-card pl-10 pr-10 text-sm outline-none transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            {/* additional profile fields */}
            <div>
              <label className="mb-1.5 block text-sm font-medium">Department <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="CSE, IT, ECE, ME..."
                required
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
                <label className="mb-1.5 block text-sm font-medium">LinkedIn <span className="text-xs text-muted-foreground">(optional)</span></label>
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
                <label className="mb-1.5 block text-sm font-medium">GitHub <span className="text-xs text-muted-foreground">(optional)</span></label>
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
            <motion.button
              type="submit"
              disabled={isLoading}
              className="h-11 w-full rounded-lg font-semibold text-primary-foreground gradient-cta bg-gradient-anim transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              whileHover={!isLoading ? { scale: 1.05 } : {}}
              whileTap={!isLoading ? { scale: 0.95 } : {}}
            >
              {isLoading ? (
                <>
                  <motion.div
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, linear: true }}
                  />
                  Creating...
                </>
              ) : (
                "Create Account"
              )}
            </motion.button>
          </motion.form>

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
