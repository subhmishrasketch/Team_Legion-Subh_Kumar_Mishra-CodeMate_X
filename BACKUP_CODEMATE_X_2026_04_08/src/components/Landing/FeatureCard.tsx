import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon, X } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  glow: string;
  delay?: number;
  index?: number;
  fullDescription?: string; // Additional content for modal
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
  glow,
  delay = 0,
  index = 0,
  fullDescription = "",
}: FeatureCardProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: (delay || index * 0.08), duration: 0.6 }}
        whileHover={{ y: -6, scale: 1.02 }}
        onClick={() => setShowModal(true)}
        className={`group relative rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/5 hover:border-white/15 p-6 transition-all duration-300 hover:shadow-xl hover:${glow} cursor-pointer overflow-hidden`}
      >
        {/* Background glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-violet-500/0 group-hover:from-cyan-500/5 group-hover:to-violet-500/5 transition-all duration-300" />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Icon container */}
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 group-hover:scale-110 transition-all duration-300`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>

          {/* Title */}
          <h3 className="font-heading text-lg font-bold text-white mb-3 leading-tight">
            {title}
          </h3>

          {/* Description */}
          <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-300">
            {description}
          </p>

          {/* Subtle bottom accent */}
          <div className="mt-4 pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-2 text-xs text-cyan-400/70">
              <div className="w-1 h-1 rounded-full bg-cyan-400" />
              <span>Learn more →</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence mode="wait">
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-2xl p-8 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                aria-label="Close modal"
                title="Close"
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>

              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
                  <p className="text-white/60">{description}</p>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4 text-white/80 leading-relaxed">
                {fullDescription ? (
                  <p>{fullDescription}</p>
                ) : (
                  <>
                    <p className="text-white/90">{description}</p>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 mt-6">
                      <h3 className="font-semibold text-white mb-2">Key Features:</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          Advanced technology integration
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          Real-time collaboration tools
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          Comprehensive analytics
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </div>

              {/* Footer Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(false)}
                className="mt-8 w-full px-6 py-3 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold transition-all shadow-lg"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
