import { InvitationData } from "@/content/types";

// ══════════════════════════════════════════════════════════════════════
// INVITACIÓN DE BODA — YENY TACO & HERNAN LUQUE
// Datos oficiales del evento.
// El diseño se controla con layout: "elegant" + theme: "botanical-garden".
// Para publicar con otro slug, duplica esta carpeta y regístrala en
// src/content/registry.ts.
// ══════════════════════════════════════════════════════════════════════

export const bodaDemo: InvitationData = {
  slug: "boda-demo",
  eventType: "boda",
  theme: "botanical-garden",
  layout: "elegant",

  seo: {
    title: "Yeny Taco & Hernan Luque — Nuestra Boda",
    description:
      "Con la bendición de nuestras familias, te invitamos a celebrar nuestra boda. 19 de diciembre de 2026 · Arequipa, Perú.",
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
    protagonists: "Yeny Taco & Hernan Luque",
    motivo: "Nuestra Boda",
  },

  quote:
    "Hoy, delante de Dios y de nuestras familias, unimos nuestras vidas y comenzamos el viaje más hermoso: el de amarnos para siempre.",

  eventDate: "2026-12-19T17:00:00-05:00",

  location: {
    venueName: "Salón de eventos EL BOSQUE",
    address: "Arequipa, Perú",
    mapsUrl:
      "https://maps.google.com/?q=Salón+de+eventos+EL+BOSQUE+Arequipa",
  },

  wedding: {
    monogram: "Y & H",
    city: "Arequipa, Perú",

    // Textura de papel propia de esta invitación (tarjetas del layout elegant).
    cardBackground: "/invitaciones/boda-demo/papel-fondo.png",

    // Imagen que reemplaza el monograma en la portada (argollas de boda).
    heroEmblem: "/invitaciones/boda-demo/argollas.png",

    // Imagen que reemplaza el monograma en el footer (palomas).
    footerEmblem: "/invitaciones/boda-demo/palomas.png",

    // Todos los textos de la plantilla viven aquí. Cambia libremente: el
    // diseño (src/components/invitation/elegant) no contiene copy fijo.
    texts: {
      envelope: {
        eyebrow: "Nuestra boda",
        title: "¡Nos casamos!",
        openButton: "Abrir invitación",
        footerNote: "Una invitación hecha con amor",
        openAriaLabel: "Abrir invitación de {couple}",
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
        padrinosEyebrow: "Con cariño y gratitud",
        padrinosTitle: "Padrinos y testigos",
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
    },

    brideParents: ["Asunción Mayta Quispe", "Agapito Amador Taco Quispe"],
    groomParents: ["Antonia Zencara Uturunco", "Benito Luque Vargas"],

    padrinosGroups: [
      {
        role: "Padrinos de iglesia",
        names: ["Herminia y Epifanio"],
      },
      {
        role: "Testigos de civil",
        names: ["Pilar Walberta Cutipa Luna", "Wigberto John Ccanaza Chambi"],
      },
    ],

    ceremonies: [
      {
        kind: "iglesia",
        title: "Ceremonia religiosa",
        venue: {
          name: "Parroquia Santa Gertrudis",
          address: "Av. Fernandini",
          district: "Sachaca, Arequipa",
          time: "17:00",
          mapsUrl:
            "https://maps.google.com/?q=Parroquia+Santa+Gertrudis+Sachaca+Arequipa",
        },
      },
    ],

    reception: {
      name: "Salón de eventos EL BOSQUE",
      address: "Arequipa, Perú",
      time: "19:00",
      mapsUrl:
        "https://maps.google.com/?q=Salón+de+eventos+EL+BOSQUE+Arequipa",
    },
  },

  guidelines: {
    dressCode: {
      level: "Formal",
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
    notes: ["Te pedimos llegar 20 minutos antes de la ceremonia"],
  },

  gifts: {
    message:
      "Tu presencia es nuestro mayor regalo. Si deseas tener un detalle con nosotros, te dejamos algunas opciones:",
    suggestions: [
      "Lluvia de sobres",
      "Vajilla fina",
      "Blancos y lencería",
      "Electrodomésticos",
      "Tarjeta de regalo",
    ],
  },

  rsvp: {
    allowGuests: true,
    status: "open",
  },

  farewellMessage:
    "Gracias por acompañarnos en el día más importante de nuestras vidas. Su presencia y sus buenos deseos son el mejor regalo que podemos recibir.",

  host: {
    name: "Yeny & Hernan",
    relation: "Los novios",
  },

  timeline: [
    {
      time: "17:00",
      title: "Ceremonia religiosa",
      description: "Parroquia Santa Gertrudis, Sachaca",
    },
    {
      time: "19:00",
      title: "Recepción y fiesta",
      description: "Salón de eventos EL BOSQUE",
    },
  ],

  // Fondo principal de la invitación abierta (se mantiene fijo al hacer scroll).
  backgroundVideo: {
    mobile: "/invitaciones/boda-demo/fondo.mp4",
    desktop: "/invitaciones/boda-demo/fondo.mp4",
  },

  // Para activar música de fondo, sube un mp3 a
  // public/invitaciones/boda-demo/ y descomenta:
  // backgroundMusic: {
  //   src: "/invitaciones/boda-demo/nuestra-cancion.mp3",
  //   title: "Nuestra canción",
  //   artist: "Artista",
  // },
};
