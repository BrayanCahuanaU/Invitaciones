import { InvitationData } from "@/content/types";

// ══════════════════════════════════════════════════════════════════════
// INVITACIÓN DE BODA — YENY TACO & HERNAN LUQUE
// Datos oficiales del evento.
// El diseño se controla con layout: "elegant" + theme: "guinda-ivory".
// Para publicar con otro slug, duplica esta carpeta y regístrala en
// src/content/registry.ts.
// ══════════════════════════════════════════════════════════════════════

export const bodaDemo: InvitationData = {
  slug: "yeni-y-hernan",
  eventType: "boda",
  theme: "guinda-ivory",
  layout: "elegant",

  seo: {
    title: "Yeni & Hernán — Nuestra Boda",
    description:
      "Con la bendición de nuestras familias, te invitamos a celebrar nuestra boda. 19 de diciembre de 2026 · Arequipa.",
  },

  // El layout "elegant" usa su propio sobre ilustrado, por eso estas
  // rutas quedan vacías. Si luego quieres un sobre con foto/video, se
  // pueden completar (el componente las ignora por ahora).
  envelope: {
    closedImage: "",
    openVideo: "",
  },

  hero: {
    // Opcional: si colocas una foto en public/invitaciones/yeni-y-hernan/
    // y pones la ruta aquí, aparecerá en el arco del hero.
    photo: "",
    protagonists: "Yeni Arletti Taco Mayta & Hernán Luque Zencara",
    motivo: "Nuestra Boda",
    phrase: "Queremos compartir contigo la felicidad de nuestra unión",
  },

  quote:
    "Hoy, delante de Dios y de nuestras familias, unimos nuestras vidas y comenzamos el viaje más hermoso: el de amarnos para siempre.",

  eventDate: "2026-12-19T14:30:00-05:00",

  location: {
    venueName: "Salón de eventos EL BOSQUE",
    address: "Arequipa",
    mapsUrl:
      "https://maps.google.com/?q=Salón+de+eventos+EL+BOSQUE+Arequipa",
  },

  wedding: {
    monogram: "Y & H",
    city: "Arequipa",

    // Textura de papel propia de esta invitación (tarjetas del layout elegant).
    cardBackground: "/invitaciones/yeni-y-hernan/papel-fondo.png",

    // Imagen que reemplaza el monograma en la portada (argollas de boda).
    heroEmblem: "/invitaciones/yeni-y-hernan/argollas.png",

    // Imagen que reemplaza el monograma en el footer (palomas).
    footerEmblem: "/invitaciones/yeni-y-hernan/palomas.png",

    // Imagen que reemplaza el icono de la iglesia en la tarjeta de la ceremonia.
    churchEmblem: "/invitaciones/yeni-y-hernan/iglesia.png",

    // Imagen que reemplaza el sello de cera del sobre cerrado.
    sealEmblem: "/invitaciones/yeni-y-hernan/sello.png",

    // Imagen que reemplaza el icono de la copa en la tarjeta de recepción.
    receptionEmblem: "/invitaciones/yeni-y-hernan/celebracion.png",

    // Iconos dorados del código de vestimenta: percha, taco y corbata.
    dressCodeEmblem: "/invitaciones/yeni-y-hernan/percha.png",
    dressCodeFemaleEmblem: "/invitaciones/yeni-y-hernan/taco.png",
    dressCodeMaleEmblem: "/invitaciones/yeni-y-hernan/corbata.png",

    // Sonido de la primera pantalla (sobre cerrado). Es una bendición.
    envelopeAudio: "/invitaciones/yeni-y-hernan/bendicion.mp3",

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
        discoverButton: "Confirmar asistencia",
        discoverAriaLabel: "Confirmar asistencia",
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
        namePlaceholder: "Ejm. José Carlos Rodríguez Valdez",
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
    groomParents: ["Antonia Zencara Uturunco", "Toribio Luque Vargas"],

    padrinosGroups: [
      {
        role: "Padrinos de iglesia",
        names: [
          "Herminia Vicentina Gutierrez Pineda",
          "Epifano Cahuana Huañahue",
        ],
      },
      {
        role: "Padrinos de arras",
        names: ["Milagros Giuliana Taco Mayta", "Henrry Sanchez Tapia"],
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
          time: "14:30",
          mapsUrl:
            "https://maps.google.com/?q=Parroquia+Santa+Gertrudis+Sachaca+Arequipa",
          // Foto del lugar. Crédito: Gustavo M / Wikimedia Commons (CC BY 2.0).
          photo: "/invitaciones/yeni-y-hernan/parroquia.jpg",
        },
      },
      {
        kind: "civil",
        title: "Matrimonio civil",
        venue: {
          name: "Salón de eventos EL BOSQUE",
          address: "Arequipa",
          time: "17:00",
          mapsUrl: "https://maps.app.goo.gl/NEjyf1F6aFtGe28c9",
          photo: "/invitaciones/yeni-y-hernan/salon.jpg",
          note: "En el mismo local de la recepción",
        },
      },
    ],

    reception: {
      name: "Salón de eventos EL BOSQUE",
      address: "Arequipa",
      time: "19:00",
      mapsUrl: "https://maps.app.goo.gl/NEjyf1F6aFtGe28c9",
      // Foto de la fachada (Google Street View).
      photo: "/invitaciones/yeni-y-hernan/salon.jpg",
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
      { name: "Guinda", hex: "#7A1F35" },
      { name: "Marfil", hex: "#F4EFE6" },
    ],
    notes: ["Te pedimos llegar 20 minutos antes de la ceremonia"],
    arriveIcon: "/invitaciones/yeni-y-hernan/llegar.png",
  },

  gifts: {
    message:
      "Tu presencia es nuestro mayor regalo. Si deseas tener un detalle con nosotros, te dejamos algunas opciones:",
    yape: {
      image: "/invitaciones/yeni-y-hernan/yape.jpg",
      holder: "Yeni Arletti Taco Mayta",
      note: "También puedes enviarnos tu detalle por Yape.",
      message:
        "No importa el monto, sino la intención. ¡Gracias por acompañarnos!",
    },
    suggestions: [
      "Lluvia de sobres",
      "Vajilla fina",
      "Blancos y lencería",
      "Electrodomésticos",
      "Tarjeta de regalo",
    ],
    suggestionIcons: {
      "Lluvia de sobres": "/invitaciones/yeni-y-hernan/lluvia-sobres.png",
      "Vajilla fina": "/invitaciones/yeni-y-hernan/vajilla.png",
      "Blancos y lencería": "/invitaciones/yeni-y-hernan/blancos.png",
      "Electrodomésticos": "/invitaciones/yeni-y-hernan/electrodomesticos.png",
      "Tarjeta de regalo": "/invitaciones/yeni-y-hernan/tarjeta-regalo.png",
    },
  },

  rsvp: {
    allowGuests: false,
    status: "open",
  },

  farewellMessage:
    "Gracias por acompañarnos en el día más importante de nuestras vidas. Su presencia y sus buenos deseos son el mejor regalo que podemos recibir.",

  host: {
    name: "Yeni & Hernán",
    relation: "Los novios",
  },

  timeline: [
    {
      time: "14:30",
      title: "Ceremonia religiosa",
      description: "Parroquia Santa Gertrudis, Sachaca",
    },
    {
      time: "17:00",
      title: "Matrimonio civil",
      description: "Salón de eventos EL BOSQUE",
    },
  ],

  // Fondo principal de la invitación abierta (se mantiene fijo al hacer scroll).
  backgroundVideo: {
    mobile: "/invitaciones/yeni-y-hernan/fondo.mp4",
    desktop: "/invitaciones/yeni-y-hernan/fondo.mp4",
  },

  // Música de fondo al abrir la invitación.
  backgroundMusic: {
    src: "/invitaciones/yeni-y-hernan/hijo-de-la-luna.mp3",
    title: "Hijo de la Luna",
    artist: "Mecano",
  },
};
