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
    <Section>
      <div className="flex items-center justify-center gap-2 mb-4">
        <Timer className="w-4 h-4 text-[var(--inv-accent)]" />
        <p className="uppercase tracking-widest text-xs text-[var(--inv-text-muted)]">
          Falta muy poco
        </p>
      </div>
      <div className="flex justify-center gap-6 md:gap-10">
        {units.map((u) => (
          <div key={u.label} className="w-16 md:w-20">
            <div className="font-display text-4xl md:text-5xl tabular-nums">
              {u.value}
            </div>
            <div className="text-xs uppercase text-[var(--inv-text-muted)] mt-1">
              {u.label}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
