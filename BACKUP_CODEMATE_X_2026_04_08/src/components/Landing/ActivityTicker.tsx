import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const activities = [
  "🤝 Rahul joined a team",
  "✨ AI matched 3 students",
  "🚀 Project deployed successfully",
  "🎯 Milestone completed",
  "💡 New collaboration formed",
  "🏆 User reached top contributors",
  "📊 Skills updated",
  "🔗 Partnership established",
];

export default function ActivityTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-16 flex items-center overflow-hidden rounded-lg border border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent opacity-50" />

      {/* Animated ticker text */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <p className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {activities[currentIndex]}
        </p>
      </motion.div>

      {/* Animated dots */}
      <div className="absolute right-6 flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-blue-400"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1,
              delay: i * 0.1,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
    </div>
  );
}
