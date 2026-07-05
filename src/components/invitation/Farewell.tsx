import { Section } from "./Section";

export function Farewell({
  message,
  hostName,
  hostRelation,
  hostPhone,
}: {
  message: string;
  hostName: string;
  hostRelation?: string;
  hostPhone?: string;
}) {
  return (
    <Section className="pb-20">
      <p className="font-display italic text-2xl leading-snug">{message}</p>

      <div className="mt-10 border-t border-[var(--inv-text-muted)]/30 pt-6">
        <p className="font-display text-xl">{hostName}</p>
        {hostRelation && (
          <p className="text-[var(--inv-text-muted)] text-sm">{hostRelation}</p>
        )}
        {hostPhone && (
          <a
            href={`https://wa.me/${hostPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-sm text-[var(--inv-accent)]"
          >
            Contactar por WhatsApp
          </a>
        )}
      </div>
    </Section>
  );
}
