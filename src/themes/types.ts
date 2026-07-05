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
}
