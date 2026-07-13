export type EventType = "xv" | "boda" | "cumpleanos" | "bautizo" | "otro";

export interface BankAccount {
  bank: string;
  logo?: string;
  owner: string;
  accountNumber: string;
  cci?: string;
}

export interface InvitationData {
  slug: string;
  eventType: EventType;
  theme: string; // clave del tema visual (ver src/themes)

  seo: {
    title: string;
    description: string;
    ogImage?: string;
  };

  envelope: {
    closedImage: string; // sobre cerrado (mobile)
    openVideo: string; // video de apertura (mobile)
    closedImageTablet?: string;
    openVideoTablet?: string;
    closedImageDesktop?: string;
    openVideoDesktop?: string;
  };

  hero: {
    photo: string;
    protagonists: string; // "Emireth" o "Ana & Luis"
    motivo: string; // "Mis XV Años" / "Nuestra Boda"
  };

  quote: string;

  eventDate: string; // ISO 8601, ej "2026-11-14T19:00:00-05:00"

  location: {
    venueName: string;
    address: string;
    district?: string;
    mapsUrl: string;
  };

  whatsappGroupUrl?: string;
  whatsappGroupName?: string;
  whatsappGroupPhoto?: string;
  whatsappGroupDescription?: string;

  guidelines: {
    dressCode?: {
      level: string;
      maleSuggestions?: string[];
      femaleSuggestions?: string[];
    };
    colorsToAvoid?: {
      name: string;
      hex: string;
    }[];
    notes?: string[];
  };

  gifts: {
    message?: string;
    bankAccounts?: BankAccount[];
    suggestions?: string[];
  };

  rsvp: {
    // Si se define, además de guardar en la lista interna, se ofrece
    // un botón directo a WhatsApp con mensaje prellenado.
    whatsappPhone?: string;
  };

  farewellMessage: string;

  host: {
    name: string;
    relation?: string;
    phone?: string;
  };
}
