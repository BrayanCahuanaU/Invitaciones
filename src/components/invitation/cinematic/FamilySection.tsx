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
    <Section>
      <div className="flex flex-col items-center gap-2">
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#C0C0C0] to-transparent" />
      </div>

      {parents && parents.length > 0 && (
        <div className="text-center mt-10">
          <p className="uppercase tracking-[0.3em] text-xs text-[#A8A8A8] mb-4">
            Con la bendición de sus padres
          </p>
          <div className="space-y-2">
            {parents.map((name) => (
              <p
                key={name}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F2F2F2]"
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
          <p className="uppercase tracking-[0.3em] text-xs text-[#A8A8A8] mb-4">
            Padrinos
          </p>
          <div className="space-y-2">
            {godparents.map((name) => (
              <p
                key={name}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#C0C0C0]"
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