"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 18 + 14,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.3 + 0.08,
  }));
}

export function ParticleBackground({ count = 24 }: { count?: number }) {
  const [particles] = useState(() => generateParticles(count));

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-[var(--inv-accent)]"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            filter: `blur(${p.size > 4 ? 1 : 0}px)`,
          }}
          initial={{ y: "110vh", x: 0, scale: 0.6 }}
          animate={{
            y: "-10vh",
            x: [0, p.size * 6, -p.size * 4, p.size * 5, 0],
            scale: [0.6, 1, 0.8, 1.1, 0.6],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
            x: {
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
      ))}
    </div>
  );
}
