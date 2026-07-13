import { Heart, Phone } from "lucide-react";
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
      <Heart className="w-6 h-6 text-[var(--inv-accent)] mx-auto mb-4" />
      <p className="font-display italic text-2xl md:text-3xl lg:text-4xl leading-snug">
        {message}
      </p>

      <div className="mt-10 border-t border-[var(--inv-text-muted)]/30 pt-6">
        <p className="font-display text-xl md:text-2xl">{hostName}</p>
        {hostRelation && (
          <p className="text-[var(--inv-text-muted)] text-sm">{hostRelation}</p>
        )}
        {hostPhone && (
          <a
            href={`https://wa.me/${hostPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 text-sm text-[var(--inv-accent)] hover:opacity-80 transition-opacity"
          >
            <Phone className="w-4 h-4" />
            Contactar por WhatsApp
          </a>
        )}
      </div>
    </Section>
  );
}
