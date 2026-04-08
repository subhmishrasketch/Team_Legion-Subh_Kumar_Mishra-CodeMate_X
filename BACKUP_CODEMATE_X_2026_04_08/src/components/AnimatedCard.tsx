import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
  gradient?: boolean;
  glass?: boolean;
}

export function GlassCard({
  children,
  className = "",
  delay = 0,
  onClick,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
      whileHover={{ y: -4, scale: 1.02 }}
      onClick={onClick}
      className={`rounded-2xl backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 shadow-2xl hover:shadow-2xl transition-all cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function GradientCard({
  children,
  className = "",
  delay = 0,
  onClick,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
      whileHover={{ y: -4, scale: 1.02 }}
      onClick={onClick}
      className={`rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 border border-primary/20 shadow-lg hover:shadow-xl transition-all cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function StatCard({
  label,
  value,
  icon: Icon,
  sub,
  className = "",
  delay = 0,
}: {
  label: string;
  value: string | number;
  icon: any;
  sub?: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 300, damping: 25 }}
      whileHover={{ y: -6, scale: 1.03 }}
      className={`rounded-2xl bg-gradient-to-br from-card to-card/50 border border-primary/20 p-6 shadow-lg hover:shadow-2xl transition-all ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{value}</span>
          {sub && <span className="text-xs text-muted-foreground">{sub}</span>}
        </div>
        <motion.div
          className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 shadow-lg"
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <Icon className="h-6 w-6 text-primary" />
        </motion.div>
      </div>
      <motion.div
        className="h-1.5 rounded-full bg-primary/20 overflow-hidden"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: delay + 0.2, duration: 0.6 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: delay + 0.3, duration: 0.8 }}
          style={{ originX: 0 }}
        />
      </motion.div>
    </motion.div>
  );
}

export function ProjectCard({
  title,
  description,
  tags,
  onClick,
  delay = 0,
  className = "",
}: {
  title: string;
  description: string;
  tags: string[];
  onClick?: () => void;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onClick}
      className={`group rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border/50 p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <h3 className="text-lg font-bold text-foreground line-clamp-2 mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{description}</p>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, idx) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + idx * 0.05 }}
              className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary border border-primary/30 group-hover:bg-primary/20 transition-colors"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
