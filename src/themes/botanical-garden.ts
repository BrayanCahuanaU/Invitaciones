import { Theme } from "./types";

// Tema botánico para bodas: papel crema, follaje verde salvia,
// flores en tono rubor y finos detalles en oro viejo.
export const botanicalGarden: Theme = {
  key: "botanical-garden",
  fonts: {
    display: "var(--font-elegant-display)",
    body: "var(--font-elegant-body)",
  },
  colors: {
    background: "#F8F4EB",
    surface: "#FFFDF8",
    text: "#223127",
    textMuted: "#627365",
    accent: "#5D7A64",
    accentMuted: "#B9C9B1",
  },
  palette: {
    gold: "#AF8A4F",
    goldSoft: "#D8C49B",
    sage: "#8BA58B",
    sageDeep: "#4C6855",
    blush: "#E8C6C1",
    blushDeep: "#CD9C97",
    cream: "#F2EBDD",
  },
};
