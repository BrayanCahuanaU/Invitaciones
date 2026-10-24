import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getInvitation } from "@/content/registry";
import { getTheme } from "@/themes/registry";
import { DownloadExcelButton } from "@/components/invitation/DownloadExcelButton";

type PageParams = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getInvitation(slug);
  if (!data) return {};

  return {
    title: `Descargar invitados · ${data.hero.protagonists}`,
    description: "Descarga la lista de invitados y el ranking de canciones en Excel.",
    robots: { index: false, follow: false },
  };
}

const dateFormatter = new Intl.DateTimeFormat("es-PE", {
  timeZone: "America/Lima",
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function ExportPage({ params }: { params: PageParams }) {
  const { slug } = await params;
  const data = getInvitation(slug);
  if (!data) notFound();

  const theme = getTheme(data.theme);
  const eventDate = new Date(data.eventDate);
  const dateLabel = Number.isNaN(eventDate.getTime())
    ? data.eventDate
    : dateFormatter.format(eventDate);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a070c] px-5 py-10 text-[#f4eef1] sm:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 18% 12%, ${theme.colors.accent}40 0%, transparent 42%), radial-gradient(circle at 82% 88%, ${theme.colors.accentMuted}33 0%, transparent 45%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-xl flex-col items-center">
        <p
          className="mb-6 rounded-full border px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em]"
          style={{ borderColor: `${theme.colors.accent}80`, color: theme.colors.accent }}
        >
          Panel del anfitrión · Confidencial
        </p>

        <div
          className="w-full rounded-3xl border p-7 shadow-2xl backdrop-blur-sm sm:p-10"
          style={{
            borderColor: `${theme.colors.accent}59`,
            background:
              "linear-gradient(165deg, rgba(32,24,33,.97) 0%, rgba(15,11,17,.98) 100%)",
            boxShadow: `0 30px 80px -30px ${theme.colors.accent}66`,
          }}
        >
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/45">
              {data.hero.motivo}
            </p>
            <h1
              className="mt-2 font-[family-name:var(--font-display)] text-3xl leading-tight sm:text-4xl"
              style={{ color: "#fff7fa" }}
            >
              {data.hero.protagonists}
            </h1>
            <p className="mt-3 text-sm capitalize text-white/60">{dateLabel}</p>
            <p className="text-xs text-white/40">
              {data.location.venueName}
              {data.location.district ? ` · ${data.location.district}` : ""}
            </p>
          </div>

          <div
            className="my-7 h-px w-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${theme.colors.accent}99, transparent)`,
            }}
          />

          <p className="mx-auto max-w-md text-center text-sm leading-relaxed text-white/65">
            Descarga en un solo archivo la lista de invitados confirmados y el
            ranking de canciones votadas por tus invitados.
          </p>

          <div className="mt-6">
            <DownloadExcelButton
              slug={data.slug}
              accent={theme.colors.accent}
            />
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                Hoja 1
              </p>
              <p className="mt-1 text-sm font-medium text-white/85">Invitados</p>
              <p className="mt-1 text-xs leading-relaxed text-white/50">
                Nombres sin duplicados, asistencia, acompañantes y fecha de
                confirmación.
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                Hoja 2
              </p>
              <p className="mt-1 text-sm font-medium text-white/85">Música</p>
              <p className="mt-1 text-xs leading-relaxed text-white/50">
                Ranking de canciones con artista y puntuación obtenida.
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-[11px] leading-relaxed text-white/35">
            El archivo se genera al momento con la información más reciente.
            Comparte este enlace solo con las personas autorizadas.
          </p>
        </div>

        <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-white/25">
          {data.seo.title}
        </p>
      </div>
    </main>
  );
}
