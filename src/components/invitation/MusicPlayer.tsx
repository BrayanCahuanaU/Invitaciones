"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Music, Pause, Play, Volume2, VolumeX } from "lucide-react";

export function MusicPlayer({
  src,
  title,
  artist,
  icon,
}: {
  src: string;
  title?: string;
  artist?: string;
  icon?: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeIdRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  function fadeIn(audio: HTMLAudioElement, target = 0.5, duration = 2000) {
    if (fadeIdRef.current !== null) cancelAnimationFrame(fadeIdRef.current);
    audio.volume = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration);
      audio.volume = Math.max(0.02, target * progress);
      if (progress < 1) {
        fadeIdRef.current = requestAnimationFrame(step);
      } else {
        audio.volume = target;
        fadeIdRef.current = null;
      }
    };
    fadeIdRef.current = requestAnimationFrame(step);
  }

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.5;
    audio.loop = true;

    const start = () => {
      audio.play().then(() => {
        fadeIn(audio, 0.5, 2000);
        setPlaying(true);
      }).catch(() => setPlaying(false));
    };

    window.addEventListener("invitation:opened", start);
    return () => {
      window.removeEventListener("invitation:opened", start);
      if (fadeIdRef.current !== null) cancelAnimationFrame(fadeIdRef.current);
    };
  }, []);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => {
        fadeIn(audio, 0.5, 2000);
        setPlaying(true);
      }).catch(() => setPlaying(false));
    } else {
      if (fadeIdRef.current !== null) {
        cancelAnimationFrame(fadeIdRef.current);
        fadeIdRef.current = null;
      }
      audio.pause();
      setPlaying(false);
    }
  }

  function toggleMute() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  }

  return (
    <div className="flex justify-center">
      <div className="inline-flex items-center gap-3 md:gap-4 rounded-full border border-[#C0C0C0]/30 bg-[var(--inv-surface)]/50 backdrop-blur-md px-4 md:px-6 py-3">
        <audio ref={audioRef} src={src} loop preload="auto" />
        {icon ? (
          <Image src={icon} alt="" width={32} height={32} className="w-5 h-5 object-contain flex-shrink-0" />
        ) : (
          <Music className="w-5 h-5 text-[#C0C0C0] flex-shrink-0" />
        )}
        <span className="min-w-0 text-left">
          <span className="block truncate text-sm">{title ?? "Música"}</span>
          {artist && (
            <span className="block truncate text-xs text-[var(--inv-text-muted)]">
              {artist}
            </span>
          )}
        </span>
        <button
          onClick={togglePlay}
          aria-label={playing ? "Pausar música" : "Reproducir música"}
          className="flex items-center gap-1.5 rounded-full border border-[#C0C0C0] px-3 md:px-4 py-1.5 text-xs text-[#C0C0C0] hover:bg-[#C0C0C0]/10 transition-colors flex-shrink-0"
        >
          {playing ? (
            <Pause className="w-3.5 h-3.5" />
          ) : (
            <Play className="w-3.5 h-3.5" />
          )}
          {playing ? "Pausar" : "Reproducir"}
        </button>
        <button
          onClick={toggleMute}
          aria-label={muted ? "Activar sonido" : "Silenciar"}
          className="rounded-full border border-[#C0C0C0] p-2 text-[#C0C0C0] hover:bg-[#C0C0C0]/10 transition-colors flex-shrink-0"
        >
          {muted ? (
            <VolumeX className="w-3.5 h-3.5" />
          ) : (
            <Volume2 className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}
