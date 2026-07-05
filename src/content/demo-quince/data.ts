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
    closedImage: "/invitaciones/demo-quince/sobre-cerrado.jpg",
    openVideo: "/invitaciones/demo-quince/sobre-abriendo.mp4",
  },

  hero: {
    photo: "/invitaciones/demo-quince/protagonista.jpg",
    protagonists: "Emireth",
    motivo: "Mis XV Años",
  },

  quote: "No es una fiesta, es el evento del año.",

  eventDate: "2026-11-14T19:00:00-05:00",

  location: {
    venueName: "Salón de Eventos Las Rosas",
    address: "Av. Ejemplo 123, Arequipa, Perú",
    mapsUrl: "https://maps.app.goo.gl/ejemplo",
  },

  whatsappGroupUrl: "https://chat.whatsapp.com/ejemplo",

  guidelines: {
    dressCode: "Formal / Elegante",
    colorsToAvoid: ["Blanco", "Rosa palo"],
    notes: "Evento solo para adultos y jóvenes a partir de 12 años.",
  },

  gifts: {
    message: "Tu presencia es el mejor regalo, pero si deseas obsequiarme algo:",
    bankAccounts: [
      {
        bank: "BCP",
        owner: "Nombre Apellido",
        accountNumber: "000-000000000-0-00",
        cci: "00200000000000000000",
      },
    ],
    suggestions: ["Perfume", "Accesorios", "Sobre"],
  },

  rsvp: {
    whatsappPhone: "51900000000",
  },

  farewellMessage:
    "Gracias por ser parte de este día tan especial para mí. ¡Te espero!",

  host: {
    name: "Familia Ejemplo",
    relation: "Padres de la quinceañera",
    phone: "51900000000",
  },
};
