import { Section } from "../Section";
import { PadrinosGroup, WeddingTexts } from "@/content/types";
import {
  BotanicalCorner,
  BotanicalSprig,
  Butterfly,
  FloralCluster,
  GoldDivider,
  NameDivider,
  SectionHeading,
} from "./Ornaments";

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
      <Butterfly className="pointer-events-none absolute right-3 top-3 h-5 w-6 rotate-12 opacity-70" />
      <p className="elegant-eyebrow text-[0.68rem]" style={{ color: "var(--inv-accent)" }}>
        {label}
      </p>
      <GoldDivider className="my-5" />
      <div className="space-y-1.5">
        {names.map((name, index) => (
          <div key={name} className="flex flex-col items-center">
            {index > 0 && <NameDivider className="my-2" />}
            <p
              className="font-elegant-display text-[1.25rem] leading-snug sm:text-[1.35rem]"
              style={{ color: "var(--inv-text)" }}
            >
              {name}
            </p>
          </div>
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
  texts,
}: {
  brideParents?: string[];
  groomParents?: string[];
  padrinosGroups?: PadrinosGroup[];
  padrinos?: string[];
  texts: WeddingTexts;
}) {
  const hasParents =
    (brideParents?.length ?? 0) > 0 || (groomParents?.length ?? 0) > 0;
  const hasPadrinos =
    (padrinosGroups?.length ?? 0) > 0 || (padrinos?.length ?? 0) > 0;

  if (!hasParents && !hasPadrinos) return null;

  return (
    <Section className="relative overflow-hidden">
      <FloralCluster className="pointer-events-none absolute left-0 top-2 h-36 w-auto opacity-50" />
      <FloralCluster
        flip
        className="pointer-events-none absolute bottom-2 right-0 h-36 w-auto opacity-50"
      />

      <SectionHeading
        eyebrow={texts.family.eyebrow}
        title={texts.family.title}
        subtitle={texts.family.subtitle}
      />

      {hasParents && (
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <FamilyCard
            label={texts.family.brideParentsLabel}
            names={brideParents ?? []}
          />
          <FamilyCard
            label={texts.family.groomParentsLabel}
            names={groomParents ?? []}
          />
        </div>
      )}

      {hasPadrinos && (
        <div className="mt-20">
          <SectionHeading
            eyebrow={texts.family.padrinosEyebrow}
            title={texts.family.padrinosTitle}
          />

          {padrinosGroups && padrinosGroups.length > 0 ? (
            <div className="mt-10 flex flex-wrap justify-center gap-5 lg:-mx-6">
              {padrinosGroups.map((group) => (
                <div
                  key={group.role}
                  className="elegant-card elegant-card-hover relative w-full overflow-hidden rounded-sm px-7 py-8 text-center md:w-[calc(50%-0.625rem)]"
                >
                  <BotanicalSprig className="mx-auto h-6 w-14" />
                  <Butterfly
                    flip
                    className="pointer-events-none absolute bottom-2 right-3 h-4 w-5 -rotate-12 opacity-60"
                  />
                  <p
                    className="elegant-eyebrow mt-1 text-[0.65rem]"
                    style={{ color: "var(--inv-accent)" }}
                  >
                    {group.role}
                  </p>
                  <div
                    className="mx-auto my-4 h-px w-10"
                    style={{ backgroundColor: "var(--elegant-line-strong)" }}
                  />
                  <div className="space-y-1">
                    {group.names.map((name, index) => (
                      <div key={name} className="flex flex-col items-center">
                        {index > 0 && <NameDivider className="my-2" />}
                        <p
                          className="font-elegant-display text-[1.2rem] leading-snug"
                          style={{ color: "var(--inv-text)" }}
                        >
                          {name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="elegant-card mx-auto mt-10 max-w-2xl rounded-sm px-6 py-8 text-center sm:px-10">
              <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {padrinos?.map((name, index) => (
                  <div key={name} className="flex flex-col items-center">
                    {index > 0 && <NameDivider className="my-2 sm:hidden" />}
                    <p
                      className="font-elegant-display text-[1.2rem] leading-snug"
                      style={{ color: "var(--inv-text)" }}
                    >
                      {name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Section>
  );
}
