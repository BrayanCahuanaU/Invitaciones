import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugs, getInvitation } from "@/content/registry";
import { getTheme } from "@/themes/registry";
import { Envelope } from "@/components/invitation/Envelope";
import { Hero } from "@/components/invitation/Hero";
import { Quote } from "@/components/invitation/Quote";
import { Countdown } from "@/components/invitation/Countdown";
import { EventDetails } from "@/components/invitation/EventDetails";
import { RSVPForm } from "@/components/invitation/RSVPForm";
import { WhatsappGroup } from "@/components/invitation/WhatsappGroup";
import { Guidelines } from "@/components/invitation/Guidelines";
import { Gifts } from "@/components/invitation/Gifts";
import { SongVoting } from "@/components/invitation/SongVoting";
import { Farewell } from "@/components/invitation/Farewell";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const data = getInvitation(params.slug);
  if (!data) return {};
  return {
    title: data.seo.title,
    description: data.seo.description,
    openGraph: data.seo.ogImage ? { images: [data.seo.ogImage] } : undefined,
  };
}

export default function InvitationPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = getInvitation(params.slug);
  if (!data) notFound();

  const theme = getTheme(data.theme);

  return (
    <div
      style={
        {
          "--inv-bg": theme.colors.background,
          "--inv-surface": theme.colors.surface,
          "--inv-text": theme.colors.text,
          "--inv-text-muted": theme.colors.textMuted,
          "--inv-accent": theme.colors.accent,
          "--inv-accent-muted": theme.colors.accentMuted,
        } as React.CSSProperties
      }
      className="min-h-screen bg-[var(--inv-bg)] text-[var(--inv-text)]"
    >
      <Envelope
        closedImage={data.envelope.closedImage}
        openVideo={data.envelope.openVideo}
        protagonists={data.hero.protagonists}
      >
        <Hero
          photo={data.hero.photo}
          protagonists={data.hero.protagonists}
          motivo={data.hero.motivo}
        />
        <Quote text={data.quote} />
        <Countdown eventDate={data.eventDate} />
        <EventDetails
          eventDate={data.eventDate}
          venueName={data.location.venueName}
          address={data.location.address}
          mapsUrl={data.location.mapsUrl}
        />
        <RSVPForm slug={data.slug} />
        <WhatsappGroup url={data.whatsappGroupUrl} />
        <Guidelines
          dressCode={data.guidelines.dressCode}
          colorsToAvoid={data.guidelines.colorsToAvoid}
          notes={data.guidelines.notes}
        />
        <Gifts
          message={data.gifts.message}
          bankAccounts={data.gifts.bankAccounts}
          suggestions={data.gifts.suggestions}
        />
        <SongVoting slug={data.slug} />
        <Farewell
          message={data.farewellMessage}
          hostName={data.host.name}
          hostRelation={data.host.relation}
          hostPhone={data.host.phone}
        />
      </Envelope>
    </div>
  );
}
