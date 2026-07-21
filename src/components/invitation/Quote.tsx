import { Section } from "./Section";

export function Quote({ text }: { text: string }) {
  return (
    <Section id="quote">
      <div className="relative inline-block">
        <span className="absolute -top-6 -left-4 text-5xl text-[var(--inv-accent)]/30 font-display select-none">
          &ldquo;
        </span>
        <p className="font-display italic text-2xl md:text-3xl lg:text-4xl leading-snug text-neon px-6">
          {text}
        </p>
        <span className="absolute -bottom-4 -right-2 text-5xl text-[var(--inv-accent)]/30 font-display select-none">
          &rdquo;
        </span>
      </div>
    </Section>
  );
}
