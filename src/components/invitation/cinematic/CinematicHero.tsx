"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";

export function CinematicHero({
  photo,
  protagonists,
  motivo,
  nameSvg,
}: {
  photo: string;
  protagonists: string;
  motivo: string;
  nameSvg?: string;
}) {
  function handleScrollDown() {
    const section = document.getElementById("quote");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="relative w-full h-screen min-h-[600px] overflow-hidden">
      <Image src={photo} alt={protagonists} fill className="object-cover" priority />

      <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#090909]/60 via-transparent to-[#090909]" />

      <div className="absolute inset-0 flex flex-col items-center justify-start gap-6 sm:gap-8 text-center px-4 pt-16 sm:pt-20 md:pt-24">
        <p className="uppercase tracking-[0.3em] text-lg sm:text-xl md:text-2xl text-[#A8A8A8]">
          {motivo}
        </p>

        {nameSvg ? (
          <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
            <Image
              src={nameSvg}
              alt={protagonists}
              width={800}
              height={200}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        ) : (
          <h1
            className="font-[var(--font-cinematic-display)] text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold leading-none tracking-wider"
            style={{
              background: "linear-gradient(180deg, #F2F2F2 0%, #C0C0C0 50%, #A81835 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px rgba(168,24,53,0.5))",
            }}
          >
            {protagonists}
          </h1>
        )}

        <button
          onClick={handleScrollDown}
          className="animate-bounce rounded-full border border-[#4A4A4A] p-2 sm:p-3 text-[#F2F2F2] bg-[#171717]/50 backdrop-blur-sm hover:border-[#C0C0C0] hover:bg-[#C0C0C0]/10 transition-all duration-300"
          aria-label="Ver invitación"
        >
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#090909] to-transparent pointer-events-none" />
    </div>
  );
}
