"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { WeddingTexts } from "@/content/types";
import {
  BabyBreath,
  BotanicalBranch,
  BotanicalWreath,
  Butterfly,
  FloralCluster,
  GoldDivider,
  Monogram,
} from "./Ornaments";

export function ElegantHero({
  protagonists,
  dateLabel,
  city,
  monogram,
  photo,
  emblem,
  texts,
}: {
  protagonists: string;
  dateLabel: string;
  city?: string;
  monogram: string;
  photo?: string;
  emblem?: string;
  texts: WeddingTexts;
}) {
  function scrollToInvitation() {
    document.getElementById("historia")?.scrollIntoView({ behavior: "smooth" });
  }

  const parts = protagonists.split(/\s*&\s*/).filter(Boolean);
  const bride = parts[0] ?? protagonists;
  const groom = parts.length > 1 ? parts.slice(1).join(" & ") : undefined;

  // Nombres largos (con apellidos) necesitan un tamaño menor para no
  // chocar con la corona botánica del hero.
  const longestName = Math.max(bride.length, groom?.length ?? 0);
  const nameClass =
    longestName > 18
      ? "text-[1.65rem] sm:text-[2.2rem] md:text-[2.6rem]"
      : longestName > 10
        ? "text-[2.05rem] sm:text-[2.6rem] md:text-[2.9rem]"
        : "text-[2.35rem] sm:text-[3.1rem] md:text-[3.5rem]";

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-3 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(85% 60% at 50% 12%, rgba(255,255,255,0.85) 0%, rgba(248,244,235,0) 72%)",
        }}
      />

      <BotanicalBranch className="pointer-events-none absolute -bottom-32 -left-24 h-[440px] w-auto opacity-80 sm:-left-16 sm:h-[560px]" />
      <BotanicalBranch
        flip
        className="pointer-events-none absolute -bottom-32 -right-24 h-[440px] w-auto opacity-80 sm:-right-16 sm:h-[560px]"
      />

      <FloralCluster className="pointer-events-none absolute -left-12 -top-8 hidden h-48 w-auto opacity-70 sm:block" />
      <FloralCluster
        flip
        className="pointer-events-none absolute -right-12 -top-6 hidden h-44 w-auto opacity-60 sm:block"
      />

      <Butterfly className="pointer-events-none absolute right-[8%] top-[18%] h-6 w-7 rotate-12 opacity-70 sm:h-8 sm:w-9" />
      <Butterfly
        flip
        className="pointer-events-none absolute bottom-[20%] left-[7%] h-5 w-6 -rotate-12 opacity-60 sm:h-7 sm:w-8"
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="elegant-paper-frame relative w-full max-w-[640px] px-4 pb-10 pt-9 sm:px-9 sm:pb-14 sm:pt-12"
      >
        <div className="pointer-events-none absolute -left-8 top-10 hidden w-28 opacity-90 sm:block">
          <BotanicalBranch className="h-auto w-full" />
        </div>
        <div className="pointer-events-none absolute -right-8 bottom-10 hidden w-28 opacity-90 sm:block">
          <BotanicalBranch className="h-auto w-full" flip />
        </div>

        <BabyBreath className="pointer-events-none absolute bottom-3 left-1 hidden h-24 w-auto opacity-60 sm:block" />
        <BabyBreath className="pointer-events-none absolute right-1 top-3 hidden h-24 w-auto rotate-180 opacity-50 sm:block" />

        <div className="relative flex flex-col items-center text-center">
          {photo ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.12, duration: 0.9 }}
              className="relative mb-4 h-24 w-24 overflow-hidden rounded-full sm:h-28 sm:w-28"
            >
              <Image
                src={photo}
                alt={protagonists}
                fill
                sizes="112px"
                className="object-cover"
                priority
              />
              <span
                className="pointer-events-none absolute inset-1 rounded-full"
                style={{ border: "1px solid var(--elegant-gold-soft)" }}
              />
            </motion.div>
          ) : emblem ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.8 }}
            >
              <Image
                src={emblem}
                alt=""
                width={112}
                height={112}
                sizes="56px"
                className="h-12 w-12 object-contain sm:h-14 sm:w-14"
                style={{ mixBlendMode: "multiply" }}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.8 }}
            >
              <Monogram
                text={monogram}
                className="h-12 w-12 text-xs sm:h-14 sm:w-14 sm:text-sm"
              />
            </motion.div>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.22, duration: 0.9 }}
            className="mt-5 font-elegant-script text-[1.7rem] sm:mt-6 sm:text-3xl"
            style={{ color: "var(--inv-accent)" }}
          >
            {texts.hero.title}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-3 aspect-square w-full max-w-[500px] sm:mt-4 sm:max-w-[560px]"
          >
            <BotanicalWreath className="pointer-events-none absolute inset-0 h-full w-full" />

            <div className="absolute inset-0 flex flex-col items-center justify-center px-[17%] text-center">
              <p
                className={`font-elegant-script leading-[0.9] ${nameClass}`}
                style={{ color: "var(--inv-text)" }}
              >
                {bride}
              </p>
              {groom && (
                <>
                  <span
                    className="my-1 font-elegant-script text-xl leading-none sm:my-1.5 sm:text-2xl"
                    style={{ color: "var(--elegant-gold)" }}
                  >
                    &amp;
                  </span>
                  <p
                    className={`font-elegant-script leading-[0.9] ${nameClass}`}
                    style={{ color: "var(--inv-text)" }}
                  >
                    {groom}
                  </p>
                </>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            className="flex w-full flex-col items-center"
          >
            <GoldDivider className="-mt-1" />

            <p
              className="mt-5 font-elegant-body text-[1.05rem] font-semibold uppercase tracking-[0.18em] sm:text-[1.15rem]"
              style={{ color: "var(--inv-text)" }}
            >
              {dateLabel}
            </p>
            {city && (
              <p
                className="mt-2 flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em]"
                style={{ color: "var(--inv-text-muted)", opacity: 0.85 }}
              >
                <span
                  className="h-1 w-1 rotate-45"
                  style={{ backgroundColor: "var(--elegant-gold)" }}
                />
                {city}
                <span
                  className="h-1 w-1 rotate-45"
                  style={{ backgroundColor: "var(--elegant-gold)" }}
                />
              </p>
            )}

            <button
              type="button"
              onClick={scrollToInvitation}
              className="group mt-7 flex flex-col items-center gap-2"
              aria-label={texts.hero.discoverAriaLabel}
            >
              <span
                className="elegant-btn-outline"
                style={{ paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
              >
                {texts.hero.discoverButton}
                <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
              </span>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
