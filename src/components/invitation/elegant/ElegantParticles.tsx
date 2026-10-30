"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Particle = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
  petal: boolean;
  rotate: number;
};

// Valores deterministas (redondeados) para que servidor y cliente coincidan.
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function buildParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const petal = i % 5 === 0;
    return {
      id: i,
      left: Math.round(seeded(i, 1) * 1000) / 10,
      size:
        Math.round(
          (petal ? 7 + seeded(i, 3) * 6 : 1.5 + seeded(i, 4) * 2.6) * 100,
        ) / 100,
      duration: Math.round((20 + seeded(i, 5) * 18) * 10) / 10,
      delay: Math.round(seeded(i, 6) * 16 * 10) / 10,
      opacity: Math.round((0.1 + seeded(i, 7) * 0.2) * 100) / 100,
      drift: Math.round((seeded(i, 8) - 0.5) * 70),
      petal,
      rotate: Math.round(seeded(i, 9) * 180),
    };
  });
}

export function ElegantParticles({ count = 26 }: { count?: number }) {
  // Las partículas se crean solo en el cliente para evitar mismatches de
  // hidratación entre el HTML del servidor y el primer render del cliente.
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(buildParticles(count));
  }, [count]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.petal ? p.size * 1.7 : p.size,
            borderRadius: p.petal ? "100% 0 100% 0" : "999px",
            backgroundColor: p.petal ? "#D9A9AE" : "#EFD3B8",
            opacity: p.opacity,
            filter: p.petal ? "blur(0.2px)" : undefined,
          }}
          initial={{ y: "108vh", x: 0, rotate: p.rotate, scale: 0.7 }}
          animate={{
            y: "-12vh",
            x: [0, p.drift * 0.5, p.drift, p.drift * 0.3, 0],
            rotate: [p.rotate, p.rotate + 120, p.rotate + 260],
            scale: [0.7, 1, 0.85, 1],
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
