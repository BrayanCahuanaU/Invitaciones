import { InvitationData } from "../types";

export const demoQuince: InvitationData = {
  slug: "demo-quince",
  eventType: "xv",
  theme: "pink-gala",

  seo: {
    title: "Emireth — Mis XV Años",
    description: "Acompáñame a celebrar mis XV años",
  },

  envelope: {
    closedImage: "/invitaciones/demo-quince/sobre-cerrado.jpeg",
    openVideo: "/invitaciones/demo-quince/sobre-abriendo.mp4",
    closedImageTablet: undefined,
    openVideoTablet: undefined,
    closedImageDesktop: undefined,
    openVideoDesktop: undefined,
  },

  hero: {
    photo: "/invitaciones/demo-quince/protagonista.jpeg",
    protagonists: "Emireth",
    motivo: "Mis XV Años",
  },

  quote: "No es una fiesta, es el evento del año.",

  eventDate: "2026-11-14T19:00:00-05:00",

  location: {
    venueName: "Salón de Eventos Las Rosas",
    address: "Av. Ejemplo 123",
    district: "Arequipa, Perú",
    mapsUrl: "https://maps.app.goo.gl/ejemplo",
  },

  whatsappGroupUrl: "https://chat.whatsapp.com/I3yMTuhfUfE9MGbt08SFk7",
  whatsappGroupName: "",
  whatsappGroupPhoto: "",
  whatsappGroupDescription: "",

  guidelines: {
    dressCode: {
      level: "Formal / Elegante",
      maleSuggestions: [
        "Traje oscuro de preferencia",
        "Camisa blanca o de color claro",
        "Corbata o moño",
        "Zapatos formales",
      ],
      femaleSuggestions: [
        "Vestido largo o midi",
        "Tacones o zapatos elegantes",
        "Bolso pequeño o clutch",
        "Accesorios discretos",
      ],
    },
    colorsToAvoid: [
      { name: "Blanco", hex: "#FFFFFF" },
      { name: "Rosa palo", hex: "#F4C2C2" },
    ],
    notes: [
      "Evento solo para adultos y jóvenes a partir de 12 años",
      "No se permite el ingreso de niños",
      "Se recomienda llegar 15 minutos antes del inicio",
    ],
  },

  gifts: {
    message: "Tu presencia es el mejor regalo, pero si deseas obsequiarme algo:",
    bankAccounts: [
      {
        bank: "BCP",
        logo: "/invitaciones/demo-quince/logos/bcp.webp",
        owner: "Nombre Apellido",
        accountNumber: "000-000000000-0-00",
        cci: "00200000000000000000",
      },
      {
        bank: "Yape",
        logo: "/invitaciones/demo-quince/logos/yape.png",
        owner: "Nombre Apellido",
        accountNumber: "999 888 777",
      },
      {
        bank: "Interbank",
        logo: "/invitaciones/demo-quince/logos/interbank.jpg",
        owner: "Nombre Apellido",
        accountNumber: "000-000000-000",
        cci: "0030000000000000000",
      },
      {
        bank: "Caja Arequipa",
        logo: "/invitaciones/demo-quince/logos/cajaarequipa.png",
        owner: "Nombre Apellido",
        accountNumber: "00000000000",
        cci: "0040000000000000000",
      },
    ],
    suggestions: ["Perfume", "Accesorios", "Sobre"],
  },

  rsvp: {
    whatsappPhone: "51997767502",
  },

  farewellMessage:
    "Gracias por ser parte de este día tan especial para mí. ¡Te espero!",

  host: {
    name: "Familia Rodriguez",
    relation: "Padres de la quinceañera",
    phone: "51900000000",
  },
};
