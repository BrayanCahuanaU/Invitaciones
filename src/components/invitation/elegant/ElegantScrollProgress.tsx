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
          "linear-gradient(90deg, rgba(93,122,100,0) 0%, #5D7A64 30%, #AF8A4F 65%, rgba(175,138,79,0) 100%)",
      }}
    />
  );
}
