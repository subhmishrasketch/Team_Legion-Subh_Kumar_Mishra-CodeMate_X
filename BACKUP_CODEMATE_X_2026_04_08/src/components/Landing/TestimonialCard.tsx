import { motion } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";

interface TestimonialCardProps {
  name: string;
  role: string;
  message: string;
  avatar: string;
  projects: number;
  delay?: number;
  index?: number;
}

export default function TestimonialCard({
  name,
  role,
  message,
  avatar,
  projects,
  delay = 0,
  index = 0,
}: TestimonialCardProps) {
  const avatarColors = [
    "from-sky-400 to-blue-500",
    "from-cyan-400 to-indigo-600",
    "from-violet-400 to-cyan-500",
  ];

  const avatarColor = avatarColors[index % avatarColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (delay || index * 0.1), duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-500/50 p-7 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden"
    >
      {/* Background accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header with avatar and info */}
        <div className="flex items-start gap-4 mb-5">
          <Avatar className="h-14 w-14 flex-shrink-0 ring-2 ring-cyan-500/30 group-hover:ring-cyan-500/60 transition-all">
            <div className={`w-full h-full bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white font-bold text-sm rounded-full`}>
              {avatar}
            </div>
          </Avatar>

          <div className="flex-1 min-w-0">
            <p className="font-semibold text-white text-base leading-tight">{name}</p>
            <p className="text-sm text-white/50 mt-1">{role}</p>
          </div>
        </div>

        {/* Quote/Message */}
        <p className="text-white/75 text-base leading-relaxed mb-5 italic">
          "{message}"
        </p>

        {/* Footer with stats and stars */}
        <div className="flex flex-col gap-4 pt-5 border-t border-blue-500/10 group-hover:border-blue-500/30 transition-colors">
          {/* Stars */}
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0.5 }}
                whileHover={{ opacity: 1, scale: 1.2 }}
                className="text-sky-400 transition-all"
              >
                ★
              </motion.span>
            ))}
          </div>

          {/* Projects led */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-white/50 font-medium">
              <span className="text-cyan-400 font-bold">{projects}</span> Projects Led
            </p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-cyan-400/60" />
              <span className="text-xs text-white/40">Active</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
