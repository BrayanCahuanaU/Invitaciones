"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle,
  Heart,
  MessageCircle,
  Minus,
  Plus,
  XCircle,
} from "lucide-react";
import { BotanicalCorner, BotanicalSprig, GoldDivider } from "./Ornaments";

interface PublicEntry {
  name: string;
  attending: boolean;
  guests: number;
}

export function ElegantRSVP({
  slug,
  allowGuests = true,
  rsvpStatus = "open",
  deadline,
  whatsappPhone,
}: {
  slug: string;
  allowGuests?: boolean;
  rsvpStatus?: "open" | "full" | "closed";
  deadline?: string;
  whatsappPhone?: string;
}) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState(true);
  const [guests, setGuests] = useState(0);
  const [isPublic, setIsPublic] = useState(true);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [publicEntries, setPublicEntries] = useState<PublicEntry[]>([]);

  async function loadEntries() {
    try {
      const res = await fetch(`/api/rsvp?slug=${slug}`);
      const data = await res.json();
      setPublicEntries(data.entries ?? []);
    } catch {
      // silencioso
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadEntries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, name, attending, guests, isPublic }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setName("");
      setGuests(0);
      loadEntries();
    } catch {
      setStatus("error");
    }
  }

  const isOpen = rsvpStatus === "open";
  const sortByName = (a: PublicEntry, b: PublicEntry) =>
    a.name.localeCompare(b.name, "es", { sensitivity: "base" });
  const going = publicEntries.filter((entry) => entry.attending).sort(sortByName);
  const notGoing = publicEntries.filter((entry) => !entry.attending).sort(sortByName);

  return (
    <section id="confirmar" className="w-full px-4 py-14 sm:py-20">
      <div className="elegant-card relative mx-auto max-w-2xl overflow-hidden rounded-sm px-6 py-10 sm:px-10 sm:py-12">
        <BotanicalCorner className="pointer-events-none absolute left-0 top-0 h-14 w-14 opacity-70" />
        <BotanicalCorner className="pointer-events-none absolute bottom-0 right-0 h-14 w-14 rotate-180 opacity-70" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-40"
          style={{
            background:
              "radial-gradient(80% 100% at 50% 0%, rgba(255,255,255,0.9) 0%, rgba(255,253,249,0) 100%)",
          }}
        />

        <div className="relative text-center">
          <BotanicalSprig className="mx-auto h-7 w-16" />
          <p className="elegant-eyebrow mt-1" style={{ color: "var(--inv-accent)" }}>
            Confirmación
          </p>
          <h2
            className="mt-3 font-elegant-display text-3xl sm:text-4xl"
            style={{ color: "var(--inv-text)" }}
          >
            {status === "done" ? "¡Gracias por confirmar!" : isOpen ? "Confirma tu asistencia" : "Aforo completo"}
          </h2>
          <GoldDivider className="mt-5" />
          {deadline && (
            <p
              className="mt-5 text-[0.62rem] uppercase tracking-[0.28em]"
              style={{ color: "var(--inv-text-muted)" }}
            >
              Antes del {deadline}
            </p>
          )}
        </div>

        <div className="relative mt-8">
          {status === "done" ? (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{
                  border: "1px solid var(--elegant-line-strong)",
                  color: "var(--elegant-sage-deep)",
                  background: "rgba(139, 165, 139, 0.14)",
                }}
              >
                <Heart className="h-6 w-6" />
              </span>
              <p className="text-sm leading-relaxed" style={{ color: "var(--inv-text-muted)" }}>
                Tu respuesta ha sido registrada. Nos hace muy felices contar contigo en este día tan especial.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="elegant-btn-outline"
              >
                Confirmar otra persona
              </button>
            </div>
          ) : isOpen ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
              <div>
                <label
                  htmlFor="elegant-rsvp-name"
                  className="mb-2 block text-[0.58rem] uppercase tracking-[0.26em]"
                  style={{ color: "var(--inv-text-muted)" }}
                >
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="elegant-rsvp-name"
                  name="name"
                  placeholder="Escribe tu nombre"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  className="elegant-input"
                />
              </div>

              <div>
                <p
                  className="mb-2 text-[0.58rem] uppercase tracking-[0.26em]"
                  style={{ color: "var(--inv-text-muted)" }}
                >
                  ¿Nos acompañarás?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttending(true)}
                    className="rounded-full px-4 py-2.5 text-[0.68rem] uppercase tracking-[0.18em] transition-all"
                    style={
                      attending
                        ? {
                            background: "linear-gradient(135deg, #7D977E, #4C6855)",
                            border: "1px solid transparent",
                            color: "#FFFDF8",
                          }
                        : {
                            border: "1px solid var(--elegant-line-strong)",
                            color: "var(--inv-text-muted)",
                            background: "transparent",
                          }
                    }
                  >
                    Sí asistiré
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttending(false)}
                    className="rounded-full px-4 py-2.5 text-[0.68rem] uppercase tracking-[0.18em] transition-all"
                    style={
                      !attending
                        ? {
                            background: "linear-gradient(135deg, #7D977E, #4C6855)",
                            border: "1px solid transparent",
                            color: "#FFFDF8",
                          }
                        : {
                            border: "1px solid var(--elegant-line-strong)",
                            color: "var(--inv-text-muted)",
                            background: "transparent",
                          }
                    }
                  >
                    No podré ir
                  </button>
                </div>
              </div>

              {allowGuests && attending && (
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p
                      className="text-[0.58rem] uppercase tracking-[0.26em]"
                      style={{ color: "var(--inv-text-muted)" }}
                    >
                      Acompañantes
                    </p>
                    <p className="mt-1 text-xs" style={{ color: "var(--inv-text-muted)", opacity: 0.8 }}>
                      Incluyéndote en el total
                    </p>
                  </div>

                  <div
                    className="flex items-center gap-1 rounded-full p-1"
                    style={{ border: "1px solid var(--elegant-line-strong)" }}
                  >
                    <button
                      type="button"
                      onClick={() => setGuests((value) => Math.max(0, value - 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[rgba(139,165,139,0.14)]"
                      aria-label="Quitar acompañante"
                      style={{ color: "var(--inv-accent)" }}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span
                      className="w-8 text-center font-elegant-display text-lg tabular-nums"
                      style={{ color: "var(--inv-text)" }}
                    >
                      {guests}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuests((value) => Math.min(10, value + 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[rgba(139,165,139,0.14)]"
                      aria-label="Agregar acompañante"
                      style={{ color: "var(--inv-accent)" }}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}

              <label
                className="flex items-start gap-2.5 text-xs leading-relaxed"
                style={{ color: "var(--inv-text-muted)" }}
              >
                <input
                  type="checkbox"
                  id="elegant-rsvp-public"
                  name="isPublic"
                  checked={isPublic}
                  onChange={(event) => setIsPublic(event.target.checked)}
                  className="mt-0.5 accent-[#5D7A64]"
                />
                Mostrar mi confirmación en la lista de invitados
              </label>

              <button
                type="submit"
                disabled={status === "sending"}
                className="elegant-btn mt-1 w-full disabled:opacity-60"
              >
                {status === "sending" ? "Enviando..." : "Confirmar asistencia"}
              </button>

              {status === "error" && (
                <p className="text-center text-xs" style={{ color: "#A84A3A" }}>
                  No se pudo enviar. Intenta de nuevo.
                </p>
              )}

              {whatsappPhone && (
                <a
                  href={`https://wa.me/${whatsappPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
                    "¡Hola! Quiero confirmar mi asistencia a la boda."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-[0.62rem] uppercase tracking-[0.22em] transition-opacity hover:opacity-70"
                  style={{ color: "var(--inv-accent)" }}
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  También puedes confirmar por WhatsApp
                </a>
              )}
            </form>
          ) : (
            <div className="flex flex-col items-center gap-3 py-4 text-center">
              <p className="font-elegant-display text-xl" style={{ color: "var(--inv-text)" }}>
                Hemos alcanzado el aforo máximo
              </p>
              <p className="text-sm" style={{ color: "var(--inv-text-muted)" }}>
                Ya no se aceptan más confirmaciones de asistencia.
              </p>
            </div>
          )}
        </div>

        {publicEntries.length > 0 && (
          <div className="relative mt-10">
            <div
              className="mb-5 h-px w-full"
              style={{ backgroundColor: "var(--elegant-line)" }}
            />

            {going.length > 0 && (
              <div className="mb-5">
                <p
                  className="mb-3 text-center text-[0.55rem] uppercase tracking-[0.26em]"
                  style={{ color: "var(--inv-text-muted)" }}
                >
                  Asistirán ({going.length})
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {going.map((entry, index) => (
                    <div
                      key={`${entry.name}-${index}`}
                      className="flex items-center gap-2 rounded-sm px-2.5 py-2"
                      style={{
                        border: "1px solid var(--elegant-line)",
                        background: "rgba(242, 235, 221, 0.55)",
                      }}
                    >
                      <CheckCircle
                        className="h-3.5 w-3.5 flex-shrink-0"
                        style={{ color: "#6E8B6A" }}
                      />
                      <span
                        className="min-w-0 truncate text-xs"
                        style={{ color: "var(--inv-text)" }}
                      >
                        {entry.name}
                      </span>
                      {entry.guests > 0 && (
                        <span
                          className="flex-shrink-0 text-[0.6rem]"
                          style={{ color: "var(--inv-accent)" }}
                        >
                          +{entry.guests}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {notGoing.length > 0 && (
              <div>
                <p
                  className="mb-3 text-center text-[0.55rem] uppercase tracking-[0.26em]"
                  style={{ color: "var(--inv-text-muted)" }}
                >
                  No podrán ir ({notGoing.length})
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {notGoing.map((entry, index) => (
                    <div
                      key={`${entry.name}-${index}`}
                      className="flex items-center gap-2 rounded-sm px-2.5 py-2 opacity-65"
                      style={{ border: "1px solid var(--elegant-line)" }}
                    >
                      <XCircle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "#A84A3A" }} />
                      <span
                        className="min-w-0 truncate text-xs"
                        style={{ color: "var(--inv-text-muted)" }}
                      >
                        {entry.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {publicEntries.length === 0 && isOpen && (
          <p
            className="relative mt-8 text-center text-xs"
            style={{ color: "var(--inv-text-muted)" }}
          >
            Sé el primero en confirmar tu asistencia
          </p>
        )}
      </div>
    </section>
  );
}
