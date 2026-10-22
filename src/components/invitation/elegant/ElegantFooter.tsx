import {
  BotanicalBranch,
  BotanicalSprig,
  GoldDivider,
  Monogram,
} from "./Ornaments";

export function ElegantFooter({
  names,
  dateLabel,
  hashtag,
  monogram = "V & S",
}: {
  names: string;
  dateLabel: string;
  hashtag?: string;
  monogram?: string;
}) {
  return (
    <footer className="relative overflow-hidden px-6 pb-12 pt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(242,235,221,0) 0%, rgba(242,235,221,0.65) 38%, rgba(139,165,139,0.16) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--elegant-line-strong), transparent)",
        }}
      />

      <BotanicalBranch className="pointer-events-none absolute -bottom-24 -left-16 h-[340px] w-auto opacity-80" />
      <BotanicalBranch
        flip
        className="pointer-events-none absolute -bottom-24 -right-16 h-[340px] w-auto opacity-80"
      />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
        <Monogram text={monogram} className="h-12 w-12 text-sm" />

        <p
          className="mt-5 font-elegant-script text-3xl sm:text-4xl"
          style={{ color: "var(--inv-accent)" }}
        >
          Gracias por acompañarnos
        </p>

        <BotanicalSprig className="mt-2 h-7 w-16" />

        <p
          className="mt-3 font-elegant-script text-[2.4rem] leading-tight sm:text-5xl"
          style={{ color: "var(--inv-text)" }}
        >
          {names}
        </p>

        <GoldDivider className="mt-5" wide />

        <p
          className="mt-6 text-[0.6rem] uppercase tracking-[0.3em]"
          style={{ color: "var(--inv-text-muted)" }}
        >
          {dateLabel}
        </p>

        {hashtag && (
          <p
            className="mt-3 text-sm tracking-[0.12em]"
            style={{ color: "var(--elegant-sage-deep)" }}
          >
            {hashtag}
          </p>
        )}

        <div
          className="mt-10 flex items-center gap-2 text-[0.55rem] uppercase tracking-[0.28em]"
          style={{ color: "var(--inv-text-muted)", opacity: 0.8 }}
        >
          <span>Hecho con amor</span>
          <span
            className="h-1.5 w-1.5 rotate-45"
            style={{ backgroundColor: "var(--elegant-gold)" }}
          />
          <span>Para nuestro gran día</span>
        </div>
      </div>
    </footer>
  );
}
