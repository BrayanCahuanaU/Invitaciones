"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";

type Stage = "closed" | "opening" | "open";
type Device = "mobile" | "tablet" | "desktop";

function useDevice(): Device {
  const [device, setDevice] = useState<Device>("mobile");

  useEffect(() => {
    function check() {
      const w = window.innerWidth;
      if (w >= 1024) setDevice("desktop");
      else if (w >= 768) setDevice("tablet");
      else setDevice("mobile");
    }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return device;
}

export function Envelope({
  closedImage,
  openVideo,
  closedImageTablet,
  openVideoTablet,
  closedImageDesktop,
  openVideoDesktop,
  protagonists,
  children,
}: {
  closedImage: string;
  openVideo: string;
  closedImageTablet?: string;
  openVideoTablet?: string;
  closedImageDesktop?: string;
  openVideoDesktop?: string;
  protagonists: string;
  children: React.ReactNode;
}) {
  const [stage, setStage] = useState<Stage>("closed");
  const videoRef = useRef<HTMLVideoElement>(null);
  const device = useDevice();

  const currentClosed =
    (device === "desktop" && closedImageDesktop) ||
    (device === "tablet" && closedImageTablet) ||
    closedImage;

  const currentVideo =
    (device === "desktop" && openVideoDesktop) ||
    (device === "tablet" && openVideoTablet) ||
    openVideo;

  function handleOpen() {
    if (!currentVideo) {
      setStage("open");
      return;
    }
    setStage("opening");
    videoRef.current?.play().catch(() => setStage("open"));
  }

  return (
    <>
      <div className={stage === "open" ? "relative z-10" : "relative z-10 invisible"}>
        {children}
      </div>

      <AnimatePresence>
        {stage !== "open" && (
          <motion.div
            key="envelope"
            className="fixed inset-0 min-h-dvh z-50 bg-[var(--inv-bg)] text-[var(--inv-text)]"
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <AnimatePresence>
              {stage === "closed" && (
                <motion.button
                  key="closed"
                  onClick={handleOpen}
                  aria-label={`Abrir invitación de ${protagonists}`}
                  className="relative min-h-dvh w-full block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--inv-accent)]"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Image
                    src={currentClosed}
                    alt=""
                    fill
                    priority
                    className="object-cover object-center"
                  />
                  <motion.span
                    className="absolute inset-x-0 bottom-16 md:bottom-24 lg:bottom-32 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--inv-accent)] px-6 py-2 text-sm tracking-widest uppercase bg-black/30 backdrop-blur-sm">
                      <Mail className="w-4 h-4" />
                      Toca para abrir
                    </span>
                  </motion.span>
                </motion.button>
              )}
            </AnimatePresence>

            <video
              ref={videoRef}
              src={currentVideo}
              muted
              playsInline
              className={`absolute inset-0 h-full w-full object-cover ${
                stage === "opening" ? "block" : "hidden"
              }`}
              onEnded={() => setStage("open")}
              onError={() => setStage("open")}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
