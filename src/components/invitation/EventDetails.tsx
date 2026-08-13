import { MapPin } from "lucide-react";
import { Section } from "./Section";

export function EventDetails({
  eventDate,
  venueName,
  address,
  district,
  mapsUrl,
}: {
  eventDate: string;
  venueName: string;
  address: string;
  district?: string;
  mapsUrl: string;
}) {
  const date = new Date(eventDate);
  const dayName = new Intl.DateTimeFormat("es-PE", {
    weekday: "long",
    timeZone: "America/Lima",
  }).format(date);
  const dayNumber = new Intl.DateTimeFormat("es-PE", {
    day: "numeric",
    timeZone: "America/Lima",
  }).format(date);
  const monthName = new Intl.DateTimeFormat("es-PE", {
    month: "long",
    timeZone: "America/Lima",
  }).format(date);
  const formattedTime = new Intl.DateTimeFormat("es-PE", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Lima",
  }).format(date);

  const mapQuery = encodeURIComponent(`${venueName} ${address} ${district ?? ""}`);
  const mapEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&output=embed&z=16`;

  return (
    <Section>
      <div className="flex items-center justify-center gap-4 mb-2">
        <p className="font-display text-2xl md:text-3xl text-white capitalize">{dayName}</p>
        <p className="font-display text-8xl md:text-9xl font-bold text-neon-gold">{dayNumber}</p>
        <p className="font-display text-2xl md:text-3xl text-white capitalize">{monthName}</p>
      </div>

      <p className="text-white mb-10 text-xl">{formattedTime}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
        {/* Columna 1 — Info */}
        <div className="bg-[var(--inv-surface)]/40 backdrop-blur-md rounded-xl p-6 border border-white/8 text-center md:text-left">
          <div className="flex flex-col items-center gap-1 mb-4">
            <MapPin className="w-8 h-8 text-[#C0C0C0]" />
            <p className="text-2xl md:text-3xl uppercase" style={{ fontFamily: "var(--font-cinematic-display)" }}>{venueName}</p>
          </div>
          <p className="text-[var(--inv-text-muted)] mb-1">{address}</p>
          {district && (
            <p className="text-[var(--inv-text-muted)] mb-4">{district}</p>
          )}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-2 rounded-full border border-[#C0C0C0] px-6 py-2 text-sm text-[#C0C0C0] hover:bg-[#C0C0C0]/10 transition-colors mx-auto md:mx-0"
          >
            <MapPin className="w-4 h-4" />
            Ver ubicación en Maps
          </a>
        </div>

        {/* Columna 2 — Mapa */}
        <div className="rounded-xl overflow-hidden border border-white/8 bg-[var(--inv-surface)]/40 backdrop-blur-md min-h-[250px]">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "250px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Mapa de ${venueName}`}
          />
        </div>
      </div>
    </Section>
  );
}
