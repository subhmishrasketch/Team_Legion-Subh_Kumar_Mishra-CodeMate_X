import { motion } from "framer-motion";
import { Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  onStartBuilding?: (e: React.MouseEvent) => void;
  stats: Array<{ value: string; label: string }>;
  activityTicker?: React.ReactNode;
  dashboardMock?: React.ReactNode;
}

export default function HeroSection({
  onStartBuilding,
  stats,
  activityTicker,
  dashboardMock,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* LEFT SIDE: Text and CTAs */}
        <div className="relative z-10 flex flex-col items-start justify-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-300 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Powered by 2,400+ Student Builders
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
          >
            Build Teams.{" "}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
              Create Impact.
            </span>{" "}
            Get Discovered.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-base sm:text-lg lg:text-xl text-white/60 leading-relaxed max-w-2xl mb-8"
          >
            Join 2,400+ students building real-world projects. Find your perfect team, collaborate with peers, and turn your ideas into reality on CodeMate X.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-10"
          >
            <button
              onClick={onStartBuilding}
              className="group flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap text-sm sm:text-base"
            >
              Join Community
              <Users className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <Link
              to="/signin"
              className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-white/80 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20 hover:scale-105 active:scale-95 transition-all whitespace-nowrap text-sm sm:text-base"
            >
              Browse Teammates
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap gap-4 sm:gap-6 mb-8"
          >
            {stats.map((stat, idx) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-white/40 font-medium">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Activity Ticker */}
          {activityTicker && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {activityTicker}
            </motion.div>
          )}
        </div>

        {/* RIGHT SIDE: Dashboard Mock and Cards */}
        <div className="relative flex justify-center items-center">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-sky-500/10 rounded-3xl blur-3xl" />

          {/* Dashboard Mock */}
          {dashboardMock && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative w-full max-w-sm md:max-w-md"
            >
              {dashboardMock}
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/30"
      >
        <span className="text-xs sm:text-sm">Scroll to explore</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
