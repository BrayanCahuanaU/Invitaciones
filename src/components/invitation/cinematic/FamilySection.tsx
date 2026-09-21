import { Section } from "../Section";

export function FamilySection({
  parents,
  godparents,
}: {
  parents?: string[];
  godparents?: string[];
}) {
  if (!parents?.length && !godparents?.length) return null;

  return (
    <Section
      backgroundImage="/invitaciones/demo-quince/img/papel-fondo.png"
      fullWidth
    >
      <div className="flex flex-col items-center gap-2">
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-black/40 to-transparent" />
      </div>

      {parents && parents.length > 0 && (
        <div className="text-center mt-10">
          <p
            className="uppercase tracking-[0.3em] text-sm md:text-base font-bold text-black/85 mb-4"
            style={{ fontFamily: "var(--font-cinematic-display)" }}
          >
            Con la bendición de sus padres
          </p>
          <div className="space-y-2">
            {parents.map((name) => (
              <p
                key={name}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-black"
                style={{
                  fontFamily: "var(--font-cinematic-display)",
                  letterSpacing: "0.05em",
                }}
              >
                {name}
              </p>
            ))}
          </div>
        </div>
      )}

      {godparents && godparents.length > 0 && (
        <div className="text-center mt-12">
          <p
            className="uppercase tracking-[0.3em] text-sm md:text-base font-bold text-black/85 mb-4"
            style={{ fontFamily: "var(--font-cinematic-display)" }}
          >
            Padrinos
          </p>
          <div className="space-y-2">
            {godparents.map((name) => (
              <p
                key={name}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-black/75"
                style={{
                  fontFamily: "var(--font-cinematic-display)",
                  letterSpacing: "0.05em",
                }}
              >
                {name}
              </p>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}