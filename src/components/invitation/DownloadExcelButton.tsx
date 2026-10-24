"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "error";

interface Props {
  slug: string;
  accent: string;
}

function filenameFromHeader(header: string | null, fallback: string) {
  if (!header) return fallback;
  const utf8 = /filename\*=UTF-8''([^;]+)/i.exec(header)?.[1];
  if (utf8) {
    try {
      return decodeURIComponent(utf8);
    } catch {
      return fallback;
    }
  }
  return /filename="?([^";]+)"?/i.exec(header)?.[1] ?? fallback;
}

export function DownloadExcelButton({ slug, accent }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const loading = status === "loading";

  async function handleDownload() {
    if (loading) return;
    setStatus("loading");

    try {
      const response = await fetch(`/api/export?slug=${encodeURIComponent(slug)}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error ?? "No se pudo generar el archivo.");
      }

      const blob = await response.blob();
      const filename = filenameFromHeader(
        response.headers.get("Content-Disposition"),
        `invitados-${slug}.xlsx`
      );

      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 2000);

      setStatus("idle");
    } catch (error) {
      console.error("[download excel]", error);
      setStatus("error");
    }
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleDownload}
        disabled={loading}
        className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-4 text-sm font-semibold tracking-wide text-white shadow-lg transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-80 sm:text-base"
        style={{
          background: `linear-gradient(135deg, ${accent} 0%, color-mix(in srgb, ${accent} 58%, #160b13) 100%)`,
          boxShadow: `0 14px 34px -12px ${accent}`,
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Generando Excel…
          </>
        ) : (
          <>
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3v12" />
              <path d="m7 10 5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
            Descargar Excel
          </>
        )}
      </button>

      <p className="mt-3 min-h-5 text-center text-xs text-white/60" aria-live="polite">
        {status === "error"
          ? "Ocurrió un error al generar el archivo. Vuelve a intentarlo."
          : "Se descargará un archivo .xlsx con dos hojas de trabajo."}
      </p>
    </div>
  );
}
