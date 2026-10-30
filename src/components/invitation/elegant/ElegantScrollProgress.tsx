"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ElegantScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-40 h-[2px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, rgba(110,31,51,0) 0%, #6E1F33 30%, #C9A46A 65%, rgba(201,164,106,0) 100%)",
      }}
    />
  );
}
