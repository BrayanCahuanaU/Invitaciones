import { InvitationData } from "@/content/types";

// Temática del evento: "Noche Estrellada".
// Los recursos de media (fotos, videos, música) son los mismos que usa
// el diseño de referencia (ximena-cahuana-xv) como placeholder.
// Para personalizar: reemplaza los archivos dentro de
// public/invitaciones/luciana-sofia-xv/ (mismos nombres) o cambia las rutas aquí.
export const lucianaSofiaXv: InvitationData = {
  slug: "luciana-xv",
  eventType: "xv",
  theme: "dark-luxury-cinematic",
  layout: "cinematic",

  seo: {
    title: "XV Años de Luciana Sofía Lazo Valdivia",
    description:
      "Te invitamos a celebrar los XV años de Luciana Sofía. Una noche estrellada llena de elegancia y alegría.",
  },

  envelope: {
    closedImage: "/invitaciones/luciana-sofia-xv/sobre-cerrado.jpeg",
    openVideo: "",
  },

  hero: {
    photo: "/invitaciones/luciana-sofia-xv/protagonista.jpeg",
    protagonists: "Luciana Sofía",
    motivo: "Mis XV Años",
  },

  quote:
    "La vida es una celebración y Con gusto la haremos realidad. Con la alegría de ver cumplido un sueño, mis padres y yo tenemos el honor de invitarte a la celebración de mis XV años",

  family: {
    parents: ["Renzo Paul Lazo Vilca", "Patricia Valdivia Valeriano"],
    godparents: ["Verónica Pineda Valeriano", "Angel Charca Ccaccasaca"],
  },

  eventDate: "2026-11-06T19:00:00-05:00",

  location: {
    venueName: "Santorini",
    address:
      "Del parque Umachiri, tres cuadras más arriba, frente al colegio Manuel Veramendi",
    district: "Mariano Melgar, Arequipa",
    mapsUrl: "https://maps.app.goo.gl/JYQehaHoa4uh3eVN9",
    mapsEmbedUrl: "https://maps.google.com/maps?q=-16.3997053,-71.499686&z=17&output=embed",
    venuePhoto: "/invitaciones/luciana-sofia-xv/img/local-fachada.jpg",
  },

  guidelines: {
    dressCode: {
      level: "Formal",
      maleSuggestions: ["Traje formal oscuro", "Camisa blanca", "Zapatos formales"],
      femaleSuggestions: [
        "Vestido largo formal",
        "Tacos formales",
        "Accesorios elegantes",
      ],
    },
    colorsToAvoid: [
      { name: "Azul acero", hex: "#4682B4" },
      { name: "Plateado", hex: "#C0C0C0" },
    ],
    notes: ["Llegar puntual para la entrada", "Se asistirá solo con la invitación confirmada"],
  },

  gifts: {
    message:
      "Tu presencia es el mejor regalo. Si deseas obsequiarme, aquí tienes opciones:",
    envelopeMessage:
      "Tu presencia es el mejor regalo. Si deseas tener un detalle con la quinceañera, en la siguiente sección encontrarás sugerencias para obsequiarle algo especial.",
    bankAccounts: [
      {
        bank: "Yape",
        logo: "/invitaciones/luciana-sofia-xv/logos/yape.png",
        owner: "Luciana Sofia Lazo Valdivia",
        accountNumber: "914091151",
      },
    ],
    suggestions: [
      "Maquillaje",
      "Accesorios",
      "Carteras",
      "Artículos de cuidado personal",
      "Chocolates",
    ],
  },

  rsvp: {
    whatsappPhone: "+51 914091151",
    allowGuests: false,
    status: "open",
  },

  farewellMessage: "",

  host: {
    name: "Luciana Sofía",
    relation: "La quinceañera",
    phone: "+51 914091151",
  },

  timeline: [
    { time: "19:00", title: "Recepción", description: "Bienvenida y coctel de bienvenida" },
    { time: "20:00", title: "Ceremonia", description: "Inicio de la ceremonia" },
    { time: "21:00", title: "Fiesta", description: "Pista de baile y música" },
    { time: "23:00", title: "Hora Loca", description: "Empieza la hora loca" },
    { time: "02:00", title: "Cierre", description: "Cierre de la celebración" },
  ],

  backgroundVideo: {
    mobile: "/invitaciones/luciana-sofia-xv/background-vertical.mp4",
    desktop: "/invitaciones/luciana-sofia-xv/background-horizontal.mp4",
  },

  backgroundMusic: {
    src: "/invitaciones/luciana-sofia-xv/I%20Gotta%20Feeling.mp3",
    title: "I Gotta Feeling",
    artist: "The Black Eyed Peas",
  },

  footerBackground: "/invitaciones/luciana-sofia-xv/img/footer-desktop.png",
  footerBackgroundMobile: "/invitaciones/luciana-sofia-xv/img/footer-movil.png",

  cinematicAssets: {
    // El nombre de la quinceañera se renderiza como imagen (colocada en
    // public/invitaciones/luciana-sofia-xv/img/luciana-nombre.png).
    heroNameSvg: "/invitaciones/luciana-sofia-xv/img/luciana-nombre.png",
    characterImage: "/invitaciones/luciana-sofia-xv/personaje.png",
    dividerFlowersMobile: "/invitaciones/luciana-sofia-xv/img/flores-div-movil.png",
    dividerFlowersDesktop: "/invitaciones/luciana-sofia-xv/img/flores-div-desktop.png",
    countdownBackground: "/invitaciones/luciana-sofia-xv/img/fondo-temporizador.png",
    guidelinesBackground: "/invitaciones/luciana-sofia-xv/img/fondo-indicaciones.png",
    guidelinesBackgroundMobile: "/invitaciones/luciana-sofia-xv/img/fondo-indicaciones.png",
    guidelinesManImage: "/invitaciones/luciana-sofia-xv/img/genero/hombre.png",
    guidelinesWomanImage: "/invitaciones/luciana-sofia-xv/img/genero/mujer.png",
    guidelineNoteImages: {
      time: "/invitaciones/luciana-sofia-xv/img/consideraciones/tiempo.png",
      default: "/invitaciones/luciana-sofia-xv/img/consideraciones/lista.png",
    },
    footerDivider: "/invitaciones/luciana-sofia-xv/img/divisor-footer.png",
    giftEnvelopeIcon: "/invitaciones/luciana-sofia-xv/img/icono-sobre-anfora.png",
    fallbackBackground: "/invitaciones/luciana-sofia-xv/img/fondo-indicaciones.png",
  },
};