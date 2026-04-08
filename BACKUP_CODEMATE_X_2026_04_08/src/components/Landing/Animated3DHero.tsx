import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Card {
  id: number;
  x: number;
  y: number;
  z: number;
  rotation: number;
  vx: number;
  vy: number;
  label: string;
  color: string;
}

export default function Animated3DHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cards, setCards] = useState<Card[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    // Initialize cards
    const initialCards: Card[] = [
      {
        id: 1,
        x: -200,
        y: -150,
        z: 0,
        rotation: 0,
        vx: 0.5,
        vy: 0.2,
        label: "92% Match",
        color: "from-blue-500 to-cyan-500",
      },
      {
        id: 2,
        x: 200,
        y: -100,
        z: 0,
        rotation: 0,
        vx: -0.3,
        vy: 0.4,
        label: "150+ Teams",
        color: "from-purple-500 to-pink-500",
      },
      {
        id: 3,
        x: 0,
        y: 200,
        z: 0,
        rotation: 0,
        vx: 0.2,
        vy: -0.3,
        label: "Real Projects",
        color: "from-sky-500 to-blue-500",
      },
    ];
    setCards(initialCards);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      });
    };

    container.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      timeRef.current += 1;

      setCards((prevCards) =>
        prevCards.map((card) => {
          let newCard = { ...card };

          // Orbital movement
          const angle = (timeRef.current + card.id) * 0.005;
          const radius = 150;
          newCard.x = Math.cos(angle) * radius;
          newCard.y = Math.sin(angle) * radius;

          // Rotation
          newCard.rotation = angle * 50;

          // Parallax with mouse
          newCard.z = Math.sin(angle + timeRef.current * 0.01) * 20;

          return newCard;
        })
      );

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-96 perspective flex items-center justify-center"
      style={{
        perspective: "1200px",
      }}
    >
      {/* Central glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" />
      </div>

      {/* Animated cards */}
      {cards.map((card) => (
        <motion.div
          key={card.id}
          className="absolute"
          style={{
            transform: `
              translateX(${card.x + mousePos.x * 0.1}px)
              translateY(${card.y + mousePos.y * 0.1}px)
              translateZ(${card.z}px)
              rotateX(${(mousePos.y / 100) * 5}deg)
              rotateY(${(mousePos.x / 100) * 5}deg)
              rotateZ(${card.rotation}deg)
            `,
          }}
          animate={{
            boxShadow: `0 0 30px rgba(59, 130, 246, 0.6)`,
          }}
          transition={{ duration: 0.3 }}
        >
          <div
            className={`w-32 h-24 rounded-xl bg-gradient-to-br ${card.color} p-4 
              backdrop-blur-sm border border-white/20 shadow-2xl
              flex items-center justify-center text-center cursor-pointer
              hover:scale-110 transition-transform duration-300`}
          >
            <div>
              <div className="text-white font-bold text-sm">{card.label}</div>
              <div className="text-white/60 text-xs mt-1">Active</div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full">
        {cards.length > 1 &&
          cards.slice(0, -1).map((card1, i) => {
            const card2 = cards[i + 1];
            return (
              <motion.line
                key={`line-${i}`}
                x1={`calc(50% + ${card1.x}px)`}
                y1={`calc(50% + ${card1.y}px)`}
                x2={`calc(50% + ${card2.x}px)`}
                y2={`calc(50% + ${card2.y}px)`}
                stroke="url(#lineGradient)"
                strokeWidth="2"
                opacity="0.4"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
            );
          })}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
