import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { getAllSlugs, getInvitation } from "@/content/registry";
import { getTheme } from "@/themes/registry";
import { Envelope } from "@/components/invitation/Envelope";
import { ParticleBackground } from "@/components/invitation/ParticleBackground";
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
import { RevealSection } from "@/components/invitation/RevealSection";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

type PageParams = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getInvitation(slug);
  if (!data) return {};
  return {
    title: data.seo.title,
    description: data.seo.description,
    openGraph: data.seo.ogImage ? { images: [data.seo.ogImage] } : undefined,
  };
}

export default async function InvitationPage({
  params,
}: {
  params: PageParams;
}) {
  const { slug } = await params;
  const data = getInvitation(slug);
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
        closedImageTablet={data.envelope.closedImageTablet}
        openVideoTablet={data.envelope.openVideoTablet}
        closedImageDesktop={data.envelope.closedImageDesktop}
        openVideoDesktop={data.envelope.openVideoDesktop}
        protagonists={data.hero.protagonists}
      >
        <ParticleBackground count={28} />
        <div className="relative z-10">
          <Hero
            photo={data.hero.photo}
            protagonists={data.hero.protagonists}
            motivo={data.hero.motivo}
          />
          <div className="relative z-10 -mt-20 sm:-mt-24 lg:-mt-90 w-full pointer-events-none select-none">
            <Image
              src="/invitaciones/demo-quince/img/flores-div.png"
              alt=""
              width={1200}
              height={484}
              className="w-full h-auto object-contain drop-shadow-lg brightness-75"
            />
          </div>
          <RevealSection>
            <Quote text={data.quote} />
          </RevealSection>
          <RevealSection>
            <Countdown eventDate={data.eventDate} />
          </RevealSection>
          <RevealSection>
            <EventDetails
              eventDate={data.eventDate}
              venueName={data.location.venueName}
              address={data.location.address}
              mapsUrl={data.location.mapsUrl}
            />
          </RevealSection>
          <RevealSection>
            <Guidelines
              dressCode={data.guidelines.dressCode}
              colorsToAvoid={data.guidelines.colorsToAvoid}
              notes={data.guidelines.notes}
            />
          </RevealSection>
          <RevealSection>
            <RSVPForm slug={data.slug} />
          </RevealSection>
          <RevealSection>
            <WhatsappGroup
              url={data.whatsappGroupUrl}
              fallbackName={data.whatsappGroupName}
              fallbackPhoto={data.whatsappGroupPhoto}
              fallbackDescription={data.whatsappGroupDescription}
            />
          </RevealSection>
          <RevealSection>
            <Gifts
              message={data.gifts.message}
              bankAccounts={data.gifts.bankAccounts}
              suggestions={data.gifts.suggestions}
            />
          </RevealSection>
          <RevealSection>
            <SongVoting slug={data.slug} />
          </RevealSection>
          <RevealSection>
            <Farewell
              message={data.farewellMessage}
              hostName={data.host.name}
              hostRelation={data.host.relation}
              hostPhone={data.host.phone}
            />
          </RevealSection>
        </div>
      </Envelope>
    </div>
  );
}
