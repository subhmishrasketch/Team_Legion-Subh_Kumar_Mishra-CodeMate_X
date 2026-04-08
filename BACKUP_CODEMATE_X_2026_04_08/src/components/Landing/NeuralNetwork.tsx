import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  pulse: number;
}

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationIdRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.min(window.innerHeight, 600);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize neural network nodes
    const nodeCount = 12;
    for (let i = 0; i < nodeCount; i++) {
      nodesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // Animation loop
    const animate = () => {
      timeRef.current++;

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      const nodes = nodesRef.current;
      nodes.forEach((node, index) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Update pulse
        node.pulse += 0.05;

        // Draw connections to nearby nodes
        ctx.strokeStyle = `rgba(59, 130, 246, 0.3)`;
        ctx.lineWidth = 1;
        for (let j = index + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - node.x;
          const dy = nodes[j].y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            const alpha = (1 - distance / 200) * 0.3;
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }

        // Draw pulse effect
        const pulseSize = Math.sin(node.pulse) * 3 + 5;
        const pulseAlpha = Math.max(0, Math.sin(node.pulse));

        ctx.fillStyle = `rgba(147, 51, 234, ${pulseAlpha * 0.3})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw node center
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 4);
        gradient.addColorStop(0, "rgba(96, 165, 250, 0.8)");
        gradient.addColorStop(1, "rgba(59, 130, 246, 0.4)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full"
      style={{ background: "transparent" }}
    />
  );
}
