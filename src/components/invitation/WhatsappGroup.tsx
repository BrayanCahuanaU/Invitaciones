import { Section } from "./Section";

export function WhatsappGroup({ url }: { url?: string }) {
  if (!url) return null;
  return (
    <Section>
      <p className="font-display text-2xl mb-4">Únete al grupo del evento</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-full bg-[var(--inv-accent)] text-[var(--inv-bg)] px-6 py-3 font-medium"
      >
        Entrar al grupo de WhatsApp
      </a>
    </Section>
  );
}
