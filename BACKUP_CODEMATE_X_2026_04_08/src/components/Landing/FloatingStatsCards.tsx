import { motion } from "framer-motion";

interface StatCard {
  value: string;
  label: string;
  color: string;
  icon: string;
}

const stats: StatCard[] = [
  {
    value: "92%",
    label: "AI Match Accuracy",
    color: "from-blue-500 to-cyan-500",
    icon: "🎯",
  },
  {
    value: "120+",
    label: "Projects Completed",
    color: "from-purple-500 to-pink-500",
    icon: "🚀",
  },
  {
    value: "500+",
    label: "Top Contributors",
    color: "from-sky-500 to-blue-500",
    icon: "🏆",
  },
];

export default function FloatingStatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.6 }}
          whileHover={{ y: -10, scale: 1.05 }}
          className="relative group"
        >
          {/* Gradient background */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl`}
          />

          {/* Card content */}
          <div className="relative p-6 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-purple-500/5 backdrop-blur-sm hover:border-blue-500/40 transition-all duration-300 overflow-hidden">
            {/* Animated background gradient */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0`}
              animate={{ opacity: [0, 0.05, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Content */}
            <div className="relative z-10">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>

            {/* Subtle glow on hover */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full filter blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
