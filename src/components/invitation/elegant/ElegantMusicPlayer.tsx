"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";
import { WeddingTexts } from "@/content/types";

export function ElegantMusicPlayer({
  src,
  title,
  texts,
}: {
  src: string;
  title?: string;
  texts: WeddingTexts;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeRef = useRef<number | null>(null);
  const fadeTimeoutRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);

  function fadeIn(audio: HTMLAudioElement, target = 0.38, duration = 2200) {
    if (fadeRef.current !== null) cancelAnimationFrame(fadeRef.current);
    if (fadeTimeoutRef.current !== null) {
      window.clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }
    const start = performance.now();
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      if (fadeTimeoutRef.current !== null) {
        window.clearTimeout(fadeTimeoutRef.current);
        fadeTimeoutRef.current = null;
      }
      audio.volume = target;
    };
    const step = (now: number) => {
      if (finished) return;
      const progress = Math.min(1, (now - start) / duration);
      audio.volume = Math.max(0.02, target * progress);
      if (progress < 1) {
        fadeRef.current = requestAnimationFrame(step);
      } else {
        fadeRef.current = null;
        finish();
      }
    };
    audio.volume = 0;
    fadeRef.current = requestAnimationFrame(step);
    // Respaldo: rAF se pausa si la pestaña queda oculta.
    fadeTimeoutRef.current = window.setTimeout(finish, duration + 150);
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
      if (fadeTimeoutRef.current !== null) {
        window.clearTimeout(fadeTimeoutRef.current);
        fadeTimeoutRef.current = null;
      }
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
        aria-label={playing ? texts.music.pauseAriaLabel : texts.music.playAriaLabel}
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
          {title ?? texts.music.label}
        </span>
      </button>
    </div>
  );
}
