import { motion } from "framer-motion";

interface StatsCardProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
  delay?: number;
  index?: number;
  variant?: "default" | "highlight";
}

export default function StatsCard({
  value,
  label,
  icon,
  delay = 0,
  index = 0,
  variant = "default",
}: StatsCardProps) {
  const isHighlight = variant === "highlight";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (delay || index * 0.08), duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -4 }}
      className={`relative rounded-xl p-6 sm:p-8 transition-all duration-300 group overflow-hidden ${
        isHighlight
          ? "bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/40 hover:border-cyan-500/60 shadow-lg shadow-cyan-500/10"
          : "bg-white/5 border border-white/10 hover:border-sky-500/30 hover:bg-white/[0.08]"
      }`}
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative z-10 text-center sm:text-left space-y-2">
        {/* Icon (optional) */}
        {icon && (
          <div className="flex items-center justify-center sm:justify-start mb-3">
            <div className="text-2xl sm:text-3xl">{icon}</div>
          </div>
        )}

        {/* Value */}
        <motion.p
          className={`font-heading font-bold tracking-tight ${
            isHighlight
              ? "text-3xl sm:text-4xl bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent"
              : "text-3xl sm:text-4xl bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent"
          }`}
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
        >
          {value}
        </motion.p>

        {/* Label */}
        <p className="text-white/50 text-sm sm:text-base font-medium group-hover:text-white/70 transition-colors">
          {label}
        </p>

        {/* Bottom accent line */}
        <motion.div
          className="w-8 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 origin-left opacity-0 group-hover:opacity-100 transition-opacity"
          layoutId={`accent-line-${index}`}
        />
      </div>
    </motion.div>
  );
}
