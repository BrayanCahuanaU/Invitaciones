import { InvitationData } from "@/content/types";

export const ximenaCahuanaXv: InvitationData = {
  slug: "ximena-cahuana-xv",
  eventType: "xv",
  theme: "dark-luxury-cinematic",
  layout: "cinematic",

  seo: {
    title: "XV Años de Ximena Cahuana",
    description: "Te invitamos a celebrar los XV años de Ximena Cahuana. Una noche de locura y emoción.",
  },

  envelope: {
    closedImage: "/invitaciones/ximena-cahuana-xv/sobre-cerrado.jpeg",
    openVideo: "/invitaciones/ximena-cahuana-xv/sobre-abriendo.mp4",
  },

  hero: {
    photo: "/invitaciones/ximena-cahuana-xv/protagonista.jpeg",
    protagonists: "Ximena",
    motivo: "Mis XV Años",
  },

  quote: "La vida es una celebración, y hoy lo haremos realidad.",

  eventDate: "2026-08-29T19:00:00-05:00",

  location: {
    venueName: "Salón Flor y Fiesta",
    address: "Av. Parra",
    district: "Arequipa",
    mapsUrl: "https://maps.google.com/?q=Salón+de+Recepciones+Flor+y+Fiesta+Arequipa",
  },

  guidelines: {
    dressCode: {
      level: "Elegante",
      femaleSuggestions: ["Vestido largo", "Tacos altos", "Joyas doradas"],
      maleSuggestions: ["Traje oscuro", "Camisa blanca", "Zapatos formales"],
    },
    colorsToAvoid: [
      { name: "Blanco", hex: "#FFFFFF" },
      { name: "Rojo", hex: "#FF0000" },
    ],
    notes: ["La entrada será a las 7:00 PM", "Estacionamiento disponible"],
  },

  gifts: {
    message: "Tu presencia es el mejor regalo. Si deseas obsequiarme, aquí tienes opciones:",
    bankAccounts: [
      {
        bank: "Yape",
        logo: "/invitaciones/ximena-cahuana-xv/logos/yape.png",
        owner: "Ximena Cahuana",
        accountNumber: "974777591",
      },
    ],
    suggestions: [
      "Ropa",
      "Perfumes",
      "Zapatos",
      "Accesorios",
      "Maquillaje",
    ],
  },

  rsvp: {
    whatsappPhone: "+51 974777591",
  },

  farewellMessage:
    "",

  host: {
    name: "Ximena Cahuana",
    relation: "",
    phone: "+51 974777591",
  },

  guestArtists: [
    { name: "DJ Diego Salinas", role: "DJ Principal", photo: "/invitaciones/ximena-cahuana-xv/img/dj.jpg", socialUrl: "https://www.instagram.com/djdiegosalinas/" },
    { name: "Fernando Salinas", role: "Animador", photo: "/invitaciones/ximena-cahuana-xv/img/animador.jpg", socialUrl: "https://www.instagram.com/fernandosalinas.15/" },
    { name: "Leche de Monja", role: "Anfitrión", photo: "/invitaciones/ximena-cahuana-xv/img/animador2.jpg", socialUrl: "https://www.instagram.com/lechedemonja/" },
  ],

  timeline: [
    { time: "19:00", title: "Recepción", description: "Bienvenida y mocktail de bienvenida" },
    { time: "20:00", title: "Ceremonia", description: "Inicio de la ceremonia inicial" },
    { time: "21:00", title: "Cena", description: "Presentación de los invitados" },
    { time: "22:00", title: "Fiesta", description: "Pista de baile y música en vivo" },
    { time: "00:00", title: "Cierre", description: "Cierre de la celebración" },
  ],

  backgroundVideo: {
    mobile: "/invitaciones/ximena-cahuana-xv/background-vertical.mp4",
    desktop: "/invitaciones/ximena-cahuana-xv/background-horizontal.mp4",
  },

  footerBackground: "/invitaciones/ximena-cahuana-xv/img/footer-desktop.png",
  footerBackgroundMobile: "/invitaciones/ximena-cahuana-xv/img/footer-movil.png",

  socialLinks: [
    { platform: "instagram", url: "https://instagram.com/ximena.cahuana", logo: "/invitaciones/ximena-cahuana-xv/logos/instagram.png" },
    { platform: "tiktok", url: "https://tiktok.com/@ximena.cahuana", logo: "/invitaciones/ximena-cahuana-xv/logos/tiktok.png" },
  ],
};
