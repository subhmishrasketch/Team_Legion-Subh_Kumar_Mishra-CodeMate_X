import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Github, Linkedin, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import codemateLogo from "@/assets/codemate-logo.png";

const Login = () => {
  const { login, demoMode, setDemoMode } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"student" | "admin">("student");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(role, { email, password });
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left branding */}
      <div className="relative hidden flex-1 items-center justify-center overflow-hidden gradient-login lg:flex">
        {/* animated blobs */}
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
          {/* decorative illustration */}
          <img
            src="/placeholder.svg"
            alt="illustration"
            className="mt-8 h-48 w-48 opacity-80 animate-float"
          />
          <h1 className="mb-2 font-heading text-4xl font-bold text-primary-foreground text-gradient">
            CodeMate
          </h1>
          <p className="mb-4 text-lg font-medium text-primary-foreground/90">
            Code together. Build better.
          </p>
          <p className="max-w-sm text-sm text-primary-foreground/70">
            No innovative idea should fail due to lack of teammates. Find your perfect team and build something amazing.
          </p>
        </motion.div>
      </div>

      {/* Right form */}
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
          <div className="mb-6 flex items-center gap-3 lg:hidden">
            <img src={codemateLogo} alt="CodeMate" className="h-10 w-auto rounded-lg object-contain" />
            <div>
              <h1 className="font-heading text-xl font-bold">CodeMate</h1>
              <p className="text-xs text-muted-foreground">Code together. Build better.</p>
            </div>
          </div>

          <h2 className="mb-2 font-heading text-3xl font-bold text-gradient">Welcome back</h2>
          <p className="mb-8 text-muted-foreground">
            {demoMode ? "Use demo credentials or just hit sign in" : "Sign in to your college account"}
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
              {demoMode ? "using canned users" : "enter real credentials"}
            </span>
          </div>

          {/* Role toggle */}
          <div className="mb-6 flex rounded-lg bg-muted p-1">
            {(["student", "admin"] as const).map((r) => (
              <button key={r} onClick={() => setRole(r)}
                className={`flex-1 rounded-md py-2 text-sm font-medium capitalize transition-all ${
                  role === r ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
                }`}>{r}</button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {!demoMode && (
              <>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">College Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@college.edu"
                      className="h-11 w-full rounded-lg border border-border bg-card pl-10 pr-4 text-sm outline-none transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-sm font-medium">Password</label>
                    <button type="button" className="text-sm text-primary hover:underline">Forgot password?</button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="password"
                      className="h-11 w-full rounded-lg border border-border bg-card pl-10 pr-10 text-sm outline-none transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-fast">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </>
            )}
            <button type="submit" className="h-11 w-full rounded-lg font-semibold text-primary-foreground gradient-cta transition-transform hover:scale-105">
              Sign In
            </button>
          </form>          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
          
          {/* Social Media Links */}
          <div className="mt-6 flex justify-center gap-4">
            <motion.a href="https://github.com/subhmishrasketch/CodeMate" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center h-10 w-10 rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
              <Github className="h-5 w-5" />
            </motion.a>
            <motion.a href="https://www.linkedin.com/in/subh-kumar-mishra-76a635374/" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center h-10 w-10 rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
              <Linkedin className="h-5 w-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
