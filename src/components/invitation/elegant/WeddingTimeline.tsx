import { TimelineItem, WeddingTexts } from "@/content/types";
import { Butterfly, FloralCluster, RoseBloom, SectionHeading } from "./Ornaments";

export function WeddingTimeline({
  items,
  texts,
}: {
  items: TimelineItem[];
  texts: WeddingTexts;
}) {
  if (!items.length) return null;

  return (
    <section className="relative w-full overflow-hidden px-4 py-14 sm:py-20">
      <FloralCluster className="pointer-events-none absolute -left-14 top-6 h-44 w-auto opacity-70" />
      <FloralCluster
        flip
        className="pointer-events-none absolute -right-14 bottom-10 h-44 w-auto opacity-70"
      />
      <Butterfly className="pointer-events-none absolute right-[12%] top-16 h-5 w-6 rotate-12 opacity-78" />

      <div className="relative mx-auto max-w-2xl">
        <SectionHeading
          eyebrow={texts.timeline.eyebrow}
          title={texts.timeline.title}
          subtitle={texts.timeline.subtitle}
        />

        <div className="mt-12">
          {items.map((item, index) => (
            <div
              key={`${item.time}-${item.title}`}
              className="grid grid-cols-[4.2rem_1fr] gap-3 sm:grid-cols-[6.5rem_1fr] sm:gap-5"
            >
              <div className="pt-0.5 text-right">
                <span
                  className="font-elegant-display text-[1.6rem] font-medium leading-none tabular-nums sm:text-[2rem]"
                  style={{ color: "var(--inv-text)" }}
                >
                  {item.time}
                </span>
              </div>

              <div
                className="relative pb-8 pl-6 sm:pl-8"
                style={{
                  borderLeft:
                    index === items.length - 1
                      ? "1px solid transparent"
                      : "1px solid rgba(110, 31, 51, 0.45)",
                }}
              >
                <span
                  className="absolute left-0 top-1.5 h-2.5 w-2.5 -translate-x-1/2 rotate-45 rounded-[1px]"
                  style={{
                    backgroundColor: "var(--elegant-blush)",
                    border: "1px solid var(--elegant-gold)",
                    boxShadow: "0 0 0 3px rgba(248,244,235,0.95)",
                  }}
                  aria-hidden
                />
                <h3
                  className="font-elegant-display text-xl leading-snug sm:text-2xl"
                  style={{ color: "var(--inv-text)" }}
                >
                  {item.title}
                </h3>
                {item.description && (
                  <p
                    className="mt-1 text-base leading-relaxed"
                    style={{ color: "var(--inv-text-muted)" }}
                  >
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <RoseBloom
          tone="cream"
          className="pointer-events-none mx-auto mt-2 h-10 w-10 opacity-78"
        />
      </div>
    </section>
  );
}
