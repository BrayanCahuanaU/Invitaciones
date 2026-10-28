import { InvitationData } from "@/content/types";
import type { CSSProperties } from "react";
import { resolveWeddingTexts } from "@/content/wedding-texts";
import { RevealSection } from "../RevealSection";
import { ElegantEnvelope } from "./ElegantEnvelope";
import { ElegantFooter } from "./ElegantFooter";
import { ElegantGifts } from "./ElegantGifts";
import { ElegantHero } from "./ElegantHero";
import { ElegantMusicPlayer } from "./ElegantMusicPlayer";
import { ElegantParticles } from "./ElegantParticles";
import { ElegantRSVP } from "./ElegantRSVP";
import { ElegantScrollProgress } from "./ElegantScrollProgress";
import { WeddingCountdown } from "./WeddingCountdown";
import { WeddingFamily } from "./WeddingFamily";
import { WeddingGuidelines } from "./WeddingGuidelines";
import { WeddingQuote } from "./WeddingQuote";
import { WeddingTimeline } from "./WeddingTimeline";
import { WeddingVenues } from "./WeddingVenues";

function buildMonogram(names: string) {
  const parts = names.split(/\s*&\s*/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0].trim().charAt(0)} & ${parts[1].trim().charAt(0)}`;
  }
  return names
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ElegantInvitation({ data }: { data: InvitationData }) {
  const wedding = data.wedding;
  const texts = resolveWeddingTexts(wedding?.texts);
  const eventDate = new Date(data.eventDate);

  const dateLabel = new Intl.DateTimeFormat("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Lima",
  }).format(eventDate);

  const monogram = wedding?.monogram ?? buildMonogram(data.hero.protagonists);
  const city = wedding?.city ?? data.location.district;

  // Sobre el video el texto atenuado necesita un tono más oscuro para leerse.
  const contentStyle = data.backgroundVideo
    ? ({ "--inv-text-muted": "#5f5a4e" } as CSSProperties)
    : undefined;

  const ceremonies = wedding?.ceremonies ?? [];
  const reception =
    wedding?.reception ??
    (data.location?.venueName
      ? {
          name: data.location.venueName,
          address: data.location.address,
          district: data.location.district,
          mapsUrl: data.location.mapsUrl,
          mapsEmbedUrl: data.location.mapsEmbedUrl,
        }
      : undefined);

  return (
    <ElegantEnvelope
      coupleName={data.hero.protagonists}
      dateLabel={dateLabel}
      city={city}
      monogram={monogram}
      texts={texts}
    >
      {!data.backgroundVideo && (
        <div
          aria-hidden
          className="elegant-paper-texture pointer-events-none fixed inset-0 z-0"
        />
      )}
      <ElegantParticles />
      <ElegantScrollProgress />

      <div className="relative z-10" style={contentStyle}>
        <ElegantHero
          protagonists={data.hero.protagonists}
          dateLabel={dateLabel}
          city={city}
          monogram={monogram}
          photo={data.hero.photo || undefined}
          emblem={wedding?.heroEmblem}
          texts={texts}
        />

        <RevealSection>
          <WeddingQuote text={data.quote} />
        </RevealSection>

        <RevealSection>
          <WeddingFamily
            brideParents={wedding?.brideParents ?? data.family?.parents}
            groomParents={wedding?.groomParents}
            padrinosGroups={wedding?.padrinosGroups}
            padrinos={wedding?.padrinos ?? data.family?.godparents}
            texts={texts}
          />
        </RevealSection>

        <RevealSection>
          <WeddingCountdown
            eventDate={data.eventDate}
            dateLabel={dateLabel}
            texts={texts}
          />
        </RevealSection>

        <RevealSection>
          <WeddingVenues
            ceremonies={ceremonies}
            reception={reception}
            texts={texts}
          />
        </RevealSection>

        <RevealSection>
          <WeddingTimeline items={data.timeline ?? []} texts={texts} />
        </RevealSection>

        <RevealSection>
          <WeddingGuidelines guidelines={data.guidelines} texts={texts} />
        </RevealSection>

        <RevealSection>
          <ElegantGifts
            message={data.gifts.message}
            envelopeMessage={data.gifts.envelopeMessage}
            bankAccounts={data.gifts.bankAccounts}
            suggestions={data.gifts.suggestions}
            texts={texts}
          />
        </RevealSection>

        <RevealSection>
          <ElegantRSVP
            slug={data.slug}
            allowGuests={data.rsvp.allowGuests ?? true}
            rsvpStatus={data.rsvp.status ?? "open"}
            deadline={wedding?.rsvpDeadline}
            whatsappPhone={data.rsvp.whatsappPhone}
            texts={texts}
          />
        </RevealSection>

        <ElegantFooter
          names={data.hero.protagonists}
          dateLabel={dateLabel}
          hashtag={wedding?.hashtag}
          monogram={monogram}
          emblem={wedding?.footerEmblem}
          texts={texts}
        />

        {data.backgroundMusic?.src && (
          <ElegantMusicPlayer
            src={data.backgroundMusic.src}
            title={data.backgroundMusic.title}
            texts={texts}
          />
        )}
      </div>
    </ElegantEnvelope>
  );
}
