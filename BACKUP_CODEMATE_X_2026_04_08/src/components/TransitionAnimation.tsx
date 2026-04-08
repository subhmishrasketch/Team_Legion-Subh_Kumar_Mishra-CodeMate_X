import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TransitionAnimationProps {
  onComplete: () => void;
}

export default function TransitionAnimation({ onComplete }: TransitionAnimationProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 800);
    const timer2 = setTimeout(() => setStage(2), 1600);
    const timer3 = setTimeout(() => onComplete(), 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex flex-col items-center justify-center pointer-events-none"
    >
      {/* Logo Animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: stage >= 1 ? 1 : 0, opacity: stage >= 1 ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="mb-8"
      >
        <img src="/logo.svg" alt="CodeMate X" className="w-24 h-24 drop-shadow-2xl" />
      </motion.div>

      {/* Text Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : 20 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-4">
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            CodeMate X
          </span>
        </h2>
        <p className="text-xl text-gray-300">Connecting students, building impact</p>
      </motion.div>

      {/* Loading Dots */}
      <motion.div
        className="mt-12 flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 2 ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              repeat: Infinity,
            }}
          />
        ))}
      </motion.div>

      {/* Neural Network Animation Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Animated Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-60"
          animate={{
            x: Math.cos((i / 6) * Math.PI * 2) * 100,
            y: Math.sin((i / 6) * Math.PI * 2) * 100,
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: "50%",
            top: "50%",
            marginLeft: "-4px",
            marginTop: "-4px",
          }}
        />
      ))}
    </motion.div>
  );
}
