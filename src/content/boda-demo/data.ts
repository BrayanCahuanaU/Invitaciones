import { InvitationData } from "@/content/types";

// ══════════════════════════════════════════════════════════════════════
// INVITACIÓN DE BODA — DATOS DE PRUEBA
// Reemplaza los textos marcados como "ficticio" con la información real.
// El diseño se controla con layout: "elegant" + theme: "botanical-garden".
// Para una boda real se recomienda duplicar esta carpeta con el slug
// definitivo y registrarlo en src/content/registry.ts.
// ══════════════════════════════════════════════════════════════════════

export const bodaDemo: InvitationData = {
  slug: "boda-demo",
  eventType: "boda",
  theme: "botanical-garden",
  layout: "elegant",

  seo: {
    title: "Valentina & Sebastián — Nuestra Boda",
    description:
      "Con la bendición de nuestras familias, te invitamos a celebrar nuestra boda. 14 de noviembre de 2026 · Arequipa, Perú.",
  },

  // El layout "elegant" usa su propio sobre ilustrado, por eso estas
  // rutas quedan vacías. Si luego quieres un sobre con foto/video, se
  // pueden completar (el componente las ignora por ahora).
  envelope: {
    closedImage: "",
    openVideo: "",
  },

  hero: {
    // Opcional: si colocas una foto en public/invitaciones/boda-demo/
    // y pones la ruta aquí, aparecerá en el arco del hero.
    photo: "",
    protagonists: "Valentina & Sebastián",
    motivo: "Nuestra Boda",
  },

  quote:
    "Hoy, delante de Dios y de nuestras familias, unimos nuestras vidas y comenzamos el viaje más hermoso: el de amarnos para siempre.",

  eventDate: "2026-11-14T16:00:00-05:00",

  location: {
    venueName: "Hacienda Los Nogales",
    address: "Carretera a Sachaca Km. 4.5, s/n",
    district: "Sachaca, Arequipa",
    mapsUrl:
      "https://maps.google.com/?q=Hacienda+Los+Nogales+Sachaca+Arequipa",
  },

  wedding: {
    monogram: "V & S",
    hashtag: "#ValentinaYSebastian",
    city: "Arequipa, Perú",

    brideParents: ["Roberto Álvarez Mendoza", "Claudia Ríos de Álvarez"],
    groomParents: ["Fernando Salazar Paredes", "Lucía Torres de Salazar"],

    padrinosGroups: [
      {
        role: "Padrinos de honor",
        names: ["Jorge y Mariana Villalobos"],
      },
      {
        role: "Padrinos de anillos",
        names: ["Diego y Camila Herrera"],
      },
      {
        role: "Padrinos de velación",
        names: ["Ricardo y Ana Beltrán"],
      },
    ],

    ceremonies: [
      {
        kind: "civil",
        title: "Matrimonio civil",
        venue: {
          name: "Municipalidad Provincial de Arequipa",
          address: "Calle Palacio Viejo 306",
          district: "Cercado, Arequipa",
          time: "16:00",
          mapsUrl:
            "https://maps.google.com/?q=Municipalidad+Provincial+de+Arequipa",
          note: "Ingreso por la puerta principal, salón de actos.",
        },
      },
      {
        kind: "iglesia",
        title: "Ceremonia religiosa",
        venue: {
          name: "Iglesia San Juan Bautista",
          address: "Calle Cuesta del Ángel 100",
          district: "Yanahuara, Arequipa",
          time: "17:30",
          mapsUrl:
            "https://maps.google.com/?q=Iglesia+San+Juan+Bautista+Yanahuara+Arequipa",
          note: "Te pedimos llegar 20 minutos antes para acomodarte.",
        },
      },
    ],

    reception: {
      name: "Hacienda Los Nogales",
      address: "Carretera a Sachaca Km. 4.5, s/n",
      district: "Sachaca, Arequipa",
      time: "19:30",
      mapsUrl:
        "https://maps.google.com/?q=Hacienda+Los+Nogales+Sachaca+Arequipa",
      note: "Cena de gala, brindis y baile hasta la madrugada.",
    },

    rsvpDeadline: "1 de noviembre de 2026",
  },

  guidelines: {
    dressCode: {
      level: "Formal / Etiqueta rigurosa",
      maleSuggestions: [
        "Traje formal en tonos oscuros",
        "Camisa blanca o marfil",
        "Corbata o moño",
        "Zapatos de vestir",
      ],
      femaleSuggestions: [
        "Vestido largo o midi",
        "Tonos suaves, joya o pastel",
        "Tacones o sandalias elegantes",
        "Accesorios discretos",
      ],
    },
    colorsToAvoid: [
      { name: "Blanco", hex: "#FFFFFF" },
      { name: "Marfil", hex: "#F4EFE6" },
      { name: "Dorado", hex: "#C9A227" },
    ],
    notes: [
      "Ceremonia y recepción solo para adultos",
      "Te pedimos llegar 20 minutos antes de cada ceremonia",
      "Habrá estacionamiento privado en la hacienda",
      "No se permite el ingreso de mascotas",
    ],
  },

  gifts: {
    message:
      "Tu presencia es nuestro mayor regalo. Si deseas tener un detalle con nosotros, te dejamos algunas opciones:",
    envelopeMessage:
      "En tu mesa encontrarás un sobre para la lluvia de sobres. Cada muestra de cariño nos ayudará a comenzar esta nueva etapa.",
    bankAccounts: [
      {
        bank: "Yape",
        owner: "Valentina Álvarez Ríos",
        accountNumber: "987 654 321",
      },
      {
        bank: "BCP",
        owner: "Sebastián Salazar Torres",
        accountNumber: "193-0000000-0-00",
        cci: "00219300000000000000",
      },
      {
        bank: "Interbank",
        owner: "Valentina Álvarez Ríos",
        accountNumber: "898-3000000000",
        cci: "00389830000000000000",
      },
    ],
    suggestions: [
      "Lluvia de sobres",
      "Vajilla fina",
      "Blancos y lencería",
      "Electrodomésticos",
      "Tarjeta de regalo",
    ],
  },

  rsvp: {
    whatsappPhone: "51987654321",
    allowGuests: true,
    status: "open",
  },

  farewellMessage:
    "Gracias por acompañarnos en el día más importante de nuestras vidas. Su presencia y sus buenos deseos son el mejor regalo que podemos recibir.",

  host: {
    name: "Valentina & Sebastián",
    relation: "Los novios",
    phone: "51987654321",
  },

  timeline: [
    {
      time: "16:00",
      title: "Matrimonio civil",
      description: "Municipalidad Provincial de Arequipa",
    },
    {
      time: "17:30",
      title: "Ceremonia religiosa",
      description: "Iglesia San Juan Bautista, Yanahuara",
    },
    {
      time: "19:30",
      title: "Recepción y cóctel",
      description: "Hacienda Los Nogales, Sachaca",
    },
    {
      time: "20:30",
      title: "Cena de gala",
      description: "Menú de tres tiempos y brindis de honor",
    },
    {
      time: "22:00",
      title: "Primer baile",
      description: "Apertura de la pista de baile",
    },
    {
      time: "23:00",
      title: "Fiesta y sorpresas",
      description: "Música en vivo, barra libre y hora loca",
    },
    {
      time: "02:00",
      title: "Fin de la celebración",
      description: "Gracias por acompañarnos",
    },
  ],

  // Para activar música de fondo, sube un mp3 a
  // public/invitaciones/boda-demo/ y descomenta:
  // backgroundMusic: {
  //   src: "/invitaciones/boda-demo/nuestra-cancion.mp3",
  //   title: "Nuestra canción",
  //   artist: "Artista",
  // },
};
