import { InvitationData } from "@/content/types";
import { ximenaCahuanaXv } from "./data";

// Réplica exacta de /ximena-xv con el registro de confirmación habilitado.
export const ximenaCahuanaXvAdultos: InvitationData = {
  ...ximenaCahuanaXv,
  slug: "ximena-xv-adultos",
  guidelines: {
    ...ximenaCahuanaXv.guidelines,
    notes: [
      "Amamos a los niños, sin embargo esta noche será una celebración exclusiva para adultos. ¡Agradecemos tu comprensión!",
    ],
  },
  rsvp: {
    ...ximenaCahuanaXv.rsvp,
    status: "open",
  },
};
