"use client";

import Image from "next/image";
import { Crown, ChevronDown } from "lucide-react";
import { Section } from "./Section";

function ScrollArrow() {
  function handleClick() {
    const section = document.getElementById("quote");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Desplazar hacia abajo"
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center scroll-bounce hover:bg-black/50 transition-colors"
    >
      <ChevronDown className="w-5 h-5 text-white" />
    </button>
  );
}

export function Hero({
  photo,
  protagonists,
  motivo,
}: {
  photo: string;
  protagonists: string;
  motivo: string;
}) {
  return (
    <>
      <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-[16/9] overflow-hidden">
        <Image src={photo} alt={protagonists} fill className="object-cover" priority />
        <ScrollArrow />
      </div>

      <Section>
        <div className="mt-4 flex items-center justify-center gap-3">
          <Crown className="w-5 h-5 text-[var(--inv-accent)]" />
          <p className="font-display italic text-lg md:text-xl text-[var(--inv-text-muted)]">
            {motivo}
          </p>
          <Crown className="w-5 h-5 text-[var(--inv-accent)]" />
        </div>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mt-2">
          {protagonists}
        </h1>
      </Section>
    </>
  );
}
