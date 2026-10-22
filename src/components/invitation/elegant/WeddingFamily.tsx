import { Section } from "../Section";
import { PadrinosGroup } from "@/content/types";
import { BotanicalCorner, BotanicalSprig, GoldDivider, SectionHeading } from "./Ornaments";

function FamilyCard({
  label,
  names,
}: {
  label: string;
  names: string[];
}) {
  if (!names.length) return null;
  return (
    <div className="elegant-card elegant-card-hover relative overflow-hidden rounded-sm px-6 py-8 text-center sm:px-8 sm:py-10">
      <BotanicalCorner className="pointer-events-none absolute left-0 top-0 h-14 w-14 opacity-80" />
      <BotanicalCorner className="pointer-events-none absolute bottom-0 right-0 h-14 w-14 rotate-180 opacity-80" />
      <p className="elegant-eyebrow text-[0.58rem]" style={{ color: "var(--inv-accent)" }}>
        {label}
      </p>
      <GoldDivider className="my-5" />
      <div className="space-y-1.5">
        {names.map((name) => (
          <p
            key={name}
            className="font-elegant-display text-lg leading-snug sm:text-xl"
            style={{ color: "var(--inv-text)" }}
          >
            {name}
          </p>
        ))}
      </div>
    </div>
  );
}

export function WeddingFamily({
  brideParents,
  groomParents,
  padrinosGroups,
  padrinos,
}: {
  brideParents?: string[];
  groomParents?: string[];
  padrinosGroups?: PadrinosGroup[];
  padrinos?: string[];
}) {
  const hasParents =
    (brideParents?.length ?? 0) > 0 || (groomParents?.length ?? 0) > 0;
  const hasPadrinos =
    (padrinosGroups?.length ?? 0) > 0 || (padrinos?.length ?? 0) > 0;

  if (!hasParents && !hasPadrinos) return null;

  return (
    <Section>
      <SectionHeading
        eyebrow="Con la bendición de"
        title="Nuestras familias"
        subtitle="Con profundo amor y gratitud, queremos compartir este día junto a quienes nos han acompañado siempre."
      />

      {hasParents && (
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <FamilyCard label="Padres de la novia" names={brideParents ?? []} />
          <FamilyCard label="Padres del novio" names={groomParents ?? []} />
        </div>
      )}

      {hasPadrinos && (
        <div className="mt-20">
          <SectionHeading
            eyebrow="Gracias por apadrinar nuestro amor"
            title="Nuestros padrinos"
          />

          {padrinosGroups && padrinosGroups.length > 0 ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {padrinosGroups.map((group) => (
                <div
                  key={group.role}
                  className="elegant-card elegant-card-hover relative overflow-hidden rounded-sm px-5 py-7 text-center"
                >
                  <BotanicalSprig className="mx-auto h-6 w-14" />
                  <p
                    className="elegant-eyebrow mt-1 text-[0.55rem]"
                    style={{ color: "var(--inv-accent)" }}
                  >
                    {group.role}
                  </p>
                  <div
                    className="mx-auto my-4 h-px w-10"
                    style={{ backgroundColor: "var(--elegant-line-strong)" }}
                  />
                  <div className="space-y-1">
                    {group.names.map((name) => (
                      <p
                        key={name}
                        className="font-elegant-display text-lg leading-snug"
                        style={{ color: "var(--inv-text)" }}
                      >
                        {name}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="elegant-card mx-auto mt-10 max-w-2xl rounded-sm px-6 py-8 text-center sm:px-10">
              <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {padrinos?.map((name) => (
                  <p
                    key={name}
                    className="font-elegant-display text-lg leading-snug"
                    style={{ color: "var(--inv-text)" }}
                  >
                    {name}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Section>
  );
}
