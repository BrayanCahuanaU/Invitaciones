"use client";

import { useEffect, useState } from "react";
import { WeddingTexts } from "@/content/types";
import {
  BotanicalCorner,
  BotanicalSprig,
  Butterfly,
  FloralCluster,
  GoldDivider,
} from "./Ornaments";

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  };
}

const ZERO = { days: 0, hours: 0, minutes: 0, seconds: 0 };

export function WeddingCountdown({
  eventDate,
  dateLabel,
  texts,
}: {
  eventDate: string;
  dateLabel: string;
  texts: WeddingTexts;
}) {
  const target = new Date(eventDate).getTime();
  const [remaining, setRemaining] = useState(ZERO);

  useEffect(() => {
    setRemaining(getRemaining(target));
    const id = window.setInterval(() => setRemaining(getRemaining(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const units = [
    { label: texts.countdown.days, value: remaining.days, pad: false },
    { label: texts.countdown.hours, value: remaining.hours, pad: true },
    { label: texts.countdown.minutes, value: remaining.minutes, pad: true },
    { label: texts.countdown.seconds, value: remaining.seconds, pad: true },
  ];

  return (
    <section className="w-full px-4 py-14 sm:py-20">
      <div className="elegant-card relative mx-auto max-w-3xl overflow-hidden rounded-sm px-5 py-12 text-center sm:px-10 sm:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 90% at 50% 0%, rgba(255,255,255,0.9) 0%, rgba(255,253,248,0) 70%)",
          }}
        />
        <BotanicalCorner className="pointer-events-none absolute left-2 top-2 h-14 w-14 opacity-85" />
        <BotanicalCorner className="pointer-events-none absolute bottom-2 right-2 h-14 w-14 rotate-180 opacity-85" />
        <FloralCluster className="pointer-events-none absolute left-0 top-0 h-36 w-auto opacity-78" />
        <FloralCluster
          flip
          className="pointer-events-none absolute bottom-0 right-0 h-36 w-auto opacity-78"
        />
        <Butterfly className="pointer-events-none absolute right-[12%] top-6 h-6 w-7 rotate-12 opacity-85" />

        <div className="relative">
          <BotanicalSprig className="mx-auto h-7 w-16" />
          <p className="elegant-eyebrow mt-2" style={{ color: "var(--inv-accent)" }}>
            {texts.countdown.eyebrow}
          </p>
          <h2
            className="mt-3 font-elegant-display text-[2rem] sm:text-4xl"
            style={{ color: "var(--inv-text)" }}
          >
            {texts.countdown.title}
          </h2>
          <GoldDivider className="mt-5" />

          <div className="mt-9 grid grid-cols-4 gap-2 sm:gap-4">
            {units.map((unit) => (
              <div
                key={unit.label}
                className="rounded-sm px-1 py-3 sm:px-3 sm:py-4"
                style={{
                  border: "1px solid var(--elegant-line)",
                  background: "rgba(242, 235, 221, 0.55)",
                }}
              >
                <div
                  className="font-elegant-display text-[2.1rem] tabular-nums leading-none sm:text-5xl md:text-6xl"
                  style={{ color: "var(--elegant-sage-deep)" }}
                >
                  {unit.pad ? String(unit.value).padStart(2, "0") : unit.value}
                </div>
                <div
                  className="mt-2 text-[0.62rem] uppercase tracking-[0.16em] sm:text-[0.68rem]"
                  style={{ color: "var(--inv-text-muted)" }}
                >
                  {unit.label}
                </div>
              </div>
            ))}
          </div>

          <p
            className="mt-7 text-[1.02rem] font-semibold uppercase tracking-[0.16em] sm:text-[1.15rem]"
            style={{ color: "var(--inv-text)" }}
          >
            {dateLabel}
          </p>
        </div>
      </div>
    </section>
  );
}
