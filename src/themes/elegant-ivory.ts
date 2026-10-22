import { Theme } from "./types";

// Tema claro para bodas: marfil, papel y detalles en oro antiguo.
export const elegantIvory: Theme = {
  key: "elegant-ivory",
  fonts: {
    display: "var(--font-elegant-display)",
    body: "var(--font-elegant-body)",
  },
  colors: {
    background: "#F7F3EC",
    surface: "#FFFDF9",
    text: "#332D26",
    textMuted: "#8A7F72",
    accent: "#A8834F",
    accentMuted: "#D9C7AC",
  },
};
