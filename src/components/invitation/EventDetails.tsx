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
  }).format(date);
  const dayNumber = new Intl.DateTimeFormat("es-PE", {
    day: "numeric",
  }).format(date);
  const monthName = new Intl.DateTimeFormat("es-PE", {
    month: "long",
  }).format(date);
  const formattedTime = new Intl.DateTimeFormat("es-PE", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);

  const mapQuery = encodeURIComponent(`${venueName} ${address} ${district ?? ""}`);
  const mapEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&output=embed&z=16`;

  return (
    <Section>
      <div className="flex items-center justify-center gap-4 mb-2">
        <p className="font-display text-2xl md:text-3xl text-[var(--inv-text-muted)] capitalize">{dayName}</p>
        <p className="font-display text-8xl md:text-9xl font-bold text-neon">{dayNumber}</p>
        <p className="font-display text-2xl md:text-3xl text-[var(--inv-text-muted)] capitalize">{monthName}</p>
      </div>

      <p className="text-[var(--inv-text-muted)] mb-10 text-xl ">{formattedTime}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
        {/* Columna 1 — Info */}
        <div className="bg-[var(--inv-surface)]/50 rounded-xl p-6 backdrop-blur-sm border border-[var(--inv-accent)]/10">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-[var(--inv-accent)]" />
            <p className="font-display text-xl md:text-2xl">{venueName}</p>
          </div>
          <p className="text-[var(--inv-text-muted)] mb-1">{address}</p>
          {district && (
            <p className="text-[var(--inv-text-muted)] mb-4">{district}</p>
          )}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-2 rounded-full border border-[var(--inv-accent)] px-6 py-2 text-sm hover:bg-[var(--inv-accent)]/10 transition-colors"
          >
            <MapPin className="w-4 h-4" />
            Ver ubicación en Maps
          </a>
        </div>

        {/* Columna 2 — Mapa */}
        <div className="rounded-xl overflow-hidden border border-[var(--inv-accent)]/10 bg-[var(--inv-surface)]/50 min-h-[250px]">
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
