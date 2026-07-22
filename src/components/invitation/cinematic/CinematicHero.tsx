"use client";

import Image from "next/image";
import { ChevronDown, Calendar, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}

export function CinematicHero({
  photo,
  protagonists,
  motivo,
  eventDate,
  venueName,
}: {
  photo: string;
  protagonists: string;
  motivo: string;
  eventDate: string;
  venueName: string;
}) {
  const target = new Date(eventDate).getTime();
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setRemaining(getRemaining(target));
    setMounted(true);
    const id = setInterval(() => setRemaining(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  function handleScrollDown() {
    const section = document.getElementById("quote");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  }

  const dateObj = new Date(eventDate);
  const dayName = new Intl.DateTimeFormat("es-PE", { weekday: "long" }).format(dateObj);
  const dayNumber = new Intl.DateTimeFormat("es-PE", { day: "numeric" }).format(dateObj);
  const monthName = new Intl.DateTimeFormat("es-PE", { month: "long" }).format(dateObj);

  return (
    <div className="relative w-full h-screen min-h-[600px] overflow-hidden">
      <Image src={photo} alt={protagonists} fill className="object-cover" priority />

      <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#090909]/60 via-transparent to-[#090909]" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <p className="uppercase tracking-[0.3em] text-xs sm:text-sm text-[#A8A8A8] mb-4 sm:mb-6">
          {motivo}
        </p>

        <h1
          className="font-[var(--font-cinematic-display)] text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold leading-none tracking-wider mb-4 sm:mb-6"
          style={{
            background: "linear-gradient(180deg, #F2F2F2 0%, #D8A718 50%, #A81835 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 30px rgba(168,24,53,0.5))",
          }}
        >
          {protagonists}
        </h1>

        <div className="flex items-center gap-3 sm:gap-4 text-[#A8A8A8] mb-6 sm:mb-8">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#D8A718]" />
          <span className="uppercase tracking-widest text-xs sm:text-sm capitalize">
            {dayName} {dayNumber} de {monthName}
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 text-[#A8A8A8] mb-8 sm:mb-12">
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#D8A718]" />
          <span className="uppercase tracking-widest text-xs sm:text-sm">{venueName}</span>
        </div>

        {mounted && (
          <div className="flex gap-4 sm:gap-8 mb-10 sm:mb-16">
            {[
              { label: "Días", value: remaining.days },
              { label: "Horas", value: remaining.hours },
              { label: "Min", value: remaining.minutes },
              { label: "Seg", value: remaining.seconds },
            ].map((u) => (
              <div key={u.label} className="text-center">
                <div
                  className="text-3xl sm:text-5xl md:text-6xl font-bold tabular-nums"
                  style={{
                    fontFamily: "var(--font-cinematic-display)",
                    background: "linear-gradient(180deg, #F1C232 0%, #D8A718 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 0 10px rgba(216,167,24,0.3))",
                  }}
                >
                  {u.value}
                </div>
                <div className="text-[10px] sm:text-xs uppercase tracking-widest text-[#A8A8A8] mt-1">
                  {u.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleScrollDown}
          className="group relative inline-flex items-center gap-2 rounded-full border border-[#4A4A4A] px-6 py-3 sm:px-8 sm:py-3 text-xs sm:text-sm uppercase tracking-widest text-[#F2F2F2] bg-[#171717]/50 backdrop-blur-sm hover:border-[#A81835] hover:bg-[#A81835]/10 transition-all duration-300"
        >
          <span>Ver Invitación</span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#090909] to-transparent pointer-events-none" />
    </div>
  );
}
