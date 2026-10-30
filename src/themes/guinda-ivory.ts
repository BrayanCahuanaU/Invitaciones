import { Theme } from "./types";

// Tema guinda y marfil para bodas: fondo vino profundo, tarjetas en papel
// marfil y detalles en guinda con finos acentos dorados.
export const guindaIvory: Theme = {
  key: "guinda-ivory",
  fonts: {
    display: "var(--font-elegant-display)",
    body: "var(--font-elegant-body)",
  },
  colors: {
    background: "#4A1424",
    surface: "#FFF9F1",
    text: "#F7EDE2",
    textMuted: "#E3CBCB",
    accent: "#EFD3B8",
    accentMuted: "#C98A96",
  },
  palette: {
    gold: "#C9A46A",
    goldSoft: "#E4D0AA",
    sage: "#A85566",
    sageDeep: "#6E1F33",
    blush: "#E7C7C9",
    blushDeep: "#B9737E",
    cream: "#F7F0E6",
  },
};
