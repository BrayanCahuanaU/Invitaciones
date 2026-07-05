import { Section } from "./Section";

export function Guidelines({
  dressCode,
  colorsToAvoid,
  notes,
}: {
  dressCode?: string;
  colorsToAvoid?: string[];
  notes?: string;
}) {
  if (!dressCode && !colorsToAvoid?.length && !notes) return null;
  return (
    <Section>
      <p className="font-display text-3xl mb-6">Indicaciones</p>
      {dressCode && (
        <p className="mb-3">
          <span className="text-[var(--inv-text-muted)]">Código de vestimenta: </span>
          {dressCode}
        </p>
      )}
      {colorsToAvoid && colorsToAvoid.length > 0 && (
        <div className="mb-3">
          <p className="text-[var(--inv-text-muted)] mb-2">
            Colores reservados (evitar usarlos):
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {colorsToAvoid.map((c) => (
              <span
                key={c}
                className="rounded-full border border-[var(--inv-text-muted)] px-3 py-1 text-xs"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      )}
      {notes && <p className="text-[var(--inv-text-muted)] mt-3">{notes}</p>}
    </Section>
  );
}
