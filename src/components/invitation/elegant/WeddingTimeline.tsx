import { TimelineItem, WeddingTexts } from "@/content/types";
import { SectionHeading } from "./Ornaments";

export function WeddingTimeline({
  items,
  texts,
}: {
  items: TimelineItem[];
  texts: WeddingTexts;
}) {
  if (!items.length) return null;

  return (
    <section className="w-full px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-2xl">
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
                  className="font-elegant-display text-lg leading-none sm:text-xl"
                  style={{ color: "var(--elegant-sage-deep)" }}
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
                      : "1px solid rgba(139, 165, 139, 0.55)",
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
                  className="font-elegant-display text-lg leading-snug sm:text-xl"
                  style={{ color: "var(--inv-text)" }}
                >
                  {item.title}
                </h3>
                {item.description && (
                  <p
                    className="mt-1 text-sm leading-relaxed"
                    style={{ color: "var(--inv-text-muted)" }}
                  >
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
