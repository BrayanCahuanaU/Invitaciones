import { Heart, Phone } from "lucide-react";
import Image from "next/image";
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
    <div className="relative w-full overflow-visible">
      <Image
        src="/invitaciones/demo-quince/img/textura.jpeg"
        alt=""
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="absolute top-0 left-0 w-full -translate-y-1/2 z-20 pointer-events-none select-none">
        <Image
          src="/invitaciones/demo-quince/img/flores-div.png"
          alt=""
          width={1200}
          height={384}
          className="w-full h-auto object-contain drop-shadow-lg brightness-75"
        />
      </div>

      <Section className="relative z-10 pt-20 pb-20">
        <Heart className="w-6 h-6 text-[var(--inv-accent)] mx-auto mb-4" />
        <p className="font-display italic text-2xl md:text-3xl lg:text-4xl leading-snug">
          {message}
        </p>

        <div className="mt-10 border-t border-white/30 pt-6">
          <p className="font-display text-xl md:text-2xl">{hostName}</p>
          {hostRelation && (
            <p className="text-[var(--inv-text-muted)] text-sm">{hostRelation}</p>
          )}
          {hostPhone && (
            <a
              href={`https://wa.me/${hostPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 text-sm text-neon hover:opacity-80 transition-opacity"
            >
              <Phone className="w-4 h-4" />
              Contactar por WhatsApp
            </a>
          )}
        </div>
      </Section>
    </div>
  );
}
