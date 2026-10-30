import Image from "next/image";
import { WeddingTexts } from "@/content/types";
import {
  BotanicalBranch,
  BotanicalSprig,
  Butterfly,
  FloralCluster,
  GoldDivider,
  Monogram,
} from "./Ornaments";

export function ElegantFooter({
  names,
  dateLabel,
  hashtag,
  monogram,
  emblem,
  texts,
}: {
  names: string;
  dateLabel: string;
  hashtag?: string;
  monogram: string;
  emblem?: string;
  texts: WeddingTexts;
}) {
  const [brideName, ...groomRest] = names.split(/\s*&\s*/);
  const groomName = groomRest.length ? groomRest.join(" & ") : undefined;

  return (
    <footer className="relative overflow-hidden px-6 pb-12 pt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(74,20,36,0) 0%, rgba(74,20,36,0.55) 38%, rgba(34,8,16,0.82) 100%)",
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

      <BotanicalBranch className="pointer-events-none absolute -bottom-24 -left-16 h-[340px] w-auto opacity-90" />
      <BotanicalBranch
        flip
        className="pointer-events-none absolute -bottom-24 -right-16 h-[340px] w-auto opacity-90"
      />

      <FloralCluster className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-auto opacity-85 sm:-left-2 sm:h-64" />
      <FloralCluster
        flip
        className="pointer-events-none absolute -bottom-16 -right-10 h-56 w-auto opacity-85 sm:-right-2 sm:h-64"
      />

      <Butterfly className="pointer-events-none absolute left-[16%] top-12 h-6 w-7 -rotate-12 opacity-85 sm:left-[22%]" />
      <Butterfly
        flip
        className="pointer-events-none absolute right-[16%] top-24 h-5 w-6 rotate-12 opacity-78 sm:right-[22%]"
      />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
        {emblem ? (
          <Image
            src={emblem}
            alt=""
            width={192}
            height={192}
            sizes="96px"
            className="h-20 w-20 object-contain sm:h-24 sm:w-24"
            style={{ mixBlendMode: "multiply" }}
          />
        ) : (
          <Monogram text={monogram} className="h-12 w-12 text-sm" />
        )}

        <p
          className="mt-5 font-elegant-script text-[2rem] sm:text-4xl"
          style={{ color: "var(--inv-accent)" }}
        >
          {texts.footer.thanks}
        </p>

        <BotanicalSprig className="mt-2 h-7 w-16" />

        <p
          className="mt-3 font-elegant-script text-[1.95rem] leading-[1.05] sm:text-[2.9rem]"
          style={{ color: "var(--inv-text)" }}
        >
          {brideName}
          {groomName && (
            <>
              <span
                className="my-1 block font-elegant-body text-base leading-none sm:text-lg"
                style={{ color: "var(--inv-accent)" }}
              >
                &
              </span>
              {groomName}
            </>
          )}
        </p>

        <GoldDivider className="mt-5" wide />

        <p
          className="mt-6 text-[1.02rem] font-semibold uppercase tracking-[0.16em] sm:text-[1.15rem]"
          style={{ color: "var(--inv-text)" }}
        >
          {dateLabel}
        </p>

        {hashtag && (
          <p
            className="mt-3 text-base tracking-[0.1em]"
            style={{ color: "var(--elegant-sage-deep)" }}
          >
            {hashtag}
          </p>
        )}

        <div
          className="mt-10 flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em]"
          style={{ color: "var(--inv-text-muted)", opacity: 0.8 }}
        >
          <span>{texts.footer.madeWith}</span>
          <span
            className="h-1.5 w-1.5 rotate-45"
            style={{ backgroundColor: "var(--elegant-gold)" }}
          />
          <span>{texts.footer.forOurDay}</span>
        </div>
      </div>
    </footer>
  );
}
