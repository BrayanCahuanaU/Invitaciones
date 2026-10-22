import { Section } from "../Section";
import { BotanicalBranch, BotanicalSprig, GoldDivider } from "./Ornaments";

export function WeddingQuote({ text }: { text: string }) {
  return (
    <Section id="historia" className="relative overflow-hidden">
      <BotanicalBranch className="pointer-events-none absolute -left-14 top-1/2 h-64 w-auto -translate-y-1/2 opacity-50 sm:-left-8" />
      <BotanicalBranch
        flip
        className="pointer-events-none absolute -right-14 top-1/2 h-64 w-auto -translate-y-1/2 opacity-50 sm:-right-8"
      />

      <div className="relative">
        <BotanicalSprig className="mx-auto mb-2 h-7 w-16" />
        <span
          className="pointer-events-none absolute -left-1 -top-8 select-none font-elegant-display text-6xl sm:text-7xl"
          style={{ color: "var(--inv-accent)", opacity: 0.28 }}
          aria-hidden
        >
          &ldquo;
        </span>

        <p
          className="mx-auto max-w-2xl px-4 font-elegant-display text-xl italic leading-relaxed sm:text-2xl md:text-[1.7rem]"
          style={{ color: "var(--inv-text)" }}
        >
          {text}
        </p>

        <span
          className="pointer-events-none absolute -bottom-10 -right-1 select-none font-elegant-display text-6xl sm:text-7xl"
          style={{ color: "var(--inv-accent)", opacity: 0.28 }}
          aria-hidden
        >
          &rdquo;
        </span>

        <GoldDivider className="mt-8" />
      </div>
    </Section>
  );
}
