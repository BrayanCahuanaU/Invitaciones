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
import { MusicPlayer } from "@/components/invitation/MusicPlayer";
import { Farewell } from "@/components/invitation/Farewell";
import { RevealSection } from "@/components/invitation/RevealSection";
import { CinematicHero } from "@/components/invitation/cinematic/CinematicHero";
import { GuestArtists } from "@/components/invitation/cinematic/GuestArtists";
import { CinematicTimeline } from "@/components/invitation/cinematic/CinematicTimeline";
import { CinematicFooter } from "@/components/invitation/cinematic/CinematicFooter";

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
  const isCinematic = data.layout === "cinematic";

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
          ...(isCinematic
            ? { "--font-display": "var(--font-cinematic-display)" }
            : {}),
        } as React.CSSProperties
      }
      className={`min-h-screen text-[var(--inv-text)] ${isCinematic ? "cinematic-grain" : ""}`}
    >
      <div className="fixed inset-0 -z-20 bg-[var(--inv-bg)]" />
      {!isCinematic && (
        <>
          <div
            className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url(/invitaciones/demo-quince/img/background.png)" }}
          />
          <div className="fixed inset-0 -z-[9] bg-black/40" />
        </>
      )}
      {isCinematic && (
        <>
          {data.backgroundVideo ? (
            <>
              {data.backgroundVideo.mobile && (
                <video
                  src={data.backgroundVideo.mobile}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="fixed inset-0 -z-10 w-full h-full object-cover md:hidden"
                />
              )}
              {data.backgroundVideo.desktop && (
                <video
                  src={data.backgroundVideo.desktop}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="fixed inset-0 -z-10 w-full h-full object-cover hidden md:block"
                />
              )}
            </>
          ) : (
            <div
              className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url(/invitaciones/ximena-cahuana-xv/img/background.png)" }}
            />
          )}
          <div className="fixed inset-0 -z-[9] bg-[#090909]/90" />
        </>
      )}
      <Envelope
        closedImage={data.envelope.closedImage}
        openVideo={data.envelope.openVideo}
        closedImageTablet={data.envelope.closedImageTablet}
        openVideoTablet={data.envelope.openVideoTablet}
        closedImageDesktop={data.envelope.closedImageDesktop}
        openVideoDesktop={data.envelope.openVideoDesktop}
        protagonists={data.hero.protagonists}
      >
        <ParticleBackground count={isCinematic ? 40 : 28} />
        <div className="relative z-10">
          {isCinematic ? (
            /* ═══ CINEMATIC LAYOUT ═══ */
            <>
              <div className="relative">
                <CinematicHero
                  photo={data.hero.photo}
                  protagonists={data.hero.protagonists}
                  motivo={data.hero.motivo}
                  nameSvg="/invitaciones/ximena-cahuana-xv/img/ximena.png"
                >
                  {data.backgroundMusic && (
                    <MusicPlayer
                      src={data.backgroundMusic.src}
                      title={data.backgroundMusic.title}
                      artist={data.backgroundMusic.artist}
                    />
                  )}
                </CinematicHero>
                <div className="absolute inset-x-0 top-[42%] bottom-0 overflow-hidden pointer-events-none select-none">
                  <Image
                    src="/invitaciones/ximena-cahuana-xv/personaje.png?v=2"
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="relative z-10 -mt-39 sm:-mt-24 lg:-mt-90 w-full pointer-events-none select-none">
                <Image
                  src="/invitaciones/ximena-cahuana-xv/img/flores-div-movil.png"
                  alt=""
                  width={1200}
                  height={484}
                  className="w-full h-auto object-contain drop-shadow-lg brightness-90 md:hidden"
                />
                <Image
                  src="/invitaciones/ximena-cahuana-xv/img/flores-div-desktop.png"
                  alt=""
                  width={1200}
                  height={484}
                  className="w-full h-auto object-contain drop-shadow-lg brightness-75 hidden md:block"
                />
              </div>
              <RevealSection>
                <Quote text={data.quote} />
              </RevealSection>
              <RevealSection>
                <EventDetails
                  eventDate={data.eventDate}
                  venueName={data.location.venueName}
                  address={data.location.address}
                  mapsUrl={data.location.mapsUrl}
                />
              </RevealSection>
              {data.guestArtists && data.guestArtists.length > 0 && (
                <RevealSection>
                  <GuestArtists artists={data.guestArtists} />
                </RevealSection>
              )}
              <RevealSection>
                <Countdown
                  eventDate={data.eventDate}
                  backgroundImage="/invitaciones/ximena-cahuana-xv/img/fondo-temporizador.png"
                />
              </RevealSection>
              {data.timeline && data.timeline.length > 0 && (
                <RevealSection>
                  <CinematicTimeline items={data.timeline} />
                </RevealSection>
              )}
              <RevealSection>
                <Guidelines
                  dressCode={data.guidelines.dressCode}
                  colorsToAvoid={data.guidelines.colorsToAvoid}
                  notes={data.guidelines.notes}
                  backgroundImage="/invitaciones/ximena-cahuana-xv/img/fondo-indicaciones.png"
                  backgroundImageMobile="/invitaciones/ximena-cahuana-xv/img/fondo-indicaciones.png"
                  hideTitle
                  variant="dark"
                  manImage="/invitaciones/ximena-cahuana-xv/img/genero/hombre.png"
                  womanImage="/invitaciones/ximena-cahuana-xv/img/genero/mujer.png"
                  noteImages={{
                    time: "/invitaciones/ximena-cahuana-xv/img/consideraciones/tiempo.png",
                    default: "/invitaciones/ximena-cahuana-xv/img/consideraciones/lista.png",
                  }}
                />
              </RevealSection>
              <RevealSection>
                <RSVPForm slug={data.slug} allowGuests={data.rsvp.allowGuests ?? true} />
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
              <div className="relative z-30 w-full pointer-events-none select-none mt-8 md:mt-14 -mb-13 md:-mb-16">
                <div className="block md:hidden">
                  <Image
                    src="/invitaciones/ximena-cahuana-xv/img/divisor-footer.png"
                    alt=""
                    width={1200}
                    height={384}
                    className="w-full h-auto object-cover max-h-28"
                  />
                </div>
                <div className="hidden md:block">
                  <Image
                    src="/invitaciones/ximena-cahuana-xv/img/divisor-footer.png"
                    alt=""
                    width={1200}
                    height={384}
                    className="w-full h-auto object-contain max-h-40"
                  />
                </div>
              </div>
              <CinematicFooter
                hostName={data.host.name}
                hostRelation={data.host.relation}
                socialLinks={data.socialLinks}
                background={data.footerBackground}
                backgroundMobile={data.footerBackgroundMobile}
              />
            </>
          ) : (
            /* ═══ CLASSIC LAYOUT (sin cambios) ═══ */
            <>
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
                <RSVPForm slug={data.slug} allowGuests={data.rsvp.allowGuests ?? true} />
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
              {data.farewellMessage && (
                <RevealSection>
                  <Farewell
                    message={data.farewellMessage}
                    hostName={data.host.name}
                    hostRelation={data.host.relation}
                    hostPhone={data.host.phone}
                  />
                </RevealSection>
              )}
            </>
          )}
        </div>
      </Envelope>
    </div>
  );
}
