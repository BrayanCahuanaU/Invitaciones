import { InvitationData } from "@/content/types";

export const ximenaCahuanaXv: InvitationData = {
  slug: "ximena-xv",
  eventType: "xv",
  theme: "dark-luxury-cinematic",
  layout: "cinematic",

  seo: {
    title: "XV Años de Ximena Cahuana",
    description: "Te invitamos a celebrar los XV años de Ximena Cahuana. Una noche de locura y emoción.",
  },

  envelope: {
    closedImage: "/invitaciones/ximena-cahuana-xv/sobre-cerrado.jpeg",
    openVideo: "",
  },

  hero: {
    photo: "/invitaciones/ximena-cahuana-xv/protagonista.jpeg",
    protagonists: "Ximena",
    motivo: "Mis XV Años",
  },

  quote: "La vida es una celebración y Con gusto la haremos realidad. Con la alegría de ver cumplido un sueño, mis padres y yo tenemos el honor de invitarte a la celebración de mis XV años",

  eventDate: "2026-08-29T18:00:00-05:00",

  location: {
    venueName: "Salón Flor y Fiesta",
    address: "Av. Parra",
    district: "Arequipa",
    mapsUrl: "https://maps.google.com/?q=Salón+de+Recepciones+Flor+y+Fiesta+Arequipa",
  },

  whatsappGroupUrl: "https://chat.whatsapp.com/FqHkxmHQRvu0tF6n33jyZz?s=sw&p=a&ilr=0",
  whatsappGroupName: "",
  whatsappGroupPhoto: "",
  whatsappGroupDescription: "",

  guidelines: {
    dressCode: {
      level: "Elegante",
      femaleSuggestions: ["Completamente libre"],
      maleSuggestions: ["Traje oscuro", "Camisa blanca", "Zapatos formales"],
    },
    colorsToAvoid: [
      { name: "Plateado", hex: "#C0C0C0" },
      { name: "Negro", hex: "#000000" },
    ],
    notes: ["Llegar puntual para la entrada", "Se asistira solo con la invitación confirmada"],
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
    allowGuests: false,
    status: "full",
  },

  farewellMessage:
    "",

  host: {
    name: "Ximena",
    relation: "La patrona",
    phone: "+51 974777591",
  },

  guestArtists: [
    { name: "DJ Diego Salinas", role: "DJ Principal", photo: "/invitaciones/ximena-cahuana-xv/img/dj.jpg", socialUrl: "https://www.instagram.com/djdiegosalinas/" },
    { name: "Fernando Salinas", role: "Animador", photo: "/invitaciones/ximena-cahuana-xv/img/animador.jpg", socialUrl: "https://www.instagram.com/fernandosalinas.15/" },
  ],

  timeline: [
    { time: "18:00", title: "Recepción", description: "Bienvenida y mocktail de bienvenida" },
    { time: "20:00", title: "Ceremonia", description: "Inicio de la ceremonia inicial" },
    { time: "22:00", title: "Fiesta", description: "Pista de baile y música en vivo" },
    { time: "00:00", title: "Hora Loca", description: "Empieza la hora loca" },
    { time: "02:00", title: "Cierre", description: "Cierre de la celebración" },
  ],

  backgroundVideo: {
    mobile: "/invitaciones/ximena-cahuana-xv/background-vertical.mp4",
    desktop: "/invitaciones/ximena-cahuana-xv/background-horizontal.mp4",
  },

  backgroundMusic: {
    src: "/invitaciones/ximena-cahuana-xv/Cochinear.mp3",
    title: "Cochinear",
    artist: "Dj Rafy Mercenario",
  },

  footerBackground: "/invitaciones/ximena-cahuana-xv/img/footer-desktop.png",
  footerBackgroundMobile: "/invitaciones/ximena-cahuana-xv/img/footer-movil.png",

  socialLinks: [
    { platform: "instagram", url: "https://www.instagram.com/xmena.w", logo: "/invitaciones/ximena-cahuana-xv/logos/instagram.png" },
    { platform: "tiktok", url: "https://www.tiktok.com/@xmena.wv", logo: "/invitaciones/ximena-cahuana-xv/logos/tiktok.png" },
  ],
};
