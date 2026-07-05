import { InvitationData } from "./types";
import { demoQuince } from "./demo-quince/data";

// Cada cliente nuevo = una carpeta en src/content/{slug}/data.ts
// + una línea aquí. No se tocan rutas ni componentes.
export const invitations: Record<string, InvitationData> = {
  "demo-quince": demoQuince,
};

export function getAllSlugs(): string[] {
  return Object.keys(invitations);
}

export function getInvitation(slug: string): InvitationData | undefined {
  return invitations[slug];
}
