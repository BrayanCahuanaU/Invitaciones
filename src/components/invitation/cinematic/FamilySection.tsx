import { Section } from "../Section";

export function FamilySection({
  parents,
  godparents,
  backgroundImage = "/invitaciones/demo-quince/img/papel-fondo.png",
}: {
  parents?: string[];
  godparents?: string[];
  backgroundImage?: string;
}) {
  if (!parents?.length && !godparents?.length) return null;

  return (
    <Section
      backgroundImage={backgroundImage}
      fullWidth
    >
      

      {parents && parents.length > 0 && (
        <div className="text-center mt-10">
          <p
            className="uppercase tracking-[0.3em] text-sm md:text-base font-bold text-white/65 mb-4"
            style={{ fontFamily: "var(--font-cinematic-display)" }}
          >
            Con la bendición de sus padres
          </p>
          <div className="space-y-2">
            {parents.map((name) => (
              <p
                key={name}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold/100"
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

      <div className="flex flex-col items-center gap-2">
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-black/40 to-transparent" />
      </div>

      {godparents && godparents.length > 0 && (
        <div className="text-center mt-12">
          <p
            className="uppercase tracking-[0.3em] text-sm md:text-base font-bold text-white/65 mb-4"
            style={{ fontFamily: "var(--font-cinematic-display)" }}
          >
            Padrinos
          </p>
          <div className="space-y-2">
            {godparents.map((name) => (
              <p
                key={name}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold/100"
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