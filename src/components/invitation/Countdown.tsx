"use client";

import { useEffect, useState } from "react";
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
      <p className="uppercase tracking-widest text-xs text-[var(--inv-text-muted)] mb-4">
        Falta muy poco
      </p>
      <div className="flex justify-center gap-4">
        {units.map((u) => (
          <div key={u.label} className="w-16">
            <div className="font-display text-4xl tabular-nums">{u.value}</div>
            <div className="text-xs uppercase text-[var(--inv-text-muted)]">
              {u.label}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
