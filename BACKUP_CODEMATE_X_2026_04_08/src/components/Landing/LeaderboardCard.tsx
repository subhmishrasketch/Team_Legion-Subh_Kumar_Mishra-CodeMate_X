import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface LeaderboardCardProps {
  rank: number;
  name: string;
  dept: string;
  points: number;
  medal: string;
  color: string;
  delay?: number;
  index?: number;
}

export default function LeaderboardCard({
  rank,
  name,
  dept,
  points,
  medal,
  color,
  delay = 0,
  index = 0,
}: LeaderboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (delay || index * 0.1), duration: 0.6 }}
      whileHover={{ y: -12, scale: 1.03 }}
      className="group relative rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-white/30 p-6 transition-all duration-300 overflow-hidden"
    >
      {/* Gradient border effect */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-10 ${color} transition-opacity duration-300`} />

      {/* Content */}
      <div className="relative z-10 space-y-5">
        {/* Rank and Medal */}
        <div className="flex items-center justify-between">
          <motion.span
            className="text-5xl font-bold"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {medal}
          </motion.span>
          <Badge className={`bg-gradient-to-r ${color} text-white border-0 text-lg px-4 py-1`}>
            #{rank}
          </Badge>
        </div>

        {/* Name and Department */}
        <div className="space-y-2">
          <p className="font-bold text-lg text-white leading-tight">{name}</p>
          <p className="text-sm text-white/60 font-medium">{dept}</p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-cyan-500/20 via-transparent to-violet-500/20 group-hover:from-cyan-500/50 group-hover:to-violet-500/50 transition-colors duration-300" />

        {/* Points Stats */}
        <div className="space-y-2">
          <p className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            {points}
          </p>
          <p className="text-xs text-white/50 font-medium uppercase tracking-wide">
            Activity Points
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full space-y-2">
          <div className="flex justify-between text-xs text-white/40">
            <span>Progress</span>
            <span>{Math.round((points / 300) * 100)}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${color}`}
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.round((points / 300) * 100)}%` }}
              viewport={{ once: true }}
              transition={{ delay: (delay || index * 0.1) + 0.2, duration: 1 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
