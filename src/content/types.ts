export type EventType = "xv" | "boda" | "cumpleanos" | "bautizo" | "otro";
export type LayoutType = "classic" | "cinematic";

export interface BankAccount {
  bank: string;
  logo?: string;
  owner: string;
  accountNumber: string;
  cci?: string;
}

export interface GuestArtist {
  name: string;
  role?: string;
  photo?: string;
  socialUrl?: string;
}

export interface TimelineItem {
  time: string;
  title: string;
  description?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  logo?: string;
}

export interface GuidelineNoteImages {
  children?: string;
  adults?: string;
  time?: string;
  default?: string;
}

// Rutas de media del diseño cinematic. Si se omiten se usan los
// recursos por defecto (estilo cinematic estándar) de cada invitación.
export interface CinematicAssets {
  heroNameSvg?: string; // nombre en SVG superpuesto al hero
  characterImage?: string; // overlay personaje bajo el hero
  dividerFlowersMobile?: string;
  dividerFlowersDesktop?: string;
  countdownBackground?: string;
  guidelinesBackground?: string;
  guidelinesBackgroundMobile?: string;
  guidelinesManImage?: string;
  guidelinesWomanImage?: string;
  guidelineNoteImages?: GuidelineNoteImages;
  footerDivider?: string;
  giftEnvelopeIcon?: string;
  fallbackBackground?: string; // si no hay video de fondo
}

export interface Family {
  parents?: string[];
  godparents?: string[];
}

export interface InvitationData {
  slug: string;
  eventType: EventType;
  theme: string; // clave del tema visual (ver src/themes)
  layout?: LayoutType; // "classic" (default) o "cinematic"

  seo: {
    title: string;
    description: string;
    ogImage?: string;
  };

  envelope: {
    closedImage: string; // sobre cerrado (mobile)
    openVideo: string; // video de apertura (mobile)
    closedImageTablet?: string;
    openVideoTablet?: string;
    closedImageDesktop?: string;
    openVideoDesktop?: string;
  };

  hero: {
    photo: string;
    protagonists: string; // "Emireth" o "Ana & Luis"
    motivo: string; // "Mis XV Años" / "Nuestra Boda"
  };

  quote: string;

  family?: Family;

  eventDate: string; // ISO 8601, ej "2026-11-14T19:00:00-05:00"

  location: {
    venueName: string;
    address: string;
    district?: string;
    mapsUrl: string;
    mapsEmbedUrl?: string; // URL embed para el mini-mapa (iframe); si falta se genera desde los datos
  };

  whatsappGroupUrl?: string;
  whatsappGroupName?: string;
  whatsappGroupPhoto?: string;
  whatsappGroupDescription?: string;

  guidelines: {
    dressCode?: {
      level: string;
      maleSuggestions?: string[];
      femaleSuggestions?: string[];
    };
    colorsToAvoid?: {
      name: string;
      hex: string;
    }[];
    notes?: string[];
  };

  gifts: {
    message?: string;
    envelopeMessage?: string; // texto del sobre de regalo (layout cinematic)
    bankAccounts?: BankAccount[];
    suggestions?: string[];
  };

  rsvp: {
    // Si se define, además de guardar en la lista interna, se ofrece
    // un botón directo a WhatsApp con mensaje prellenado.
    whatsappPhone?: string;
    // Si es false, no se permite agregar acompañantes en el RSVP.
    allowGuests?: boolean;
    // Estado de la confirmación. "open" (default) permite registrarse;
    // "full"/"closed" ocultan el formulario y muestran "aforo lleno",
    // pero la lista pública de confirmados sigue visible.
    status?: "open" | "full" | "closed";
  };

  farewellMessage?: string;

  host: {
    name: string;
    relation?: string;
    phone?: string;
  };

  // ── Solo para layout "cinematic" ──
  guestArtists?: GuestArtist[];
  timeline?: TimelineItem[];
  socialLinks?: SocialLink[];
  footerBackground?: string; // imagen de fondo para el footer (desktop)
  footerBackgroundMobile?: string; // imagen de fondo para el footer (mobile)

  // ── Background ──
  backgroundVideo?: {
    mobile?: string;   // video vertical para móvil
    desktop?: string;  // video horizontal para desktop
  };

  // ── Media del diseño cinematic ──
  cinematicAssets?: CinematicAssets;

  // ── Música de fondo ──
  backgroundMusic?: {
    src: string;   // ruta del mp3 en public
    title?: string;
    artist?: string;
  };
}
