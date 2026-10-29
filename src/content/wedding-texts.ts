import { WeddingTexts, WeddingTextsInput } from "./types";

// Valores por defecto de la plantilla "elegant" (bodas). Sirven como base
// para cualquier invitación; cada cliente puede sobreescribirlos desde
// `wedding.texts` en su propio src/content/{slug}/data.ts.
export const DEFAULT_WEDDING_TEXTS: WeddingTexts = {
  envelope: {
    eyebrow: "Nuestra boda",
    title: "¡Nos casamos!",
    openButton: "Abrir invitación",
    footerNote: "Una invitación hecha con amor",
    openAriaLabel: "Abrir invitación de {couple}",
    soundOn: "Activar sonido",
    soundOff: "Silenciar",
  },
  hero: {
    title: "¡Nos casamos!",
    discoverButton: "Descubre la invitación",
    discoverAriaLabel: "Descubrir la invitación",
  },
  family: {
    eyebrow: "Con la bendición de",
    title: "Nuestras familias",
    subtitle:
      "Con profundo amor y gratitud, queremos compartir este día junto a quienes nos han acompañado siempre.",
    brideParentsLabel: "Padres de la novia",
    groomParentsLabel: "Padres del novio",
    padrinosEyebrow: "Gracias por apadrinar nuestro amor",
    padrinosTitle: "Nuestros padrinos",
  },
  countdown: {
    eyebrow: "Cuenta regresiva",
    title: "Falta muy poco para nuestro gran día",
    days: "Días",
    hours: "Horas",
    minutes: "Minutos",
    seconds: "Segundos",
  },
  venues: {
    eyebrow: "Ceremonia y celebración",
    title: "Dónde nos encontramos",
    subtitle:
      "Cada lugar ha sido elegido pensando en ti. Aquí encontrarás los detalles para acompañarnos.",
    civilLabel: "Matrimonio civil",
    churchLabel: "Ceremonia religiosa",
    receptionLabel: "Recepción y fiesta",
    viewMap: "Ver mapa",
    openMap: "Abrir mapa",
    closeMap: "Ocultar mapa",
    mapAriaLabel: "Mapa de {venue}",
    photoLabel: "Foto del lugar",
    closingNote: "Te esperamos para celebrar juntos",
  },
  timeline: {
    eyebrow: "Itinerario",
    title: "El gran día",
    subtitle:
      "Cada momento ha sido pensado para que disfrutes con nosotros de principio a fin.",
  },
  guidelines: {
    eyebrow: "Indicaciones",
    title: "Para tener en cuenta",
    subtitle:
      "Queremos que este día sea perfecto para todos. Aquí te compartimos algunos detalles.",
    dressCodeLabel: "Código de vestimenta",
    femaleLabel: "Ellas",
    maleLabel: "Ellos",
    colorsEyebrow: "Colores reservados",
    colorsTitle: "Evita estos tonos",
    colorsNote: "Están reservados para los novios y el cortejo.",
    notesEyebrow: "Indicaciones adicionales",
    notesTitle: "Un par de detalles",
    closingNote: "Gracias por ayudarnos a cuidar cada detalle",
  },
  gifts: {
    eyebrow: "Regalos",
    title: "Un detalle con nosotros",
    suggestionsTitle: "Sugerencias de regalo",
    envelopeTitle: "Lluvia de sobres",
    yapeTitle: "Yape",
    yapeNote: "También puedes enviarnos tu detalle por Yape.",
    yapePhoneLabel: "Número de Yape",
    yapeMessage: "No importa el monto, sino la intención.",
    viewData: "Ver datos",
    holderLabel: "Titular",
    accountLabel: "Número de cuenta",
    cciLabel: "CCI",
    copy: "Copiar",
    copied: "Copiado",
  },
  rsvp: {
    eyebrow: "Confirmación",
    titleOpen: "Confirma tu asistencia",
    titleDone: "¡Gracias por confirmar!",
    titleClosed: "Aforo completo",
    deadlineTemplate: "Antes del {date}",
    doneMessage:
      "Tu respuesta ha sido registrada. Nos hace muy felices contar contigo en este día tan especial.",
    confirmAnother: "Confirmar otra persona",
    nameLabel: "Nombre completo",
    namePlaceholder: "Escribe tu nombre",
    attendingQuestion: "¿Nos acompañarás?",
    yes: "Sí asistiré",
    no: "No podré ir",
    guestsLabel: "Acompañantes",
    guestsHint: "Incluyéndote en el total",
    guestsAddAriaLabel: "Agregar acompañante",
    guestsRemoveAriaLabel: "Quitar acompañante",
    publicLabel: "Mostrar mi confirmación en la lista de invitados",
    submit: "Confirmar asistencia",
    sending: "Enviando...",
    errorMessage: "No se pudo enviar. Intenta de nuevo.",
    whatsappCta: "También puedes confirmar por WhatsApp",
    whatsappText: "¡Hola! Quiero confirmar mi asistencia a la boda.",
    closedTitle: "Hemos alcanzado el aforo máximo",
    closedMessage: "Ya no se aceptan más confirmaciones de asistencia.",
    goingLabel: "Asistirán ({count})",
    notGoingLabel: "No podrán ir ({count})",
    emptyMessage: "Sé el primero en confirmar tu asistencia",
  },
  footer: {
    thanks: "Gracias por acompañarnos",
    madeWith: "Hecho con amor",
    forOurDay: "Para nuestro gran día",
  },
  music: {
    label: "Música de fondo",
    playAriaLabel: "Reproducir música de fondo",
    pauseAriaLabel: "Pausar música de fondo",
  },
};

export function resolveWeddingTexts(
  input?: WeddingTextsInput
): WeddingTexts {
  return {
    envelope: { ...DEFAULT_WEDDING_TEXTS.envelope, ...input?.envelope },
    hero: { ...DEFAULT_WEDDING_TEXTS.hero, ...input?.hero },
    family: { ...DEFAULT_WEDDING_TEXTS.family, ...input?.family },
    countdown: { ...DEFAULT_WEDDING_TEXTS.countdown, ...input?.countdown },
    venues: { ...DEFAULT_WEDDING_TEXTS.venues, ...input?.venues },
    timeline: { ...DEFAULT_WEDDING_TEXTS.timeline, ...input?.timeline },
    guidelines: { ...DEFAULT_WEDDING_TEXTS.guidelines, ...input?.guidelines },
    gifts: { ...DEFAULT_WEDDING_TEXTS.gifts, ...input?.gifts },
    rsvp: { ...DEFAULT_WEDDING_TEXTS.rsvp, ...input?.rsvp },
    footer: { ...DEFAULT_WEDDING_TEXTS.footer, ...input?.footer },
    music: { ...DEFAULT_WEDDING_TEXTS.music, ...input?.music },
  };
}

// Reemplaza marcadores simples, ej. fillTemplate("Hola {name}", { name: "Ana" })
export function fillTemplate(
  template: string,
  values: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match
  );
}
