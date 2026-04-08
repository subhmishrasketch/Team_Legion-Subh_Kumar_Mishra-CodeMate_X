import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface NavbarProps {
  hideNavLinks?: boolean;
  showLogoOnly?: boolean;
  scrolled?: boolean;
}

export default function Navbar({ hideNavLinks = false, showLogoOnly = false, scrolled: scrolledProp }: NavbarProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const scrolled = scrolledProp !== undefined ? scrolledProp : isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/40 backdrop-blur-xl border-b border-blue-500/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 cursor-pointer flex-shrink-0"
          onClick={() => navigate("/")}
        >
          <img src="/logo.svg" alt="CodeMate X" className="w-8 h-8 drop-shadow-lg" />
          <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent hidden sm:inline">
            CodeMate X
          </span>
        </motion.div>

        {/* Nav Links - Hidden on Login */}
        {!hideNavLinks && (
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {["Home", "Features", "Impact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ color: "#60a5fa" }}
                className="text-gray-300 text-sm font-medium hover:text-blue-400 transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>
        )}

        {/* CTA Buttons - Hidden on login page */}
        {!showLogoOnly && (
          <div className="flex items-center gap-2 sm:gap-4">
            {user ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/dashboard")}
                  className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white hover:text-blue-400 transition-colors"
                >
                  Dashboard
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/logout")}
                  className="px-4 sm:px-6 py-2 rounded-lg bg-gradient-to-r from-sky-600 to-blue-600 text-white text-xs sm:text-sm font-medium hover:shadow-lg hover:shadow-sky-500/50 transition-all"
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/login")}
                  className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white hover:text-blue-400 transition-colors"
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/signup")}
                  className="px-4 sm:px-6 py-2 rounded-lg bg-gradient-to-r from-sky-600 to-blue-600 text-white text-xs sm:text-sm font-medium hover:shadow-lg hover:shadow-sky-500/50 transition-all"
                >
                  Get Started
                </motion.button>
              </>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
