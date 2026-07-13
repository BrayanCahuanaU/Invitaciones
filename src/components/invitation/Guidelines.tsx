import { Shirt, User, Palette, AlertTriangle, Info, Ban } from "lucide-react";
import { Section } from "./Section";

export function Guidelines({
  dressCode,
  colorsToAvoid,
  notes,
}: {
  dressCode?: {
    level: string;
    maleSuggestions?: string[];
    femaleSuggestions?: string[];
  };
  colorsToAvoid?: {
    name: string;
    hex: string;
  }[];
  notes?: string[];
}) {
  if (!dressCode && !colorsToAvoid?.length && !notes?.length) return null;

  return (
    <Section>
      <div className="flex items-center justify-center gap-2 mb-6">
        <Shirt className="w-5 h-5 text-[var(--inv-accent)]" />
        <p className="font-display text-3xl md:text-4xl">Indicaciones</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {/* Columna 1 — Vestimenta */}
        {dressCode && (
          <div className="rounded-xl border border-[var(--inv-accent)]/15 bg-[var(--inv-surface)]/50 backdrop-blur-sm p-5 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Shirt className="w-4 h-4 text-[var(--inv-accent)]" />
              <p className="font-display text-lg">Vestimenta</p>
            </div>
            <span className="inline-block rounded-full bg-[var(--inv-accent)]/15 border border-[var(--inv-accent)]/30 px-3 py-1 text-xs font-medium text-[var(--inv-accent)] mb-4">
              {dressCode.level}
            </span>

            {dressCode.maleSuggestions && dressCode.maleSuggestions.length > 0 && (
              <div className="mb-3">
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <User className="w-3.5 h-3.5 text-[var(--inv-accent-muted)]" />
                  <p className="text-[var(--inv-text-muted)] text-xs uppercase tracking-wider">Varón</p>
                </div>
                <ul className="space-y-1">
                  {dressCode.maleSuggestions.map((s, i) => (
                    <li key={i} className="text-sm text-[var(--inv-text)]">{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {dressCode.femaleSuggestions && dressCode.femaleSuggestions.length > 0 && (
              <div>
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <User className="w-3.5 h-3.5 text-[var(--inv-accent-muted)]" />
                  <p className="text-[var(--inv-text-muted)] text-xs uppercase tracking-wider">Mujer</p>
                </div>
                <ul className="space-y-1">
                  {dressCode.femaleSuggestions.map((s, i) => (
                    <li key={i} className="text-sm text-[var(--inv-text)]">{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Columna 2 — Colores reservados */}
        {colorsToAvoid && colorsToAvoid.length > 0 && (
          <div className="rounded-xl border border-[var(--inv-accent)]/15 bg-[var(--inv-surface)]/50 backdrop-blur-sm p-5 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Palette className="w-4 h-4 text-[var(--inv-accent)]" />
              <p className="font-display text-lg">Colores Reservados</p>
            </div>
            <p className="text-[var(--inv-text-muted)] text-xs mb-4">
              Evita usar estos colores
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {colorsToAvoid.map((c) => (
                <div key={c.name} className="flex flex-col items-center gap-1.5">
                  <div
                    className="w-12 h-12 rounded-full border-2 border-[var(--inv-text-muted)]/30 shadow-inner"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-xs text-[var(--inv-text-muted)]">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Columna 3 — Consideraciones */}
        {notes && notes.length > 0 && (
          <div className="rounded-xl border border-[var(--inv-accent)]/15 bg-[var(--inv-surface)]/50 backdrop-blur-sm p-5 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-[var(--inv-accent)]" />
              <p className="font-display text-lg">Consideraciones</p>
            </div>
            <ul className="space-y-2.5 text-left">
              {notes.map((note, i) => (
                <li key={i} className="flex items-start gap-2">
                  {note.toLowerCase().includes("prohibi") || note.toLowerCase().includes("no se") ? (
                    <Ban className="w-4 h-4 text-[var(--inv-accent-muted)] mt-0.5 flex-shrink-0" />
                  ) : (
                    <Info className="w-4 h-4 text-[var(--inv-accent-muted)] mt-0.5 flex-shrink-0" />
                  )}
                  <span className="text-sm text-[var(--inv-text)]">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Section>
  );
}
