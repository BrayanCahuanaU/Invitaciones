"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";

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
    <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-[16/9] overflow-hidden">
      <Image src={photo} alt={protagonists} fill className="object-cover" priority />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      <div className="absolute inset-0 flex flex-col items-center justify-between p-6 pb-20 sm:p-8 lg:flex-row lg:items-center lg:px-24 pointer-events-none">
        <p className="font-display text-4xl sm:text-5xl lg:text-5xl drop-shadow-lg text-white/90 lg:order-1">
          {protagonists}
        </p>

        <p className="font-display text-4xl sm:text-5xl lg:text-5xl drop-shadow-lg text-white/90 lg:order-2">
          {motivo}
        </p>
      </div>

      <ScrollArrow />
    </div>
  );
}
