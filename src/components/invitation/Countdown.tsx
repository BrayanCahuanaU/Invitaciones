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

export function Countdown({ eventDate }: { eventDate: string }) {
  const target = new Date(eventDate).getTime();
  const [remaining, setRemaining] = useState(() => getRemaining(target));

  useEffect(() => {
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
    <Section backgroundImage="/invitaciones/demo-quince/img/papel-fondo.png" fullWidth>
      <div className="flex items-center justify-center gap-2 mb-4">
        <Timer className="w-4 h-4 text-amber-700" />
        <p className="uppercase tracking-widest text-xs text-gray-500">
          Falta muy poco
        </p>
      </div>
      <div className="flex justify-center gap-6 md:gap-15">
        {units.map((u) => (
          <div key={u.label} className="w-16 md:w-auto">
            <div
              className="font-display text-4xl md:text-7xl tabular-nums font-bold"
              style={{
                background: "linear-gradient(180deg, #f5d98e 0%, #d4a843 40%, #b8860b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 1px 2px rgba(180,130,40,0.4))",
              }}
            >
              {u.value}
            </div>
            <div className="text-xs uppercase text-gray-500 mt-1">
              {u.label}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
