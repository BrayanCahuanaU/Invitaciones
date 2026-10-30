import Image from "next/image";
import {
  Car,
  Clock,
  Info,
  PawPrint,
  Shirt,
  Users,
} from "lucide-react";
import { InvitationData, WeddingTexts } from "@/content/types";
import {
  BotanicalCorner,
  BotanicalSprig,
  Butterfly,
  FloralCluster,
  GoldDivider,
  RoseBloom,
  SectionHeading,
} from "./Ornaments";

function noteIcon(note: string) {
  const lower = note.toLowerCase();
  if (lower.includes("niño") || lower.includes("adulto")) return Users;
  if (lower.includes("llegar") || lower.includes("hora") || lower.includes("puntual")) return Clock;
  if (lower.includes("estacionamiento") || lower.includes("auto")) return Car;
  if (lower.includes("mascota")) return PawPrint;
  return Info;
}

export function WeddingGuidelines({
  guidelines,
  dressCodeEmblem,
  femaleEmblem,
  maleEmblem,
  arriveIcon,
  texts,
}: {
  guidelines: InvitationData["guidelines"];
  dressCodeEmblem?: string;
  femaleEmblem?: string;
  maleEmblem?: string;
  arriveIcon?: string;
  texts: WeddingTexts;
}) {
  const { dressCode, colorsToAvoid, notes } = guidelines;
  if (!dressCode && !colorsToAvoid?.length && !notes?.length) return null;

  return (
    <section className="relative w-full overflow-hidden px-4 py-14 sm:py-20">
      <FloralCluster className="pointer-events-none absolute -left-14 top-8 h-44 w-auto opacity-70" />
      <FloralCluster
        flip
        className="pointer-events-none absolute -right-14 bottom-16 h-44 w-auto opacity-70"
      />

      <div className="relative mx-auto max-w-4xl">
        <SectionHeading
          eyebrow={texts.guidelines.eyebrow}
          title={texts.guidelines.title}
          subtitle={texts.guidelines.subtitle}
        />

        {dressCode && (
          <div className="elegant-card relative mt-11 overflow-hidden rounded-sm px-6 py-8 sm:px-9 sm:py-10">
            <BotanicalCorner className="pointer-events-none absolute left-0 top-0 h-14 w-14 opacity-88" />
            <BotanicalCorner className="pointer-events-none absolute bottom-0 right-0 h-14 w-14 rotate-180 opacity-88" />
            <RoseBloom className="pointer-events-none absolute -bottom-7 -left-5 h-24 w-24 opacity-85" />
            <Butterfly className="pointer-events-none absolute right-4 top-4 h-6 w-7 rotate-12 opacity-85" />
            <div className="flex flex-col items-center text-center">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full"
                style={{
                  border: "1px solid var(--elegant-line-strong)",
                  color: "var(--elegant-sage-deep)",
                  background: "rgba(110, 31, 51, 0.12)",
                }}
              >
                {dressCodeEmblem ? (
                  <Image
                    src={dressCodeEmblem}
                    alt=""
                    width={64}
                    height={64}
                    sizes="40px"
                    className="h-8 w-8 object-contain"
                  />
                ) : (
                  <Shirt className="h-5 w-5" />
                )}
              </div>
              <BotanicalSprig className="mt-1 h-5 w-12" />
              <p className="elegant-eyebrow mt-4 text-[0.66rem]" style={{ color: "var(--inv-accent)" }}>
                {texts.guidelines.dressCodeLabel}
              </p>
              <p
                className="mt-2 font-elegant-display text-[1.6rem] sm:text-2xl"
                style={{ color: "var(--inv-text)" }}
              >
                {dressCode.level}
              </p>
              <GoldDivider className="mt-5" />
            </div>

            <div className="mt-7 grid gap-6 sm:grid-cols-2 sm:gap-10">
              {dressCode.femaleSuggestions && dressCode.femaleSuggestions.length > 0 && (
                <div className="text-center">
                  {femaleEmblem && (
                    <Image
                      src={femaleEmblem}
                      alt=""
                      width={64}
                      height={64}
                      sizes="56px"
                      className="mx-auto mb-2 h-14 w-14 object-contain"
                    />
                  )}
                  <p
                    className="text-[0.7rem] uppercase tracking-[0.22em]"
                    style={{ color: "var(--inv-accent)" }}
                  >
                    {texts.guidelines.femaleLabel}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {dressCode.femaleSuggestions.map((suggestion) => (
                      <li
                        key={suggestion}
                        className="text-base leading-relaxed"
                        style={{ color: "var(--inv-text-muted)" }}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {dressCode.maleSuggestions && dressCode.maleSuggestions.length > 0 && (
                <div className="text-center">
                  {maleEmblem && (
                    <Image
                      src={maleEmblem}
                      alt=""
                      width={64}
                      height={64}
                      sizes="56px"
                      className="mx-auto mb-2 h-14 w-14 object-contain"
                    />
                  )}
                  <p
                    className="text-[0.7rem] uppercase tracking-[0.22em]"
                    style={{ color: "var(--inv-accent)" }}
                  >
                    {texts.guidelines.maleLabel}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {dressCode.maleSuggestions.map((suggestion) => (
                      <li
                        key={suggestion}
                        className="text-base leading-relaxed"
                        style={{ color: "var(--inv-text-muted)" }}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {colorsToAvoid && colorsToAvoid.length > 0 && (
            <div className="elegant-card rounded-sm px-6 py-8 text-center sm:px-8">
              <BotanicalCorner className="pointer-events-none absolute right-1 top-1 h-10 w-10 rotate-90 opacity-78" />
              <p className="elegant-eyebrow text-[0.66rem]" style={{ color: "var(--inv-accent)" }}>
                {texts.guidelines.colorsEyebrow}
              </p>
              <p
                className="mt-3 font-elegant-display text-[1.5rem]"
                style={{ color: "var(--inv-text)" }}
              >
                {texts.guidelines.colorsTitle}
              </p>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--inv-text-muted)" }}
              >
                {texts.guidelines.colorsNote}
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-5">
                {colorsToAvoid.map((color) => (
                  <div key={color.name} className="flex flex-col items-center gap-2">
                    <div
                      className="elegant-swatch h-16 w-16 rounded-full sm:h-20 sm:w-20"
                      style={{
                        backgroundColor: color.hex,
                        border: "1px solid var(--elegant-line-strong)",
                      }}
                    />
                    <span
                      className="text-sm sm:text-base"
                      style={{ color: "var(--inv-text-muted)" }}
                    >
                      {color.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {notes && notes.length > 0 && (
            <div className="elegant-card rounded-sm px-6 py-8 sm:px-8">
              <BotanicalCorner className="pointer-events-none absolute bottom-1 right-1 h-10 w-10 rotate-180 opacity-78" />
              <div className="text-center">
                <p className="elegant-eyebrow text-[0.66rem]" style={{ color: "var(--inv-accent)" }}>
                  {texts.guidelines.notesEyebrow}
                </p>
                <p
                  className="mt-3 font-elegant-display text-[1.5rem]"
                  style={{ color: "var(--inv-text)" }}
                >
                  {texts.guidelines.notesTitle}
                </p>
              </div>

              <ul className="mt-6 space-y-5">
                {notes.map((note) => {
                  const Icon = noteIcon(note);
                  const isArrive = !!arriveIcon && note.toLowerCase().includes("llegar");
                  return (
                    <li key={note} className="flex flex-col items-center gap-3 text-center">
                      <span
                        className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full"
                        style={{
                          border: "1px solid var(--elegant-line)",
                          color: "var(--elegant-sage-deep)",
                          background: "rgba(110, 31, 51, 0.1)",
                        }}
                      >
                        {isArrive ? (
                          <Image
                            src={arriveIcon!}
                            alt=""
                            width={44}
                            height={44}
                            className="h-9 w-9 object-contain"
                          />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </span>
                      <span
                        className="text-lg leading-relaxed"
                        style={{ color: "var(--inv-text-muted)" }}
                      >
                        {note}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
