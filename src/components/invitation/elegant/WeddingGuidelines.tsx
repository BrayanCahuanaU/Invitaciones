import {
  Car,
  Clock,
  Info,
  PawPrint,
  Shirt,
  Sparkles,
  Users,
} from "lucide-react";
import { InvitationData, WeddingTexts } from "@/content/types";
import { BotanicalCorner, BotanicalSprig, GoldDivider, SectionHeading } from "./Ornaments";

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
  texts,
}: {
  guidelines: InvitationData["guidelines"];
  texts: WeddingTexts;
}) {
  const { dressCode, colorsToAvoid, notes } = guidelines;
  if (!dressCode && !colorsToAvoid?.length && !notes?.length) return null;

  return (
    <section className="w-full px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow={texts.guidelines.eyebrow}
          title={texts.guidelines.title}
          subtitle={texts.guidelines.subtitle}
        />

        {dressCode && (
          <div className="elegant-card relative mt-11 overflow-hidden rounded-sm px-6 py-8 sm:px-9 sm:py-10">
            <BotanicalCorner className="pointer-events-none absolute left-0 top-0 h-14 w-14 opacity-75" />
            <BotanicalCorner className="pointer-events-none absolute bottom-0 right-0 h-14 w-14 rotate-180 opacity-75" />
            <div className="flex flex-col items-center text-center">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full"
                style={{
                  border: "1px solid var(--elegant-line-strong)",
                  color: "var(--elegant-sage-deep)",
                  background: "rgba(139, 165, 139, 0.14)",
                }}
              >
                <Shirt className="h-5 w-5" />
              </div>
              <BotanicalSprig className="mt-1 h-5 w-12" />
              <p className="elegant-eyebrow mt-4 text-[0.56rem]" style={{ color: "var(--inv-accent)" }}>
                {texts.guidelines.dressCodeLabel}
              </p>
              <p
                className="mt-2 font-elegant-display text-xl sm:text-2xl"
                style={{ color: "var(--inv-text)" }}
              >
                {dressCode.level}
              </p>
              <GoldDivider className="mt-5" />
            </div>

            <div className="mt-7 grid gap-6 sm:grid-cols-2 sm:gap-10">
              {dressCode.femaleSuggestions && dressCode.femaleSuggestions.length > 0 && (
                <div className="text-center">
                  <p
                    className="text-[0.6rem] uppercase tracking-[0.3em]"
                    style={{ color: "var(--inv-accent)" }}
                  >
                    {texts.guidelines.femaleLabel}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {dressCode.femaleSuggestions.map((suggestion) => (
                      <li
                        key={suggestion}
                        className="text-sm leading-relaxed"
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
                  <p
                    className="text-[0.6rem] uppercase tracking-[0.3em]"
                    style={{ color: "var(--inv-accent)" }}
                  >
                    {texts.guidelines.maleLabel}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {dressCode.maleSuggestions.map((suggestion) => (
                      <li
                        key={suggestion}
                        className="text-sm leading-relaxed"
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
              <BotanicalCorner className="pointer-events-none absolute right-1 top-1 h-10 w-10 rotate-90 opacity-60" />
              <p className="elegant-eyebrow text-[0.56rem]" style={{ color: "var(--inv-accent)" }}>
                {texts.guidelines.colorsEyebrow}
              </p>
              <p
                className="mt-3 font-elegant-display text-xl"
                style={{ color: "var(--inv-text)" }}
              >
                {texts.guidelines.colorsTitle}
              </p>
              <p
                className="mt-2 text-xs leading-relaxed"
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
                      className="text-xs sm:text-sm"
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
              <BotanicalCorner className="pointer-events-none absolute bottom-1 right-1 h-10 w-10 rotate-180 opacity-60" />
              <div className="text-center">
                <p className="elegant-eyebrow text-[0.56rem]" style={{ color: "var(--inv-accent)" }}>
                  {texts.guidelines.notesEyebrow}
                </p>
                <p
                  className="mt-3 font-elegant-display text-xl"
                  style={{ color: "var(--inv-text)" }}
                >
                  {texts.guidelines.notesTitle}
                </p>
              </div>

              <ul className="mt-6 space-y-4">
                {notes.map((note) => {
                  const Icon = noteIcon(note);
                  return (
                    <li key={note} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full"
                        style={{
                          border: "1px solid var(--elegant-line)",
                          color: "var(--elegant-sage-deep)",
                          background: "rgba(139, 165, 139, 0.12)",
                        }}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span
                        className="pt-0.5 text-sm leading-relaxed"
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

        <div className="mt-8 flex items-center justify-center gap-2 text-center">
          <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--inv-accent)" }} />
          <span
            className="text-[0.58rem] uppercase tracking-[0.3em]"
            style={{ color: "var(--inv-text-muted)" }}
          >
            {texts.guidelines.closingNote}
          </span>
        </div>
      </div>
    </section>
  );
}
