import { InvitationData } from "@/content/types";
import { ximenaCahuanaXv } from "./data";

// Réplica exacta de /ximena-xv con el registro de confirmación habilitado.
export const ximenaCahuanaXvAdultos: InvitationData = {
  ...ximenaCahuanaXv,
  slug: "ximena-xv-adultos",
  rsvp: {
    ...ximenaCahuanaXv.rsvp,
    status: "open",
  },
};
