"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { MailOpen, Volume2, VolumeX } from "lucide-react";
import { WeddingTexts } from "@/content/types";
import { fillTemplate } from "@/content/wedding-texts";
import {
  BotanicalBranch,
  BotanicalSprig,
  Butterfly,
  CornerFlourish,
  FloralCluster,
  GoldDivider,
  LeafGarland,
  Monogram,
} from "./Ornaments";

type Stage = "closed" | "opening" | "open";

export function ElegantEnvelope({
  coupleName,
  dateLabel,
  city,
  monogram,
  audioSrc,
  sealEmblem,
  texts,
  children,
}: {
  coupleName: string;
  dateLabel: string;
  city?: string;
  monogram: string;
  audioSrc?: string;
  sealEmblem?: string;
  texts: WeddingTexts;
  children: React.ReactNode;
}) {
  const [stage, setStage] = useState<Stage>("closed");
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeRef = useRef<number | null>(null);
  const fadeTimeoutRef = useRef<number | null>(null);
  const openedRef = useRef(false);
  const gesturesCleanupRef = useRef<(() => void) | null>(null);

  // Los nombres completos son largos: se muestran en dos líneas con el "&"
  // en medio para que no se salgan de la tarjeta.
  const [brideName, ...groomRest] = coupleName.split(/\s*&\s*/);
  const groomName = groomRest.length ? groomRest.join(" & ") : undefined;

  // Fundido de volumen reutilizable (entrada y salida del sonido). Incluye un
  // temporizador de respaldo porque requestAnimationFrame se pausa cuando la
  // pestaña queda oculta.
  const fadeTo = useCallback(
    (
      audio: HTMLAudioElement,
      target: number,
      duration = 900,
      onDone?: () => void
    ) => {
      if (fadeRef.current !== null) cancelAnimationFrame(fadeRef.current);
      if (fadeTimeoutRef.current !== null) {
        window.clearTimeout(fadeTimeoutRef.current);
        fadeTimeoutRef.current = null;
      }

      const from = audio.volume;
      const start = performance.now();
      let finished = false;

      const finish = () => {
        if (finished) return;
        finished = true;
        if (fadeTimeoutRef.current !== null) {
          window.clearTimeout(fadeTimeoutRef.current);
          fadeTimeoutRef.current = null;
        }
        audio.volume = Math.min(1, Math.max(0, target));
        onDone?.();
      };

      const step = (now: number) => {
        if (finished) return;
        const progress = Math.min(1, (now - start) / duration);
        audio.volume = Math.min(
          1,
          Math.max(0, from + (target - from) * progress)
        );
        if (progress < 1) {
          fadeRef.current = requestAnimationFrame(step);
        } else {
          fadeRef.current = null;
          finish();
        }
      };

      fadeRef.current = requestAnimationFrame(step);
      fadeTimeoutRef.current = window.setTimeout(finish, duration + 150);
    },
    []
  );

  // Permite revisar el diseño completo con ?preview=1 sin tocar el sobre.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("preview") === "1") setStage("open");
  }, []);

  // La bendición suena en la pantalla del sobre. Los navegadores bloquean
  // el autoplay, así que se intenta al cargar y, si falla, en el primer
  // toque/tecla (sin contar el botón de abrir, que ya cambia de canción).
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioSrc) return;
    let disposed = false;

    const cleanupGestures = () => {
      gestureEvents.forEach((name) =>
        window.removeEventListener(name, onGesture)
      );
    };

    const play = () => {
      if (disposed || openedRef.current) return;
      audio
        .play()
        .then(() => {
          if (disposed || openedRef.current) {
            audio.pause();
            return;
          }
          fadeTo(audio, 0.5, 1600);
          setSoundOn(true);
          cleanupGestures();
        })
        .catch(() => {
          // Sin permiso todavía: el botón de sonido queda disponible.
        });
    };

    const gestureEvents = ["pointerdown", "keydown", "touchstart"] as const;
    const onGesture = (event: Event) => {
      const target = event.target as HTMLElement | null;
      // El botón de abrir cambia de canción y el de sonido ya controla el
      // audio por su cuenta.
      if (target?.closest?.("[data-envelope-open], [data-envelope-sound]")) {
        return;
      }
      play();
    };

    gestureEvents.forEach((name) =>
      window.addEventListener(name, onGesture, { passive: true })
    );
    gesturesCleanupRef.current = cleanupGestures;

    audio.volume = 0;
    const autoplay = window.setTimeout(play, 250);

    return () => {
      disposed = true;
      window.clearTimeout(autoplay);
      cleanupGestures();
      gesturesCleanupRef.current = null;
      if (fadeRef.current !== null) cancelAnimationFrame(fadeRef.current);
      if (fadeTimeoutRef.current !== null) {
        window.clearTimeout(fadeTimeoutRef.current);
        fadeTimeoutRef.current = null;
      }
      audio.pause();
    };
  }, [audioSrc, fadeTo]);

  function handleOpen() {
    if (stage !== "closed") return;
    openedRef.current = true;

    const audio = audioRef.current;
    if (audio && !audio.paused) {
      fadeTo(audio, 0, 650, () => audio.pause());
      setSoundOn(false);
    }

    window.dispatchEvent(new CustomEvent("invitation:opened"));
    setStage("opening");
    window.setTimeout(() => setStage("open"), 1700);
  }

  function toggleSound() {
    const audio = audioRef.current;
    if (!audio) return;

    // La elección del usuario manda: ya no arrancamos el audio con
    // cualquier toque en la pantalla.
    gesturesCleanupRef.current?.();
    gesturesCleanupRef.current = null;

    if (audio.paused) {
      audio
        .play()
        .then(() => {
          fadeTo(audio, 0.5, 900);
          setSoundOn(true);
        })
        .catch(() => setSoundOn(false));
    } else {
      fadeTo(audio, 0, 400, () => audio.pause());
      setSoundOn(false);
    }
  }

  return (
    <>
      <div className={stage === "open" ? "relative z-10" : "relative z-10 invisible"}>
        {children}
      </div>

      <AnimatePresence>
        {stage !== "open" && (
          <motion.div
            key="elegant-envelope"
            className="fixed inset-0 z-50 overflow-hidden"
            style={{
              background:
                "radial-gradient(120% 90% at 50% 0%, #FCF9F2 0%, #F6F1E7 48%, #EDE5D7 100%)",
              color: "var(--inv-text)",
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            {audioSrc && (
              <audio ref={audioRef} src={audioSrc} preload="auto" loop />
            )}

            <div
              className="pointer-events-none absolute inset-3 sm:inset-6"
              style={{ border: "1px solid var(--elegant-line)" }}
            />

            <div className="pointer-events-none absolute -bottom-28 -left-24 h-[480px] opacity-80 sm:-left-10 sm:h-[600px]">
              <BotanicalBranch className="h-full w-auto" />
            </div>
            <div className="pointer-events-none absolute -right-24 -top-24 h-[420px] opacity-70 sm:-right-6 sm:h-[520px]">
              <BotanicalBranch className="h-full w-auto" flip />
            </div>

            <FloralCluster className="pointer-events-none absolute -left-16 top-8 hidden h-64 w-auto opacity-60 sm:block" />
            <FloralCluster
              flip
              className="pointer-events-none absolute -right-16 bottom-4 hidden h-64 w-auto opacity-60 sm:block"
            />

            <Butterfly className="pointer-events-none absolute left-[6%] top-[24%] h-7 w-8 -rotate-12 opacity-70 sm:left-[13%] sm:h-9 sm:w-10" />
            <Butterfly
              flip
              className="pointer-events-none absolute bottom-[22%] right-[6%] h-6 w-7 rotate-12 opacity-60 sm:right-[13%] sm:h-8 sm:w-9"
            />

            <div className="relative flex min-h-dvh flex-col items-center justify-center px-6 py-10">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.8 }}
                className="flex flex-col items-center text-center"
              >
                <p
                  className="elegant-eyebrow text-[0.7rem]"
                  style={{ color: "var(--inv-accent)" }}
                >
                  {texts.envelope.eyebrow}
                </p>
                <p
                  className="mt-2 font-elegant-script text-[2rem] sm:text-4xl"
                  style={{ color: "var(--inv-text)" }}
                >
                  {texts.envelope.title}
                </p>
                <BotanicalSprig className="mt-2 h-7 w-16" />
              </motion.div>

              {/* Sobre verde salvia */}
              <motion.div
                className="relative mt-5 w-[min(88vw,380px)] sm:mt-6"
                style={{ perspective: 1400 }}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.26, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative aspect-[5/6.4] w-full">
                  <Butterfly className="pointer-events-none absolute -left-5 top-[28%] z-30 h-6 w-7 -rotate-12 opacity-80" />
                  <Butterfly
                    flip
                    className="pointer-events-none absolute -right-4 top-[44%] z-30 h-5 w-6 rotate-12 opacity-70"
                  />
                  {/* Cuerpo trasero del sobre */}
                  <div
                    className="absolute inset-0 z-0 rounded-[3px]"
                    style={{
                      background:
                        "linear-gradient(155deg, #98AC97 0%, #7E967F 55%, #6A836E 100%)",
                      border: "1px solid rgba(79, 104, 84, 0.55)",
                      boxShadow: "0 34px 70px -42px rgba(34,49,39,0.7)",
                    }}
                  />

                  {/* Tarjeta interior */}
                  <motion.div
                    className={`absolute inset-x-4 bottom-4 top-7 overflow-hidden rounded-[2px] ${
                      stage === "opening" ? "z-30" : "z-10"
                    }`}
                    style={{
                      position: "absolute",
                      background:
                        "linear-gradient(180deg, #FFFDF8 0%, #FBF7EF 62%, #F3EBDE 100%)",
                      border: "1px solid rgba(216, 196, 155, 0.9)",
                      boxShadow: "0 18px 40px -30px rgba(34,49,39,0.55)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={
                      stage === "opening"
                        ? { y: -58, opacity: 1 }
                        : { y: 0, opacity: 0 }
                    }
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div
                      className="pointer-events-none absolute inset-[6px]"
                      style={{ border: "1px solid rgba(175, 138, 79, 0.35)" }}
                    />
                    <div className="pointer-events-none absolute left-1.5 top-1.5 h-10 w-10 opacity-70">
                      <CornerFlourish className="h-full w-full" />
                    </div>
                    <div className="pointer-events-none absolute bottom-1.5 right-1.5 h-10 w-10 rotate-180 opacity-70">
                      <CornerFlourish className="h-full w-full" />
                    </div>

                    <div className="flex h-full flex-col items-center justify-center px-5 text-center">
                      <Monogram
                        text={monogram}
                        className="h-12 w-12 text-[0.7rem] sm:h-14 sm:w-14 sm:text-xs"
                      />
                      <p
                        className="mt-4 font-elegant-script text-[1.35rem] leading-[1.05] sm:text-[1.7rem]"
                        style={{ color: "var(--inv-text)" }}
                      >
                        {brideName}
                        {groomName && (
                          <>
                            <span
                              className="my-0.5 block font-elegant-body text-[0.8rem] leading-none sm:text-[0.9rem]"
                              style={{ color: "var(--inv-accent)" }}
                            >
                              &
                            </span>
                            {groomName}
                          </>
                        )}
                      </p>
                      <GoldDivider className="my-3.5" />
                      <p
                        className="text-[0.85rem] font-semibold uppercase tracking-[0.16em]"
                        style={{ color: "var(--inv-text)" }}
                      >
                        {dateLabel}
                      </p>
                      {city && (
                        <p
                          className="mt-1.5 text-[0.72rem] font-medium uppercase tracking-[0.18em]"
                          style={{ color: "var(--inv-text-muted)" }}
                        >
                          {city}
                        </p>
                      )}
                    </div>

                    <BotanicalBranch className="pointer-events-none absolute -bottom-4 -left-5 h-24 w-auto opacity-80" />
                    <BotanicalBranch
                      flip
                      className="pointer-events-none absolute -bottom-4 -right-5 h-24 w-auto opacity-80"
                    />
                  </motion.div>

                  {/* Bolsillo frontal */}
                  <div
                    className="absolute inset-0 z-20"
                    style={{
                      clipPath:
                        "polygon(0 36%, 50% 62%, 100% 36%, 100% 100%, 0 100%)",
                      background:
                        "linear-gradient(155deg, #8FA58E 0%, #7B947D 55%, #68816C 100%)",
                    }}
                  >
                    <div
                      className="absolute inset-x-5 bottom-5 top-5"
                      style={{ border: "1px solid rgba(216, 196, 155, 0.18)" }}
                    />
                  </div>

                  {/* Línea dorada del pliegue */}
                  <svg
                    className="pointer-events-none absolute inset-0 z-[25] h-full w-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <path
                      d="M0 36 L50 62 L100 36"
                      fill="none"
                      stroke="rgba(232, 214, 178, 0.55)"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>

                  {/* Solapa */}
                  <motion.div
                    className="absolute inset-x-0 top-0 z-40 h-[61%] origin-top"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      background:
                        "linear-gradient(180deg, #A3B6A0 0%, #8DA38C 68%, #7C947E 100%)",
                      filter: "drop-shadow(0 10px 10px rgba(34, 49, 39, 0.22))",
                    }}
                    animate={stage === "opening" ? { rotateX: -178 } : { rotateX: 0 }}
                    transition={{ duration: 1.05, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <div
                      className="absolute inset-x-0 top-0 h-full"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                        borderBottom: "1px solid rgba(232, 214, 178, 0.5)",
                      }}
                    />
                    <svg
                      className="pointer-events-none absolute inset-0 h-full w-full"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      aria-hidden
                    >
                      <path
                        d="M0 0 L50 100 L100 0"
                        fill="none"
                        stroke="rgba(232, 214, 178, 0.55)"
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                    <div className="absolute inset-x-0 top-5 flex justify-center">
                      <span
                        className="text-[0.6rem] uppercase tracking-[0.28em]"
                        style={{ color: "rgba(255, 253, 248, 0.72)" }}
                      >
                        {monogram}
                      </span>
                    </div>
                  </motion.div>

                  {/* Sello de cera */}
                  <motion.div
                    className="absolute left-1/2 top-[54%] z-50 -translate-x-1/2 -translate-y-1/2"
                    animate={
                      stage === "opening"
                        ? { opacity: 0, scale: 0.55, rotate: -18 }
                        : { opacity: 1, scale: 1, rotate: 0 }
                    }
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  >
                    {sealEmblem ? (
                      <Image
                        src={sealEmblem}
                        alt=""
                        width={100}
                        height={100}
                        sizes="72px"
                        className="h-16 w-16 object-contain sm:h-[4.5rem] sm:w-[4.5rem]"
                        style={{
                          filter:
                            "drop-shadow(0 8px 14px rgba(20, 40, 70, 0.35))",
                        }}
                      />
                    ) : (
                      <div
                        className="relative flex h-16 w-16 items-center justify-center rounded-full sm:h-[4.5rem] sm:w-[4.5rem]"
                        style={{
                          background:
                            "radial-gradient(circle at 35% 28%, #D8BF8A 0%, #B79255 52%, #8D6C3C 100%)",
                          boxShadow:
                            "0 10px 22px -10px rgba(100,75,35,0.8), inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(70,50,20,0.28)",
                        }}
                      >
                        <span
                          className="absolute inset-[5px] rounded-full"
                          style={{ border: "1px solid rgba(255,253,248,0.38)" }}
                        />
                        <span
                          className="font-elegant-display text-lg leading-none"
                          style={{ color: "#FFF9EE", letterSpacing: "0.04em" }}
                        >
                          {monogram}
                        </span>
                      </div>
                    )}
                  </motion.div>

                  {/* Destello */}
                  <motion.div
                    className="pointer-events-none absolute inset-0 z-[60] overflow-hidden"
                    aria-hidden
                  >
                    <motion.span
                      className="absolute -top-1/4 h-[150%] w-1/3"
                      style={{
                        background:
                          "linear-gradient(110deg, transparent, rgba(255,255,255,0.4), transparent)",
                        transform: "skewX(-18deg)",
                      }}
                      animate={{ x: ["-180%", "480%"] }}
                      transition={{
                        duration: 3.6,
                        repeat: Infinity,
                        repeatDelay: 2.4,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: stage === "opening" ? 0 : 1 }}
                transition={{ delay: 0.7, duration: 0.7 }}
                className="mt-7 flex flex-col items-center gap-2.5"
              >
                <button
                  type="button"
                  data-envelope-open
                  onClick={handleOpen}
                  disabled={stage !== "closed"}
                  className="elegant-btn disabled:cursor-default"
                  aria-label={fillTemplate(texts.envelope.openAriaLabel, {
                    couple: coupleName,
                  })}
                >
                  <MailOpen className="h-4 w-4" />
                  {texts.envelope.openButton}
                </button>
                <p
                  className="text-[0.65rem] uppercase tracking-[0.24em]"
                  style={{ color: "var(--inv-text-muted)", opacity: 0.8 }}
                >
                  {texts.envelope.footerNote}
                </p>
                <LeafGarland className="mt-0.5 h-5 w-36 opacity-80" />
              </motion.div>
            </div>

            {audioSrc && (
              <button
                type="button"
                data-envelope-sound
                onClick={toggleSound}
                aria-pressed={soundOn}
                className="absolute bottom-5 right-5 z-[70] flex items-center gap-2 rounded-full px-4 py-2.5 text-[0.62rem] uppercase tracking-[0.18em] transition-transform hover:scale-[1.03] sm:bottom-8 sm:right-8"
                style={{
                  border: "1px solid var(--elegant-line-strong)",
                  background: "rgba(255,253,248,0.86)",
                  color: "var(--inv-text-muted)",
                  backdropFilter: "blur(6px)",
                  boxShadow: "0 10px 26px -18px rgba(34,49,39,0.55)",
                }}
              >
                {soundOn ? (
                  <Volume2 className="h-3.5 w-3.5" style={{ color: "var(--elegant-sage-deep)" }} />
                ) : (
                  <VolumeX className="h-3.5 w-3.5" />
                )}
                <span>{soundOn ? texts.envelope.soundOff : texts.envelope.soundOn}</span>
                {!soundOn && (
                  <span
                    className="pointer-events-none absolute inset-0 animate-ping rounded-full"
                    style={{
                      border: "1px solid var(--elegant-line-strong)",
                      opacity: 0.25,
                    }}
                    aria-hidden
                  />
                )}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
