import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import codemateLogo from "@/assets/codemate-logo.png";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"student" | "admin">("student");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left branding */}
      <div className="hidden flex-1 flex-col items-center justify-center gradient-login lg:flex">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex flex-col items-center text-center">
          <img src={codemateLogo} alt="CodeMate" className="mb-6 h-28 w-28 rounded-2xl object-cover shadow-lg" />
          <h1 className="mb-2 font-heading text-4xl font-bold text-primary-foreground">CodeMate</h1>
          <p className="mb-4 text-lg font-medium text-primary-foreground/90">Code together. Build better.</p>
          <p className="max-w-sm text-sm text-primary-foreground/70">
            No innovative idea should fail due to lack of teammates. Find your perfect team and build something amazing.
          </p>
        </motion.div>
      </div>

      {/* Right form */}
      <div className="flex flex-1 items-center justify-center bg-background p-8">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md">
          <div className="mb-6 flex items-center gap-3 lg:hidden">
            <img src={codemateLogo} alt="CodeMate" className="h-10 w-10 rounded-lg object-cover" />
            <div>
              <h1 className="font-heading text-xl font-bold">CodeMate</h1>
              <p className="text-xs text-muted-foreground">Code together. Build better.</p>
            </div>
          </div>

          <h2 className="mb-2 font-heading text-3xl font-bold">Welcome back</h2>
          <p className="mb-8 text-muted-foreground">Sign in to your college account</p>

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
            <div>
              <label className="mb-1.5 block text-sm font-medium">College Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input type="email" defaultValue="you@college.edu"
                  className="h-11 w-full rounded-lg border border-border bg-card pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-sm font-medium">Password</label>
                <button type="button" className="text-sm text-primary hover:underline">Forgot password?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input type={showPassword ? "text" : "password"} defaultValue="demo1234"
                  className="h-11 w-full rounded-lg border border-border bg-card pl-10 pr-10 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button type="submit" className="h-11 w-full rounded-lg font-semibold text-primary-foreground gradient-cta transition-opacity hover:opacity-90">
              Sign In
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account? <button className="text-primary hover:underline">Sign up</button>
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
