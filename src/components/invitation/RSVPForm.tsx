"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Users } from "lucide-react";
import { Section } from "./Section";

interface PublicEntry {
  name: string;
  attending: boolean;
  guests: number;
}

export function RSVPForm({ slug }: { slug: string }) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState(true);
  const [guests, setGuests] = useState(0);
  const [isPublic, setIsPublic] = useState(true);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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

  const guestsGoing = publicEntries.filter((e) => e.attending);
  const guestsNotGoing = publicEntries.filter((e) => !e.attending);

  if (status === "done") {
    return (
      <Section id="confirmar">
        <CheckCircle className="w-10 h-10 text-[var(--inv-accent)] mx-auto mb-4" />
        <p className="font-display text-2xl md:text-3xl">
          ¡Gracias por confirmar!
        </p>
        <p className="text-[var(--inv-text-muted)] mt-2">
          Te esperamos en la celebración.
        </p>
      </Section>
    );
  }

  return (
    <Section id="confirmar">
      <div className="flex items-center justify-center gap-2 mb-6">
        <CheckCircle className="w-5 h-5 text-[var(--inv-accent)]" />
        <p className="font-display text-3xl md:text-4xl">Confirma tu asistencia</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left max-w-sm mx-auto">
        <input
          type="text"
          placeholder="Tu nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-transparent border-b border-[var(--inv-text-muted)] py-2 outline-none focus:border-[var(--inv-accent)] transition-colors"
        />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setAttending(true)}
            className={`flex-1 rounded-full border px-4 py-2 text-sm transition-all ${
              attending
                ? "border-[var(--inv-accent)] bg-[var(--inv-accent)] text-white"
                : "border-[var(--inv-text-muted)] hover:border-[var(--inv-accent)]"
            }`}
          >
            Sí asistiré
          </button>
          <button
            type="button"
            onClick={() => setAttending(false)}
            className={`flex-1 rounded-full border px-4 py-2 text-sm transition-all ${
              !attending
                ? "border-[var(--inv-accent)] bg-[var(--inv-accent)] text-white"
                : "border-[var(--inv-text-muted)] hover:border-[var(--inv-accent)]"
            }`}
          >
            No podré ir
          </button>
        </div>

        {attending && (
          <label className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[var(--inv-accent-muted)]" />
              Acompañantes
            </span>
            <input
              type="number"
              min={0}
              max={10}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-16 bg-transparent border-b border-[var(--inv-text-muted)] py-1 text-center outline-none"
            />
          </label>
        )}

        <label className="flex items-center gap-2 text-sm text-[var(--inv-text-muted)]">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="accent-[var(--inv-accent)]"
          />
          Mostrar mi confirmación en la lista pública
        </label>

        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-2 rounded-full bg-[var(--inv-accent)] text-white px-6 py-3 font-medium disabled:opacity-60 hover:opacity-90 transition-opacity"
        >
          {status === "sending" ? "Enviando..." : "Confirmar asistencia"}
        </button>

        {status === "error" && (
          <p className="text-sm text-red-400">
            No se pudo enviar. Intenta de nuevo.
          </p>
        )}
      </form>

      {/* Lista de asistentes */}
      {publicEntries.length > 0 && (
        <div className="mt-10 max-w-lg mx-auto">
          {/* Asistirán */}
          {guestsGoing.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <p className="text-xs uppercase tracking-widest text-[var(--inv-text-muted)]">
                  Asistirán ({guestsGoing.length})
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {guestsGoing.map((e, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-[var(--inv-surface)]/50 rounded-lg px-3 py-2 border border-emerald-400/15"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="min-w-0 truncate text-sm">{e.name}</span>
                    {e.guests > 0 && (
                      <span className="text-xs text-[var(--inv-accent-muted)] flex-shrink-0">
                        +{e.guests}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No podrán ir */}
          {guestsNotGoing.length > 0 && (
            <div>
              <div className="flex items-center justify-center gap-2 mb-3">
                <XCircle className="w-4 h-4 text-red-400/60" />
                <p className="text-xs uppercase tracking-widest text-[var(--inv-text-muted)]">
                  No podrán ir ({guestsNotGoing.length})
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {guestsNotGoing.map((e, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-[var(--inv-surface)]/30 rounded-lg px-3 py-2 border border-red-400/10 opacity-60"
                  >
                    <XCircle className="w-4 h-4 text-red-400/60 flex-shrink-0" />
                    <span className="min-w-0 truncate text-sm">{e.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {publicEntries.length === 0 && (
        <div className="mt-10 text-center">
          <p className="text-[var(--inv-text-muted)] text-sm">
            Sé el primero en confirmar tu asistencia
          </p>
        </div>
      )}
    </Section>
  );
}
