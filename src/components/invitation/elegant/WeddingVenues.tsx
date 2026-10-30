"use client";

import Image from "next/image";
import { Clock, GlassWater, Landmark, MapPin } from "lucide-react";
import { WeddingCeremony, WeddingVenue, WeddingTexts } from "@/content/types";
import { fillTemplate } from "@/content/wedding-texts";
import {
  BotanicalBranch,
  BotanicalCorner,
  BotanicalSprig,
  Butterfly,
  FloralCluster,
  GoldDivider,
  RoseBloom,
  SectionHeading,
} from "./Ornaments";

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
  texts,
  featured = false,
  delay = 0,
}: {
  label: string;
  venue: WeddingVenue;
  icon: React.ReactNode;
  texts: WeddingTexts;
  featured?: boolean;
  delay?: number;
}) {
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
      <BotanicalCorner className="pointer-events-none absolute right-0 top-0 h-12 w-12 rotate-90 opacity-85" />
      <BotanicalCorner className="pointer-events-none absolute bottom-0 left-0 h-12 w-12 -rotate-90 opacity-85" />
      <RoseBloom className="pointer-events-none absolute -bottom-6 -right-5 h-20 w-20 opacity-85" />
      <Butterfly className="pointer-events-none absolute left-3 top-3 h-5 w-6 -rotate-12 opacity-78" />

      <div
        className="mx-auto flex h-12 w-12 items-center justify-center rounded-full"
        style={{
          border: "1px solid var(--elegant-line-strong)",
          background: "rgba(110, 31, 51, 0.12)",
          color: "var(--elegant-sage-deep)",
        }}
      >
        {icon}
      </div>

      <BotanicalSprig className="mx-auto mt-3 h-5 w-12" />
      <p className="elegant-eyebrow mt-1 text-[0.66rem]" style={{ color: "var(--inv-accent)" }}>
        {label}
      </p>

      <h3
        className={`mt-3 font-elegant-display leading-tight ${
          featured ? "text-[1.7rem] sm:text-3xl" : "text-[1.45rem] sm:text-2xl"
        }`}
        style={{ color: "var(--inv-text)" }}
      >
        {venue.name}
      </h3>

      {venue.time && (
        <div
          className="mt-3 inline-flex items-center justify-center gap-2 self-center font-elegant-display text-[1.55rem] font-medium leading-none tabular-nums sm:text-[1.9rem]"
          style={{ color: "var(--inv-text)" }}
        >
          <Clock className="h-4 w-4" />
          {venue.time}
        </div>
      )}

      <GoldDivider className="my-5" />

      <p className="text-base leading-relaxed" style={{ color: "var(--inv-text-muted)" }}>
        {venue.address}
        {venue.district ? ` · ${venue.district}` : ""}
      </p>

      {venue.note && (
        <p
          className="mt-3 text-sm italic leading-relaxed"
          style={{ color: "var(--inv-text-muted)", opacity: 0.85 }}
        >
          {venue.note}
        </p>
      )}

      {/* Foto del lugar + vista previa del mapa, siempre visibles. */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div
          className="relative aspect-[4/3] overflow-hidden rounded-sm"
          style={{
            border: "1px solid var(--elegant-line)",
            background:
              "linear-gradient(160deg, rgba(110,31,51,0.18) 0%, rgba(255,253,248,0.9) 70%)",
          }}
        >
          {venue.photo ? (
            <Image
              src={venue.photo}
              alt={venue.name}
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2">
              <BotanicalBranch className="h-1/2 w-auto opacity-78" />
              <span
                className="elegant-eyebrow text-[0.6rem]"
                style={{ color: "var(--inv-text-muted)", opacity: 0.8 }}
              >
                {texts.venues.photoLabel}
              </span>
              <FloralCluster className="absolute -bottom-5 -right-5 h-24 w-auto opacity-65" />
            </div>
          )}
        </div>

        <div
          className="relative aspect-[4/3] overflow-hidden rounded-sm"
          style={{ border: "1px solid var(--elegant-line)" }}
        >
          <iframe
            src={embedUrlFor(venue)}
            title={fillTemplate(texts.venues.mapAriaLabel, {
              venue: venue.name,
            })}
            className="absolute inset-0 h-full w-full"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <a
          href={mapsUrlFor(venue)}
          target="_blank"
          rel="noopener noreferrer"
          className="elegant-btn-outline"
        >
          <MapPin className="h-3.5 w-3.5" />
          {texts.venues.viewMap}
        </a>
      </div>
    </div>
  );
}

function ceremonyIcon(kind: WeddingCeremony["kind"], churchEmblem?: string) {
  if (kind === "iglesia" && churchEmblem) {
    return (
      <Image
        src={churchEmblem}
        alt=""
        width={64}
        height={64}
        sizes="40px"
        className="h-9 w-9 object-contain"
      />
    );
  }
  return <Landmark className="h-5 w-5" />;
}

function receptionIcon(receptionEmblem?: string) {
  if (receptionEmblem) {
    return (
      <Image
        src={receptionEmblem}
        alt=""
        width={64}
        height={64}
        sizes="40px"
        className="h-9 w-9 object-contain"
      />
    );
  }
  return <GlassWater className="h-5 w-5" />;
}

export function WeddingVenues({
  ceremonies,
  reception,
  churchEmblem,
  receptionEmblem,
  texts,
}: {
  ceremonies?: WeddingCeremony[];
  reception?: WeddingVenue;
  churchEmblem?: string;
  receptionEmblem?: string;
  texts: WeddingTexts;
}) {
  if (!ceremonies || ceremonies.length === 0) return null;

  return (
    <section className="relative w-full overflow-hidden px-4 py-14 sm:py-20">
      <div className="relative mx-auto max-w-4xl">
        <FloralCluster className="pointer-events-none absolute -left-16 -top-10 h-44 w-auto opacity-70" />
        <FloralCluster
          flip
          className="pointer-events-none absolute -right-16 top-24 h-40 w-auto opacity-70"
        />

        <SectionHeading
          eyebrow={texts.venues.eyebrow}
          title={texts.venues.title}
          subtitle={texts.venues.subtitle}
        />

        {ceremonies && ceremonies.length > 0 && (
          <div
            className={`mt-11 grid gap-5 ${
              ceremonies.length > 1 ? "sm:grid-cols-2" : ""
            }`}
          >
            {ceremonies.map((ceremony, index) => (
              <VenueCard
                key={`${ceremony.kind}-${ceremony.venue.name}`}
                label={
                  ceremony.title ??
                  (ceremony.kind === "iglesia"
                    ? texts.venues.churchLabel
                    : texts.venues.civilLabel)
                }
                venue={ceremony.venue}
                icon={ceremonyIcon(ceremony.kind, churchEmblem)}
                texts={texts}
                delay={index * 60}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
