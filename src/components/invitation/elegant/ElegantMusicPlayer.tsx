"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";

export function ElegantMusicPlayer({
  src,
  title,
}: {
  src: string;
  title?: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);

  function fadeIn(audio: HTMLAudioElement, target = 0.38, duration = 2200) {
    if (fadeRef.current !== null) cancelAnimationFrame(fadeRef.current);
    audio.volume = 0;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      audio.volume = Math.max(0.02, target * progress);
      if (progress < 1) {
        fadeRef.current = requestAnimationFrame(step);
      } else {
        audio.volume = target;
        fadeRef.current = null;
      }
    };
    fadeRef.current = requestAnimationFrame(step);
  }

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;

    const start = () => {
      audio
        .play()
        .then(() => {
          fadeIn(audio);
          setPlaying(true);
        })
        .catch(() => setPlaying(false));
    };

    window.addEventListener("invitation:opened", start);
    return () => {
      window.removeEventListener("invitation:opened", start);
      if (fadeRef.current !== null) cancelAnimationFrame(fadeRef.current);
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio
        .play()
        .then(() => {
          fadeIn(audio);
          setPlaying(true);
        })
        .catch(() => setPlaying(false));
    } else {
      if (fadeRef.current !== null) {
        cancelAnimationFrame(fadeRef.current);
        fadeRef.current = null;
      }
      audio.pause();
      setPlaying(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
      <audio ref={audioRef} src={src} loop preload="auto" />

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pausar música de fondo" : "Reproducir música de fondo"}
        className="group relative flex h-12 w-12 items-center justify-center rounded-full transition-transform hover:scale-105"
        style={{
          border: "1px solid var(--elegant-gold-soft)",
          background: "linear-gradient(135deg, #7D977E 0%, #4C6855 100%)",
          color: "#FFFDF8",
          boxShadow: "0 12px 30px -18px rgba(34,49,39,0.65)",
          backdropFilter: "blur(8px)",
        }}
      >
        {playing ? <Pause className="h-4 w-4" /> : <Music className="h-4 w-4" />}

        {playing && (
          <span
            className="absolute inset-0 animate-ping rounded-full"
            style={{ border: "1px solid var(--elegant-line-strong)", opacity: 0.35 }}
            aria-hidden
          />
        )}

        <span
          className="pointer-events-none absolute right-14 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full px-3 py-1.5 text-[0.58rem] uppercase tracking-[0.22em] opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block"
          style={{
            border: "1px solid var(--elegant-line)",
            background: "rgba(255,253,249,0.92)",
            color: "var(--inv-text-muted)",
          }}
        >
          {title ?? "Música de fondo"}
        </span>
      </button>
    </div>
  );
}
