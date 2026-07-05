import { Section } from "./Section";

export function Quote({ text }: { text: string }) {
  return (
    <Section>
      <p className="font-display italic text-2xl leading-snug text-[var(--inv-accent)]">
        “{text}”
      </p>
    </Section>
  );
}
