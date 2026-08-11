"use client";

import { useEffect, useState } from "react";
import { Timer } from "lucide-react";
import { Section } from "./Section";

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}

export function Countdown({ eventDate, backgroundImage }: { eventDate: string; backgroundImage?: string }) {
  const target = new Date(eventDate).getTime();
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setRemaining(getRemaining(target));
    setMounted(true);
    const id = setInterval(() => setRemaining(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units: { label: string; value: number }[] = [
    { label: "Días", value: remaining.days },
    { label: "Horas", value: remaining.hours },
    { label: "Min", value: remaining.minutes },
    { label: "Seg", value: remaining.seconds },
  ];

  return (
    <Section backgroundImage={backgroundImage ?? "/invitaciones/demo-quince/img/papel-fondo.png"} fullWidth >
      <div className="flex flex-col items-center gap-2 mb-5">
        <Timer className="w-6 h-6 text-[#C0C0C0]" />
        <p className="uppercase tracking-widest text-xs text-gray-800 md:text-xl">
          Falta muy poco
        </p>
      </div>
      <div className="flex justify-center gap-6 md:gap-15">
        {units.map((u) => (
          <div key={u.label} className="w-16 md:w-24">
            <div className="font-display text-4xl md:text-7xl tabular-nums font-bold text-[#211B04]" style={{ textShadow: "0 0 5px rgba(60, 9, 84, 0.87)" }}>
              {u.value}
            </div>
            <div className="text-s uppercase text-gray-800 mt-1">
              {u.label}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
