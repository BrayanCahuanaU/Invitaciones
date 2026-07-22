import { InvitationData } from "@/content/types";

export const ximenaCahuanaXv: InvitationData = {
  slug: "ximena-cahuana-xv",
  eventType: "xv",
  theme: "dark-luxury-cinematic",
  layout: "cinematic",

  seo: {
    title: "XV Años de Ximena Cahuana",
    description: "Te invitamos a celebrar los XV años de Ximena Cahuana. Una noche de lujo y emoción.",
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

  quote: "La vida es una celebración, y hoy celebramos tu luz.",

  eventDate: "2026-08-29T19:00:00-05:00",

  location: {
    venueName: "Salón de Recepciones Flor y Fiesta",
    address: "Av. Principal s/n",
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
    message: "Tu presencia es el mejor regalo. Si deseas obsequiarnos, aquí tienes opciones:",
    bankAccounts: [
      {
        bank: "BCP",
        logo: "/invitaciones/ximena-cahuana-xv/logos/bcp.webp",
        owner: "Cahuana",
        accountNumber: "123-456-789",
        cci: "002-123-45678901-12-34",
      },
    ],
  },

  rsvp: {
    whatsappPhone: "+51999999999",
  },

  farewellMessage:
    "Gracias por ser parte de este momento tan especial. Tu presencia hará esta noche inolvidable.",

  host: {
    name: "Familia Cahuana",
    relation: "Padres de Ximena",
    phone: "+51999999999",
  },

  guestArtists: [
    { name: "DJ Shadow", role: "DJ Principal", photo: "/invitaciones/ximena-cahuana-xv/img/dj.jpg" },
    { name: "Banda Resonancia", role: "Música en vivo", photo: "/invitaciones/ximena-cahuana-xv/img/animador.jpg" },
    { name: "MC Fire", role: "Anfitrión", photo: "/invitaciones/ximena-cahuana-xv/img/animador2.jpg" },
  ],

  timeline: [
    { time: "19:00", title: "Recepción", description: "Bienvenida y coctel de bienvenida" },
    { time: "20:00", title: "Ceremonia", description: "Inicio de la celebración oficial" },
    { time: "21:00", title: "Cena", description: "Cena de gala y brindis" },
    { time: "22:00", title: "Fiesta", description: "Pista de baile y música en vivo" },
    { time: "00:00", title: "Cierre", description: "Cierre de la celebración" },
  ],

  socialLinks: [
    { platform: "instagram", url: "https://instagram.com/ximena.cahuana" },
    { platform: "tiktok", url: "https://tiktok.com/@ximena.cahuana" },
  ],
};
