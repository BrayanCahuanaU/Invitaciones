import { Theme } from "./types";
import { pinkGala } from "./pink-gala";
import { darkLuxuryCinematic } from "./dark-luxury-cinematic";

// Para agregar un tema nuevo: crear el archivo (ej. azul-clasico.ts)
// exportando un Theme, e importarlo/agregarlo aquí.
export const themes: Record<string, Theme> = {
  "pink-gala": pinkGala,
  "dark-luxury-cinematic": darkLuxuryCinematic,
};

export function getTheme(key: string): Theme {
  return themes[key] ?? pinkGala;
}
