import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GradientTextProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent";
  className?: string;
  animate?: boolean;
}

export function GradientText({
  children,
  variant = "primary",
  className = "",
  animate = true,
}: GradientTextProps) {
  const gradients = {
    primary: "bg-gradient-to-r from-teal-500 via-indigo-500 to-blue-500",
    secondary: "bg-gradient-to-r from-emerald-500 to-teal-500",
    accent: "bg-gradient-to-r from-teal-500 to-indigo-500",
  };

  const content = (
    <span className={`${gradients[variant]} bg-clip-text text-transparent font-bold [background-size:200%_auto] ${className}`}>
      {children}
    </span>
  );

  if (!animate) return content;

  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="block"
    >
      {content}
    </motion.span>
  );
}

export function AnimatedHeading({
  level = 1,
  children,
  className = "",
  animate = true,
}: {
  level?: 1 | 2 | 3 | 4;
  children: ReactNode;
  className?: string;
  animate?: boolean;
}) {
  const Tag = `h${level}` as any;
  const baseStyles = "font-heading font-bold tracking-tight";
  const sizeStyles = {
    1: "text-4xl sm:text-5xl",
    2: "text-3xl sm:text-4xl",
    3: "text-2xl sm:text-3xl",
    4: "text-xl sm:text-2xl",
  };

  const content = (
    <Tag className={`${baseStyles} ${sizeStyles[level]} ${className}`}>
      {children}
    </Tag>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 25 }}
    >
      {content}
    </motion.div>
  );
}

export function AnimatedSubheading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className={`text-muted-foreground text-lg ${className}`}
    >
      {children}
    </motion.p>
  );
}

export function IconGradient({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary shadow-lg ${className}`}
      whileHover={{ rotate: 8, scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {children}
    </motion.div>
  );
}
