"use client";

import { useState } from "react";
import {
  Church,
  Clock,
  GlassWater,
  Landmark,
  MapPin,
  Music2,
} from "lucide-react";
import { WeddingCeremony, WeddingVenue } from "@/content/types";
import { BotanicalCorner, BotanicalSprig, GoldDivider, SectionHeading } from "./Ornaments";

function embedUrlFor(venue: WeddingVenue) {
  if (venue.mapsEmbedUrl) return venue.mapsEmbedUrl;
  const query = encodeURIComponent(
    `${venue.name} ${venue.address} ${venue.district ?? ""}`
  );
  return `https://maps.google.com/maps?q=${query}&output=embed&z=16`;
}

function mapsUrlFor(venue: WeddingVenue) {
  if (venue.mapsUrl) return venue.mapsUrl;
  const query = encodeURIComponent(
    `${venue.name} ${venue.address} ${venue.district ?? ""}`
  );
  return `https://maps.google.com/?q=${query}`;
}

function VenueCard({
  label,
  venue,
  icon,
  featured = false,
  delay = 0,
}: {
  label: string;
  venue: WeddingVenue;
  icon: React.ReactNode;
  featured?: boolean;
  delay?: number;
}) {
  const [showMap, setShowMap] = useState(false);
  const mapId = `map-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <div
      className={`elegant-card elegant-card-hover relative flex h-full flex-col overflow-hidden rounded-sm px-6 py-8 text-center sm:px-8 ${
        featured ? "sm:py-10" : ""
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        ...(featured
          ? {
              background:
                "linear-gradient(180deg, rgba(242,235,221,0.72) 0%, rgba(255,253,248,0.96) 70%)",
            }
          : {}),
      }}
    >
      <BotanicalCorner className="pointer-events-none absolute right-0 top-0 h-12 w-12 rotate-90 opacity-70" />
      <BotanicalCorner className="pointer-events-none absolute bottom-0 left-0 h-12 w-12 -rotate-90 opacity-70" />

      <div
        className="mx-auto flex h-12 w-12 items-center justify-center rounded-full"
        style={{
          border: "1px solid var(--elegant-line-strong)",
          background: "rgba(139, 165, 139, 0.14)",
          color: "var(--elegant-sage-deep)",
        }}
      >
        {icon}
      </div>

      <BotanicalSprig className="mx-auto mt-3 h-5 w-12" />
      <p className="elegant-eyebrow mt-1 text-[0.56rem]" style={{ color: "var(--inv-accent)" }}>
        {label}
      </p>

      <h3
        className={`mt-3 font-elegant-display leading-tight ${
          featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
        }`}
        style={{ color: "var(--inv-text)" }}
      >
        {venue.name}
      </h3>

      {venue.time && (
        <div
          className="mt-3 inline-flex items-center justify-center gap-1.5 self-center text-[0.68rem] uppercase tracking-[0.22em]"
          style={{ color: "var(--inv-text-muted)" }}
        >
          <Clock className="h-3.5 w-3.5" />
          {venue.time}
        </div>
      )}

      <GoldDivider className="my-5" />

      <p className="text-sm leading-relaxed" style={{ color: "var(--inv-text-muted)" }}>
        {venue.address}
        {venue.district ? ` · ${venue.district}` : ""}
      </p>

      {venue.note && (
        <p
          className="mt-3 text-xs italic leading-relaxed"
          style={{ color: "var(--inv-text-muted)", opacity: 0.85 }}
        >
          {venue.note}
        </p>
      )}

      <div className="mt-auto flex flex-wrap items-center justify-center gap-3 pt-6">
        <a
          href={mapsUrlFor(venue)}
          target="_blank"
          rel="noopener noreferrer"
          className="elegant-btn-outline"
        >
          <MapPin className="h-3.5 w-3.5" />
          Ver mapa
        </a>
        <button
          type="button"
          onClick={() => setShowMap((open) => !open)}
          className="elegant-btn-outline"
          aria-expanded={showMap}
          aria-controls={mapId}
        >
          {showMap ? "Ocultar mapa" : "Abrir mapa"}
        </button>
      </div>

      {showMap && (
        <div
          id={mapId}
          className="mt-5 overflow-hidden rounded-sm"
          style={{ border: "1px solid var(--elegant-line)" }}
        >
          <iframe
            src={embedUrlFor(venue)}
            title={`Mapa de ${venue.name}`}
            width="100%"
            height="230"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}

function ceremonyIcon(kind: WeddingCeremony["kind"]) {
  return kind === "iglesia" ? (
    <Church className="h-5 w-5" />
  ) : (
    <Landmark className="h-5 w-5" />
  );
}

export function WeddingVenues({
  ceremonies,
  reception,
}: {
  ceremonies?: WeddingCeremony[];
  reception?: WeddingVenue;
}) {
  if ((!ceremonies || ceremonies.length === 0) && !reception) return null;

  return (
    <section className="w-full px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Ceremonia y celebración"
          title="Dónde nos encontramos"
          subtitle="Cada lugar ha sido elegido pensando en ti. Aquí encontrarás los detalles para acompañarnos."
        />

        {ceremonies && ceremonies.length > 0 && (
          <div className="mt-11 grid gap-5 sm:grid-cols-2">
            {ceremonies.map((ceremony, index) => (
              <VenueCard
                key={`${ceremony.kind}-${ceremony.venue.name}`}
                label={ceremony.title ?? (ceremony.kind === "iglesia" ? "Ceremonia religiosa" : "Matrimonio civil")}
                venue={ceremony.venue}
                icon={ceremonyIcon(ceremony.kind)}
                delay={index * 60}
              />
            ))}
          </div>
        )}

        {reception && (
          <div className="mt-6">
            <VenueCard
              label="Recepción y fiesta"
              venue={reception}
              icon={<GlassWater className="h-5 w-5" />}
              featured
            />
            <div
              className="mt-7 flex flex-col items-center justify-center gap-2 text-center text-[0.62rem] uppercase tracking-[0.3em]"
              style={{ color: "var(--inv-text-muted)" }}
            >
              <Music2 className="h-4 w-4" style={{ color: "var(--inv-accent)" }} />
              Te esperamos para celebrar juntos
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
