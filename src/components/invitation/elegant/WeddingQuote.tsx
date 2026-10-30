import { Section } from "../Section";
import {
  BotanicalBranch,
  BotanicalSprig,
  Butterfly,
  FloralCluster,
  GoldDivider,
} from "./Ornaments";

export function WeddingQuote({ text }: { text: string }) {
  return (
    <Section id="historia" className="relative overflow-hidden">
      <BotanicalBranch className="pointer-events-none absolute -left-14 top-1/2 h-64 w-auto -translate-y-1/2 opacity-70 sm:-left-8" />
      <BotanicalBranch
        flip
        className="pointer-events-none absolute -right-14 top-1/2 h-64 w-auto -translate-y-1/2 opacity-70 sm:-right-8"
      />

      <FloralCluster className="pointer-events-none absolute left-0 top-0 h-32 w-auto opacity-70" />
      <FloralCluster
        flip
        className="pointer-events-none absolute bottom-0 right-0 h-32 w-auto opacity-70"
      />
      <Butterfly className="pointer-events-none absolute right-[10%] top-0 h-6 w-7 rotate-12 opacity-85" />

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
          className="mx-auto max-w-2xl px-4 font-elegant-display text-[1.5rem] italic leading-relaxed sm:text-[1.55rem] md:text-[1.75rem]"
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
