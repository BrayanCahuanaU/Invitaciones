import { Shirt, Palette, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { Section } from "./Section";

function getNoteIcon(note: string): string {
  const lower = note.toLowerCase();
  if (lower.includes("niños") || lower.includes("niños")) return "/invitaciones/demo-quince/img/prohibido-niños.png";
  if (lower.includes("adultos") || lower.includes("años")) return "/invitaciones/demo-quince/img/mayores18.png";
  if (lower.includes("minutos") || lower.includes("antes")) return "/invitaciones/demo-quince/img/tiempo.png";
  return "/invitaciones/demo-quince/img/tiempo.png";
}

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
    <Section backgroundImage="/invitaciones/demo-quince/img/papel-fondo-vertical.png" fullWidth>
      <div className="flex items-center justify-center gap-2 mb-8">
        <p className="font-display text-gray-800 text-3xl md:text-5xl">Indicaciones</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
        {/* Columna 1 — Vestimenta */}
        {dressCode && (
          <div className="text-center">
            <div className="flex flex-col items-center gap-2 mb-3">
              <Shirt className="w-10 h-10 text-amber-700" />
              <p className="font-display text-gray-800 text-3xl">Vestimenta</p>
            </div>

            {dressCode.maleSuggestions && dressCode.maleSuggestions.length > 0 && dressCode.femaleSuggestions && dressCode.femaleSuggestions.length > 0 ? (
              <div className="flex flex-col md:flex-row md:gap-8 mt-6">
                <div className="flex-1">
                  <div className="flex flex-col items-center mb-3">
                    <Image src="/invitaciones/demo-quince/img/men.png" alt="Varón" width={120} height={120} className="object-contain w-28 h-28 md:w-32 md:h-32" />
                  </div>
                  <ul className="space-y-1">
                    {dressCode.maleSuggestions.map((s, i) => (
                      <li key={i} className="text-sm text-gray-700">{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col items-center mb-3">
                    <Image src="/invitaciones/demo-quince/img/women.png" alt="Mujer" width={120} height={120} className="object-contain w-28 h-28 md:w-32 md:h-32" />
                  </div>
                  <ul className="space-y-1">
                    {dressCode.femaleSuggestions.map((s, i) => (
                      <li key={i} className="text-sm text-gray-700">{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <>
                {dressCode.maleSuggestions && dressCode.maleSuggestions.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-col items-center mb-3">
                      <Image src="/invitaciones/demo-quince/img/men.png" alt="Varón" width={120} height={120} className="object-contain w-28 h-28 md:w-32 md:h-32" />
                    </div>
                    <ul className="space-y-1">
                      {dressCode.maleSuggestions.map((s, i) => (
                        <li key={i} className="text-sm text-gray-700">{s}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {dressCode.femaleSuggestions && dressCode.femaleSuggestions.length > 0 && (
                  <div>
                    <div className="flex flex-col items-center mb-3">
                      <Image src="/invitaciones/demo-quince/img/women.png" alt="Mujer" width={120} height={120} className="object-contain w-28 h-28 md:w-32 md:h-32" />
                    </div>
                    <ul className="space-y-1">
                      {dressCode.femaleSuggestions.map((s, i) => (
                        <li key={i} className="text-sm text-gray-700">{s}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Columna 2 — Colores reservados */}
        {colorsToAvoid && colorsToAvoid.length > 0 && (
          <div className="text-center">
            <div className="flex flex-col items-center gap-2 mb-3">
              <Palette className="w-10 h-10 text-amber-700" />
              <p className="font-display text-gray-800 text-3xl">Colores Reservados</p>
            </div>
            <p className="text-gray-500 text-lg mb-4">
              Evita usar estos colores
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {colorsToAvoid.map((c) => (
                <div key={c.name} className="flex flex-col items-center gap-1.5">
                  <div
                    className="w-24 h-24 rounded-full border-2 border-gray-400/40 shadow-inner"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-s text-gray-600">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Columna 3 — Consideraciones */}
        {notes && notes.length > 0 && (
          <div className="text-center">
            <div className="flex flex-col items-center gap-2 mb-3">
              <AlertTriangle className="w-10 h-10 text-amber-700" />
              <p className="font-display text-gray-800 text-3xl">Consideraciones</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {notes.map((note, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <Image src={getNoteIcon(note)} alt="" width={90} height={90} className="object-contain w-24 h-24 md:w-28 md:h-28" />
                  <span className="text-sm text-gray-700">{note}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
