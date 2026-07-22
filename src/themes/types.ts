export interface Theme {
  key: string;
  fonts: {
    display: string; // clase de variable CSS, ej "var(--font-display)"
    body: string;
  };
  colors: {
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    accent: string;
    accentMuted: string;
  };
  extended?: {
    backgroundSecondary: string;
    cards: string;
    wineRed: string;
    intenseRed: string;
    burgundy: string;
    gold: string;
    brightGold: string;
    border: string;
  };
}
