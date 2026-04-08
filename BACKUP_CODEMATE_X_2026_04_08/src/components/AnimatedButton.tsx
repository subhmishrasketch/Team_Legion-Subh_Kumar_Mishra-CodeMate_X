import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export function AnimatedButton({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
  disabled = false,
}: AnimatedButtonProps) {
  const baseStyles = "font-semibold rounded-xl transition-all font-heading";
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const variantStyles = {
    primary: "bg-gradient-to-r from-teal-500 to-indigo-600 text-white shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40",
    secondary: "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40",
    outline: "border-2 border-primary text-primary hover:bg-primary/10",
    ghost: "text-foreground hover:bg-muted/50",
    gradient: "bg-gradient-to-r from-teal-500 via-indigo-500 to-blue-500 text-white shadow-lg shadow-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/50",
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      whileHover={!disabled ? { scale: 1.05, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      initial={{ opacity: 0.9 }}
      animate={{ opacity: disabled ? 0.5 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      {children}
    </motion.button>
  );
}

export function FloatingButton({
  children,
  onClick,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`fixed bottom-8 right-8 rounded-full p-4 bg-gradient-to-r from-teal-500 to-indigo-600 text-white shadow-2xl shadow-teal-500/50 z-40 ${className}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, y: -4 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.button>
  );
}

export function PulseButton({
  children,
  onClick,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-teal-500 to-indigo-600 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 opacity-40"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      <span className="relative">{children}</span>
    </motion.button>
  );
}
