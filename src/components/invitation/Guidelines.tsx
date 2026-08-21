import { Shirt, Palette, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { Section } from "./Section";

interface NoteImages {
  children: string;
  adults: string;
  time: string;
  default: string;
}

const DEFAULT_NOTE_IMAGES: NoteImages = {
  children: "/invitaciones/demo-quince/img/prohibido-niños.png",
  adults: "/invitaciones/demo-quince/img/mayores18.png",
  time: "/invitaciones/demo-quince/img/tiempo.png",
  default: "/invitaciones/demo-quince/img/tiempo.png",
};

function getNoteIcon(note: string, images: NoteImages): string {
  const lower = note.toLowerCase();
  if (lower.includes("niños")) return images.children;
  if (lower.includes("adultos") || lower.includes("años")) return images.adults;
  if (lower.includes("minutos") || lower.includes("antes") || lower.includes("hora") || lower.includes("entrada") || lower.includes("pm") || lower.includes("am")) return images.time;
  return images.default;
}

export function Guidelines({
  dressCode,
  colorsToAvoid,
  notes,
  backgroundImage,
  backgroundImageMobile,
  hideTitle,
  variant = "light",
  manImage = "/invitaciones/demo-quince/img/men.png",
  womanImage = "/invitaciones/demo-quince/img/women.png",
  noteImages = DEFAULT_NOTE_IMAGES,
  noteTextClass = "text-base",
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
  backgroundImage?: string;
  backgroundImageMobile?: string;
  hideTitle?: boolean;
  variant?: "light" | "dark";
  manImage?: string;
  womanImage?: string;
  noteImages?: Partial<NoteImages>;
  noteTextClass?: string;
}) {
  if (!dressCode && !colorsToAvoid?.length && !notes?.length) return null;

  const images: NoteImages = { ...DEFAULT_NOTE_IMAGES, ...noteImages };
  const titleClass = variant === "dark" ? "text-gray-100" : "text-gray-800";
  const bodyClass = variant === "dark" ? "text-gray-300" : "text-gray-700";
  const mutedClass = variant === "dark" ? "text-gray-400" : "text-gray-500";
  const captionClass = variant === "dark" ? "text-gray-400" : "text-gray-600";

  return (
    <Section backgroundImage={backgroundImage ?? "/invitaciones/demo-quince/img/papel-fondo.png"} backgroundImageMobile={backgroundImageMobile ?? "/invitaciones/demo-quince/img/papel-fondo-vertical.png"} fullWidth className="!py-72 md:!py-64 lg:!py-72">
      {!hideTitle && (
        <div className="flex items-center justify-center gap-2 mb-8">
          <p className={`font-display ${titleClass} text-3xl md:text-5xl`}>Indicaciones</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-6">
        {/* Columna 1 — Vestimenta */}
        {dressCode && (
          <div className="text-center">
            <div className="flex flex-col items-center gap-2 mb-3">
              <p className={`font-display ${titleClass} text-3xl`}>Vestimenta</p>
            </div>

            {dressCode.maleSuggestions && dressCode.maleSuggestions.length > 0 && dressCode.femaleSuggestions && dressCode.femaleSuggestions.length > 0 ? (
              <div className="flex flex-row gap-4 md:gap-8 mt-6">
                  <div className="flex-1">
                  <div className="flex flex-col items-center mb-3">
                      <Image src={manImage} alt="Varón" width={500} height={500} className="object-contain w-32 h-32 md:w-52 md:h-52" />
                  </div>
                  <ul className="space-y-1">
                    {dressCode.maleSuggestions.map((s, i) => (
                      <li key={i} className={`text-base ${bodyClass}`}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col items-center mb-3">
                      <Image src={womanImage} alt="Mujer" width={500} height={500} className="object-contain w-32 h-32 md:w-52 md:h-52" />
                  </div>
                  <ul className="space-y-1">
                    {dressCode.femaleSuggestions.map((s, i) => (
                      <li key={i} className={`text-base ${bodyClass}`}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <>
                {dressCode.maleSuggestions && dressCode.maleSuggestions.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-col items-center mb-3">
                    <Image src={manImage} alt="Varón" width={500} height={500} className="object-contain w-32 h-32 md:w-52 md:h-52" />
                    </div>
                    <ul className="space-y-1">
                      {dressCode.maleSuggestions.map((s, i) => (
                        <li key={i} className={`text-base ${bodyClass}`}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {dressCode.femaleSuggestions && dressCode.femaleSuggestions.length > 0 && (
                  <div>
                    <div className="flex flex-col items-center mb-3">
                    <Image src={womanImage} alt="Mujer" width={500} height={500} className="object-contain w-32 h-32 md:w-52 md:h-52" />
                    </div>
                    <ul className="space-y-1">
                      {dressCode.femaleSuggestions.map((s, i) => (
                        <li key={i} className={`text-base ${bodyClass}`}>{s}</li>
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
              <p className={`font-display ${titleClass} text-3xl`}>Colores Reservados</p>
            </div>
            <p className={`${mutedClass} text-xl mb-4`}>
              Evita usar estos colores
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {colorsToAvoid.map((c) => (
                <div key={c.name} className="flex flex-col items-center gap-1.5">
                  <div
                    className="color-swatch w-24 h-24 md:w-35 md:h-35 rounded-full border-2 border-gray-400/40 shadow-inner"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className={`text-lg ${captionClass}`}>{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Columna 3 — Consideraciones */}
        {notes && notes.length > 0 && (
          <div className="text-center">
            <div className="flex flex-col items-center gap-2 mb-3">
              <p className={`font-display ${titleClass} text-3xl`}>Consideraciones</p>
            </div>
            <div className={`grid gap-4 md:gap-8 ${notes.length === 1 ? "grid-cols-1 max-w-md mx-auto" : `grid-cols-2 ${notes.length % 2 !== 0 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}`}>
              {notes.map((note, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <Image src={getNoteIcon(note, images)} alt="" width={500} height={500} className="object-cover aspect-square w-28 h-28 md:w-48 md:h-48 my-2" />
                  <span className={`${noteTextClass} ${bodyClass} px-2 md:px-0`}>{note}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="pb-16 md:pb-24" />
    </Section>
  );
}
