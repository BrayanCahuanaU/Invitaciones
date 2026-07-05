import { Section } from "./Section";

export function EventDetails({
  eventDate,
  venueName,
  address,
  mapsUrl,
}: {
  eventDate: string;
  venueName: string;
  address: string;
  mapsUrl: string;
}) {
  const date = new Date(eventDate);
  const formattedDate = new Intl.DateTimeFormat("es-PE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  const formattedTime = new Intl.DateTimeFormat("es-PE", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);

  return (
    <Section>
      <p className="font-display text-3xl capitalize">{formattedDate}</p>
      <p className="text-[var(--inv-text-muted)] mt-1">{formattedTime} hrs</p>

      <div className="mt-8">
        <p className="font-display text-xl">{venueName}</p>
        <p className="text-[var(--inv-text-muted)] mt-1">{address}</p>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 rounded-full border border-[var(--inv-accent)] px-6 py-2 text-sm"
        >
          Ver ubicación en Maps
        </a>
      </div>
    </Section>
  );
}
