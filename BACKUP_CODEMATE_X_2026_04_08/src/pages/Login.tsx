import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Github, Linkedin, Sun, Moon, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import codemateLogo from "@/assets/codemate-logo.png";

const Login = () => {
  const { login, demoMode, setDemoMode } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [role, setRole] = useState<"student" | "admin">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Please enter email and password");
      return;
    }
    setIsLoading(true);
    try {
      await login(role, { email, password });
      toast.success("Logged in successfully! 🎉");
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      toast.error(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!forgotEmail.trim()) {
      toast.error("Please enter your email");
      return;
    }
    toast.success(`Password reset link sent to ${forgotEmail}`);
    setShowForgotPassword(false);
    setForgotEmail("");
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };
  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={`flex min-h-screen bg-gradient-to-br ${theme === "light" ? "from-white via-primary/10 to-primary/20" : "from-background via-background to-primary/5"}`}>
      {/* Animated gradient background */}
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

      {/* Left branding */}
      <div className="relative hidden flex-1 items-center justify-center overflow-hidden xl:flex">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 300, damping: 25 }}
          className="relative z-10 flex flex-col items-center text-center px-8"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <img
              src={codemateLogo}
              alt="CodeMate"
              className="mb-6 max-h-32 max-w-32 rounded-3xl object-contain shadow-2xl shadow-primary/50 ring-4 ring-primary/20"
            />
          </motion.div>
          
          <motion.h1 
            className="mb-3 font-heading text-5xl font-bold bg-gradient-to-r from-teal-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            CodeMate
          </motion.h1>
          
          <motion.p 
            className="mb-4 text-xl font-medium text-foreground/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Code together. Build better.
          </motion.p>
          
          <motion.p 
            className="max-w-sm text-foreground/60 text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            No innovative idea should fail due to lack of teammates. Find your perfect team and build something extraordinary.
          </motion.p>
        </motion.div>
      </div>

      {/* Right form */}
      <div className="flex flex-1 items-center justify-center p-6 relative z-20 sm:p-8">
        {/* theme toggle */}
        <motion.button 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all shadow-lg"
          whileHover={{ scale: 1.1, rotate: 20 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {theme === "dark" ? (
              <motion.div key="sun" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}>
                <Sun className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div key="moon" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}>
                <Moon className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Forgot Password Modal */}
        <AnimatePresence>
          {showForgotPassword && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
              onClick={() => setShowForgotPassword(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="w-full max-w-md rounded-2xl border border-border/50 bg-card backdrop-blur-xl p-8 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="font-heading text-2xl font-bold mb-2">Forgot Password?</h2>
                <p className="text-sm text-muted-foreground mb-6">Enter your email and we'll send you a password reset link.</p>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none mb-4"
                />
                <div className="flex gap-3">
                  <motion.button
                    onClick={handleForgotPassword}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 rounded-lg gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
                    Send Reset Link
                  </motion.button>
                  <motion.button
                    onClick={() => setShowForgotPassword(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:bg-muted transition-colors">
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 25 }}
          className="w-full max-w-md rounded-3xl border border-border/50 bg-card/70 backdrop-blur-2xl p-10 shadow-2xl"
        >
          <div className="mb-8 flex items-center gap-3 xl:hidden">
            <img src={codemateLogo} alt="CodeMate" className="h-12 w-auto rounded-lg object-contain ring-2 ring-primary/20" />
            <div>
              <h1 className="font-heading text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">CodeMate</h1>
              <p className="text-xs text-muted-foreground">Code together.</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="mb-2 font-heading text-3xl font-bold bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">Welcome back</h2>
            <p className="mb-8 text-muted-foreground">
              {demoMode ? "Use demo credentials or just hit sign in" : "Sign in to your college account"}
            </p>
          </motion.div>

          {/* demo mode switch */}
          <motion.div 
            className="mb-6 flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className="flex items-center gap-2 text-sm select-none cursor-pointer flex-1">
              <motion.input
                type="checkbox"
                checked={demoMode}
                onChange={(e) => setDemoMode(e.target.checked)}
                className="h-4 w-4 accent-primary cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              />
              <span className="font-medium">Demo mode</span>
            </label>
            <span className="text-xs text-muted-foreground">
              {demoMode ? "test account" : "enter credentials"}
            </span>
          </motion.div>

          {/* Role toggle */}
          <motion.div 
            className="mb-6 flex rounded-xl bg-muted/50 p-1 backdrop-blur-sm border border-border/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {(["student", "admin"] as const).map((r) => (
              <motion.button 
                key={r} 
                onClick={() => setRole(r)}
                className={`flex-1 rounded-lg py-2.5 text-sm font-semibold capitalize transition-all ${
                  role === r ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg" : "text-muted-foreground"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {r}
              </motion.button>
            ))}
          </motion.div>

          <form onSubmit={handleLogin} className="space-y-5">
            {!demoMode && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="mb-2 block text-sm font-semibold">College Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <motion.input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@college.edu"
                      className="h-12 w-full rounded-xl border border-border/50 bg-card/50 pl-11 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 backdrop-blur-sm"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-semibold">Password</label>
                    <button 
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-sm text-primary hover:underline transition-colors">Forgot password?</button>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <motion.input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="•••••••••"
                      className="h-12 w-full rounded-xl border border-border/50 bg-card/50 pl-11 pr-12 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 backdrop-blur-sm"
                      whileFocus={{ scale: 1.02 }}
                    />
                    <motion.button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </motion.button>
                  </div>
                </motion.div>
              </>
            )}

            <motion.button 
              type="submit"
              disabled={isLoading}
              className="h-12 w-full rounded-xl font-bold text-white bg-gradient-to-r from-teal-500 to-indigo-600 shadow-lg shadow-teal-500/30 bg-gradient-anim transition-all hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              whileHover={!isLoading ? { scale: 1.02, y: -2 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, easing: "linear" }}
                    />
                  </motion.div>
                ) : (
                  <motion.span
                    key="text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Sign In
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>
          <motion.p 
            className="mt-8 text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-primary hover:underline transition-colors">
              Sign up for free
            </Link>
          </motion.p>
          
          {/* Social Media Links */}
          <motion.div 
            className="mt-8 flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
          >
            <motion.a 
              href="https://github.com/subhmishrasketch/CodeMate" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -4 }} 
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center h-11 w-11 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 text-muted-foreground hover:text-primary transition-all border border-border/50 shadow-lg hover:shadow-xl"
            >
              <Github className="h-5 w-5" />
            </motion.a>
            <motion.a 
              href="https://www.linkedin.com/in/subh-kumar-mishra-76a635374/" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -4 }} 
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center h-11 w-11 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 text-muted-foreground hover:text-primary transition-all border border-border/50 shadow-lg hover:shadow-xl"
            >
              <Linkedin className="h-5 w-5" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
