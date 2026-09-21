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
import { GiftEnvelope } from "@/components/invitation/GiftEnvelope";
import { Guidelines } from "@/components/invitation/Guidelines";
import { Gifts } from "@/components/invitation/Gifts";
import { SongVoting } from "@/components/invitation/SongVoting";
import { MusicPlayer } from "@/components/invitation/MusicPlayer";
import { Farewell } from "@/components/invitation/Farewell";
import { RevealSection } from "@/components/invitation/RevealSection";
import { CinematicHero } from "@/components/invitation/cinematic/CinematicHero";
import { FamilySection } from "@/components/invitation/cinematic/FamilySection";
import { GuestArtists } from "@/components/invitation/cinematic/GuestArtists";
import { CinematicTimeline } from "@/components/invitation/cinematic/CinematicTimeline";
import { CinematicFooter } from "@/components/invitation/cinematic/CinematicFooter";

interface CinematicAssetPaths {
  heroNameSvg: string;
  characterImage: string;
  dividerFlowersMobile: string;
  dividerFlowersDesktop: string;
  countdownBackground: string;
  guidelinesBackground: string;
  guidelinesBackgroundMobile: string;
  guidelinesManImage: string;
  guidelinesWomanImage: string;
  guidelineNoteImages: { time: string; default: string };
  footerDivider: string;
  footerIcon?: string;
  giftEnvelopeIcon: string;
  paperBackground: string;
  countdownIcon?: string;
  locationIcon?: string;
  giftIcon?: string;
  rsvpIcon?: string;
  timelineIcon?: string;
  musicIcon?: string;
  fallbackBackground: string;
}

const DEFAULT_CINEMATIC_ASSETS: CinematicAssetPaths = {
  heroNameSvg: "/invitaciones/ximena-cahuana-xv/img/ximena.png",
  characterImage: "/invitaciones/ximena-cahuana-xv/personaje.png?v=2",
  dividerFlowersMobile: "/invitaciones/ximena-cahuana-xv/img/flores-div-movil.png",
  dividerFlowersDesktop: "/invitaciones/ximena-cahuana-xv/img/flores-div-desktop.png",
  countdownBackground: "/invitaciones/ximena-cahuana-xv/img/fondo-temporizador.png",
  guidelinesBackground: "/invitaciones/ximena-cahuana-xv/img/fondo-indicaciones.png",
  guidelinesBackgroundMobile: "/invitaciones/ximena-cahuana-xv/img/fondo-indicaciones.png",
  guidelinesManImage: "/invitaciones/ximena-cahuana-xv/img/genero/hombre.png",
  guidelinesWomanImage: "/invitaciones/ximena-cahuana-xv/img/genero/mujer.png",
  guidelineNoteImages: {
    time: "/invitaciones/ximena-cahuana-xv/img/consideraciones/tiempo.png",
    default: "/invitaciones/ximena-cahuana-xv/img/consideraciones/lista.png",
  },
  footerDivider: "/invitaciones/ximena-cahuana-xv/img/divisor-footer.png",
  giftEnvelopeIcon: "/invitaciones/ximena-cahuana-xv/img/icono-sobre-anfora.png",
  paperBackground: "/invitaciones/demo-quince/img/papel-fondo.png",
  fallbackBackground: "/invitaciones/ximena-cahuana-xv/img/background.png",
};

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

  const assets = data.cinematicAssets ?? {};
  const cinematicAssets: CinematicAssetPaths = {
    heroNameSvg: assets.heroNameSvg ?? DEFAULT_CINEMATIC_ASSETS.heroNameSvg,
    characterImage: assets.characterImage ?? DEFAULT_CINEMATIC_ASSETS.characterImage,
    dividerFlowersMobile:
      assets.dividerFlowersMobile ?? DEFAULT_CINEMATIC_ASSETS.dividerFlowersMobile,
    dividerFlowersDesktop:
      assets.dividerFlowersDesktop ?? DEFAULT_CINEMATIC_ASSETS.dividerFlowersDesktop,
    countdownBackground:
      assets.countdownBackground ?? DEFAULT_CINEMATIC_ASSETS.countdownBackground,
    guidelinesBackground:
      assets.guidelinesBackground ?? DEFAULT_CINEMATIC_ASSETS.guidelinesBackground,
    guidelinesBackgroundMobile:
      assets.guidelinesBackgroundMobile ??
      DEFAULT_CINEMATIC_ASSETS.guidelinesBackgroundMobile,
    guidelinesManImage:
      assets.guidelinesManImage ?? DEFAULT_CINEMATIC_ASSETS.guidelinesManImage,
    guidelinesWomanImage:
      assets.guidelinesWomanImage ?? DEFAULT_CINEMATIC_ASSETS.guidelinesWomanImage,
    guidelineNoteImages: {
      time: assets.guidelineNoteImages?.time ?? DEFAULT_CINEMATIC_ASSETS.guidelineNoteImages.time,
      default:
        assets.guidelineNoteImages?.default ?? DEFAULT_CINEMATIC_ASSETS.guidelineNoteImages.default,
    },
    footerDivider: assets.footerDivider ?? DEFAULT_CINEMATIC_ASSETS.footerDivider,
    footerIcon: assets.footerIcon,
    giftEnvelopeIcon: assets.giftEnvelopeIcon ?? DEFAULT_CINEMATIC_ASSETS.giftEnvelopeIcon,
    paperBackground: assets.paperBackground ?? DEFAULT_CINEMATIC_ASSETS.paperBackground,
    countdownIcon: assets.countdownIcon,
    locationIcon: assets.locationIcon,
    giftIcon: assets.giftIcon,
    rsvpIcon: assets.rsvpIcon,
    timelineIcon: assets.timelineIcon,
    fallbackBackground:
      assets.fallbackBackground ?? DEFAULT_CINEMATIC_ASSETS.fallbackBackground,
  };

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
              style={{ backgroundImage: `url(${cinematicAssets.fallbackBackground})` }}
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
                  nameSvg={cinematicAssets.heroNameSvg}
                >
                  {data.backgroundMusic && (
                    <MusicPlayer
                      src={data.backgroundMusic.src}
                      title={data.backgroundMusic.title}
                      artist={data.backgroundMusic.artist}
                      icon={cinematicAssets.musicIcon}
                    />
                  )}
                </CinematicHero>
                <div className="absolute inset-x-0 top-[42%] bottom-0 overflow-hidden pointer-events-none select-none">
                  <Image
                    src={cinematicAssets.characterImage}
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
                  src={cinematicAssets.dividerFlowersMobile}
                  alt=""
                  width={1200}
                  height={484}
                  className="w-full h-auto object-contain drop-shadow-lg brightness-90 md:hidden"
                />
                <Image
                  src={cinematicAssets.dividerFlowersDesktop}
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
                <FamilySection
                  parents={data.family?.parents}
                  godparents={data.family?.godparents}
                  backgroundImage={cinematicAssets.paperBackground}
                />
              </RevealSection>
              <RevealSection>
                <EventDetails
                  eventDate={data.eventDate}
                  venueName={data.location.venueName}
                  address={data.location.address}
                  mapsUrl={data.location.mapsUrl}
                  mapsEmbedUrl={data.location.mapsEmbedUrl}
                  venuePhoto={data.location.venuePhoto}
                  icon={cinematicAssets.locationIcon}
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
                  backgroundImage={cinematicAssets.countdownBackground}
                  icon={cinematicAssets.countdownIcon}
                />
              </RevealSection>
              {data.timeline && data.timeline.length > 0 && (
                <RevealSection>
                  <CinematicTimeline items={data.timeline} icon={cinematicAssets.timelineIcon} />
                </RevealSection>
              )}
              <RevealSection>
                <Guidelines
                  dressCode={data.guidelines.dressCode}
                  colorsToAvoid={data.guidelines.colorsToAvoid}
                  notes={data.guidelines.notes}
                  backgroundImage={cinematicAssets.guidelinesBackground}
                  backgroundImageMobile={cinematicAssets.guidelinesBackgroundMobile}
                  hideTitle
                  variant="dark"
                  manImage={cinematicAssets.guidelinesManImage}
                  womanImage={cinematicAssets.guidelinesWomanImage}
                  noteImages={{
                    time: cinematicAssets.guidelineNoteImages.time,
                    default: cinematicAssets.guidelineNoteImages.default,
                    ...(data.slug === "ximena-xv-adultos"
                      ? { children: "/invitaciones/ximena-cahuana-xv/img/consideraciones/niños.png" }
                      : {}),
                  }}
                  noteTextClass={
                    data.slug === "ximena-xv-adultos" ? "text-lg md:text-xl" : undefined
                  }
                />
              </RevealSection>
              <RevealSection>
                <RSVPForm
                  slug={data.slug}
                  allowGuests={data.rsvp.allowGuests ?? true}
                  rsvpStatus={data.rsvp.status ?? "open"}
                  icon={cinematicAssets.rsvpIcon}
                />
              </RevealSection>
              <RevealSection>
                <GiftEnvelope
                  icon={cinematicAssets.giftEnvelopeIcon}
                  message={data.gifts.envelopeMessage}
                  backgroundImage={cinematicAssets.paperBackground}
                />
              </RevealSection>
              <RevealSection>
                <Gifts
                  message={data.gifts.message}
                  bankAccounts={data.gifts.bankAccounts}
                  suggestions={data.gifts.suggestions}
                  icon={cinematicAssets.giftIcon}
                />
              </RevealSection>
              <RevealSection>
                <SongVoting slug={data.slug} icon={cinematicAssets.musicIcon} />
              </RevealSection>
              <div className="relative z-30 w-full pointer-events-none select-none mt-8 md:mt-14 -mb-13 md:-mb-16">
                <div className="block md:hidden">
                  <Image
                    src={cinematicAssets.footerDivider}
                    alt=""
                    width={1200}
                    height={384}
                    className="w-full h-auto object-cover max-h-28"
                  />
                </div>
                <div className="hidden md:block">
                  <Image
                    src={cinematicAssets.footerDivider}
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
                icon={cinematicAssets.footerIcon}
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
                <SongVoting slug={data.slug} icon={cinematicAssets.musicIcon} />
              </RevealSection>
              <RevealSection>
                <EventDetails
                  eventDate={data.eventDate}
                  venueName={data.location.venueName}
                  address={data.location.address}
                  mapsUrl={data.location.mapsUrl}
                  venuePhoto={data.location.venuePhoto}
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
                <RSVPForm
                  slug={data.slug}
                  allowGuests={data.rsvp.allowGuests ?? true}
                  rsvpStatus={data.rsvp.status ?? "open"}
                />
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
                <SongVoting slug={data.slug} icon={cinematicAssets.musicIcon} />
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
