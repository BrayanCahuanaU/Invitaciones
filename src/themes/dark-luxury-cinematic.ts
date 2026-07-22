import { Theme } from "./types";

export const darkLuxuryCinematic: Theme = {
  key: "dark-luxury-cinematic",
  fonts: {
    display: "var(--font-cinematic-display)",
    body: "var(--font-cinematic-body)",
  },
  colors: {
    background: "#090909",
    surface: "#171717",
    text: "#F2F2F2",
    textMuted: "#A8A8A8",
    accent: "#A81835",
    accentMuted: "#7B0F24",
  },
  extended: {
    backgroundSecondary: "#171717",
    cards: "#252525",
    wineRed: "#7B0F24",
    intenseRed: "#A81835",
    burgundy: "#4E0B18",
    gold: "#D8A718",
    brightGold: "#F1C232",
    border: "#4A4A4A",
  },
};
