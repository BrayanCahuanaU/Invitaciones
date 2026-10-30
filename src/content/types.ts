export type EventType = "xv" | "boda" | "cumpleanos" | "bautizo" | "otro";
export type LayoutType = "classic" | "cinematic" | "elegant";

export interface BankAccount {
  bank: string;
  logo?: string;
  owner: string;
  accountNumber: string;
  cci?: string;
}

// Opción de pago por Yape (imagen del logo + datos opcionales).
export interface YapeAccount {
  image: string;
  holder?: string;
  phone?: string;
  note?: string;
  message?: string;
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
  footerIcon?: string; // icono del footer (tiara, corazón, etc.)
  giftEnvelopeIcon?: string;
  paperBackground?: string; // fondo de papel para secciones como madres/padres y sobre de regalo
  countdownIcon?: string; // icono del temporizador
  locationIcon?: string; // icono de ubicación
  giftIcon?: string; // icono de regalos
  rsvpIcon?: string; // icono de "Confirma tu asistencia"
  timelineIcon?: string; // icono de "Programa del evento"
  musicIcon?: string; // icono del reproductor de música
  fallbackBackground?: string; // si no hay video de fondo
}

export interface Family {
  parents?: string[];
  godparents?: string[];
}

// ── Solo para layout "elegant" (bodas) ──

export interface WeddingVenue {
  name: string;
  address: string;
  district?: string;
  time?: string; // "17:30"
  mapsUrl?: string;
  mapsEmbedUrl?: string;
  photo?: string; // foto del lugar (ruta en public)
  note?: string;
}

export interface WeddingCeremony {
  kind: "civil" | "iglesia";
  title?: string;
  venue: WeddingVenue;
}

export interface PadrinosGroup {
  role: string; // "Padrinos de anillos"
  names: string[];
}

// ── Textos de la plantilla "elegant" ──
// Todo el copy que no es un dato del evento (títulos de sección, botones,
// etiquetas del formulario, etc.) vive aquí. Cada invitación puede
// sobreescribir solo lo que necesite; el resto usa los valores por defecto
// de src/content/wedding-texts.ts.
export interface WeddingTexts {
  envelope: {
    eyebrow: string;
    title: string;
    openButton: string;
    footerNote: string;
    openAriaLabel: string; // admite {couple}
    soundOn: string; // texto del botón cuando el sonido está apagado
    soundOff: string; // texto del botón cuando el sonido está encendido
  };
  hero: {
    title: string;
    discoverButton: string;
    discoverAriaLabel: string;
  };
  family: {
    eyebrow: string;
    title: string;
    subtitle: string;
    brideParentsLabel: string;
    groomParentsLabel: string;
    padrinosEyebrow: string;
    padrinosTitle: string;
  };
  countdown: {
    eyebrow: string;
    title: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  venues: {
    eyebrow: string;
    title: string;
    subtitle: string;
    civilLabel: string;
    churchLabel: string;
    receptionLabel: string;
    viewMap: string;
    openMap: string;
    closeMap: string;
    mapAriaLabel: string;
    photoLabel: string; // admite {venue}
    closingNote: string;
  };
  timeline: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  guidelines: {
    eyebrow: string;
    title: string;
    subtitle: string;
    dressCodeLabel: string;
    femaleLabel: string;
    maleLabel: string;
    colorsEyebrow: string;
    colorsTitle: string;
    colorsNote: string;
    notesEyebrow: string;
    notesTitle: string;
    closingNote: string;
  };
  gifts: {
    eyebrow: string;
    title: string;
    suggestionsTitle: string;
    envelopeTitle: string;
    yapeTitle: string;
    yapeNote: string;
    yapePhoneLabel: string;
    yapeMessage: string;
    viewData: string;
    holderLabel: string;
    accountLabel: string;
    cciLabel: string;
    copy: string;
    copied: string;
  };
  rsvp: {
    eyebrow: string;
    titleOpen: string;
    titleDone: string;
    titleClosed: string;
    deadlineTemplate: string; // admite {date}
    doneMessage: string;
    confirmAnother: string;
    nameLabel: string;
    namePlaceholder: string;
    attendingQuestion: string;
    yes: string;
    no: string;
    guestsLabel: string;
    guestsHint: string;
    guestsAddAriaLabel: string;
    guestsRemoveAriaLabel: string;
    publicLabel: string;
    submit: string;
    sending: string;
    errorMessage: string;
    whatsappCta: string;
    whatsappText: string;
    closedTitle: string;
    closedMessage: string;
    goingLabel: string; // admite {count}
    notGoingLabel: string; // admite {count}
    emptyMessage: string;
  };
  footer: {
    thanks: string;
    madeWith: string;
    forOurDay: string;
  };
  music: {
    label: string;
    playAriaLabel: string;
    pauseAriaLabel: string;
  };
}

export type WeddingTextsInput = {
  [K in keyof WeddingTexts]?: Partial<WeddingTexts[K]>;
};

export interface WeddingDetails {
  texts?: WeddingTextsInput; // sobreescribe los textos de la plantilla
  cardBackground?: string; // textura de papel para las tarjetas (ruta en public)
  heroEmblem?: string; // imagen que reemplaza el monograma de la portada
  footerEmblem?: string; // imagen que reemplaza el monograma del footer (argollas, etc.)
  churchEmblem?: string; // imagen que reemplaza el icono de la iglesia en las sedes
  sealEmblem?: string; // imagen que reemplaza el sello de cera del sobre cerrado
  receptionEmblem?: string; // imagen que reemplaza el icono de la recepción
  dressCodeEmblem?: string; // imagen que reemplaza el icono del código de vestimenta
  dressCodeFemaleEmblem?: string; // imagen sobre la lista "Ellas"
  dressCodeMaleEmblem?: string; // imagen sobre la lista "Ellos"
  envelopeAudio?: string; // sonido de la pantalla del sobre cerrado
  monogram?: string; // "V & S" — si no se define se calcula con los nombres
  hashtag?: string; // "#ValentinaYSebastian"
  city?: string; // "Arequipa, Perú"
  brideParents?: string[];
  groomParents?: string[];
  // Padrinos en una sola lista (se muestra sin cargos)…
  padrinos?: string[];
  // …o agrupados por cargo (recomendado).
  padrinosGroups?: PadrinosGroup[];
  ceremonies?: WeddingCeremony[];
  reception?: WeddingVenue;
  rsvpDeadline?: string; // "1 de noviembre de 2026"
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
    phrase?: string; // frase opcional bajo los nombres
  };

  quote: string;

  family?: Family;

  // ── Solo para layout "elegant" (bodas) ──
  wedding?: WeddingDetails;

  eventDate: string; // ISO 8601, ej "2026-11-14T19:00:00-05:00"

  location: {
    venueName: string;
    address: string;
    district?: string;
    mapsUrl: string;
    mapsEmbedUrl?: string; // URL embed para el mini-mapa (iframe); si falta se genera desde los datos
    venuePhoto?: string; // foto de la fachada / vista exterior del local
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
    arriveIcon?: string;
  };

  gifts: {
    message?: string;
    envelopeMessage?: string; // texto del sobre de regalo (layout cinematic)
    bankAccounts?: BankAccount[];
    yape?: YapeAccount;
    suggestions?: string[];
    suggestionIcons?: Record<string, string>;
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
