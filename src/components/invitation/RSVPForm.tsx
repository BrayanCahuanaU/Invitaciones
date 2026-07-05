"use client";

import { useEffect, useState } from "react";
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
      // silencioso: la lista pública es un extra, no bloquea el formulario
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

  if (status === "done") {
    return (
      <Section id="confirmar">
        <p className="font-display text-2xl">¡Gracias por confirmar!</p>
        <p className="text-[var(--inv-text-muted)] mt-2">
          Te esperamos en la celebración.
        </p>
      </Section>
    );
  }

  return (
    <Section id="confirmar">
      <p className="font-display text-3xl mb-6">Confirma tu asistencia</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
        <input
          type="text"
          placeholder="Tu nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-transparent border-b border-[var(--inv-text-muted)] py-2 outline-none focus:border-[var(--inv-accent)]"
        />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setAttending(true)}
            className={`flex-1 rounded-full border px-4 py-2 text-sm ${
              attending
                ? "border-[var(--inv-accent)] bg-[var(--inv-accent)] text-[var(--inv-bg)]"
                : "border-[var(--inv-text-muted)]"
            }`}
          >
            Sí asistiré
          </button>
          <button
            type="button"
            onClick={() => setAttending(false)}
            className={`flex-1 rounded-full border px-4 py-2 text-sm ${
              !attending
                ? "border-[var(--inv-accent)] bg-[var(--inv-accent)] text-[var(--inv-bg)]"
                : "border-[var(--inv-text-muted)]"
            }`}
          >
            No podré ir
          </button>
        </div>

        {attending && (
          <label className="flex items-center justify-between text-sm">
            Acompañantes
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
          />
          Mostrar mi confirmación en la lista pública
        </label>

        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-2 rounded-full bg-[var(--inv-accent)] text-[var(--inv-bg)] px-6 py-3 font-medium disabled:opacity-60"
        >
          {status === "sending" ? "Enviando..." : "Confirmar asistencia"}
        </button>

        {status === "error" && (
          <p className="text-sm text-red-400">
            No se pudo enviar. Intenta de nuevo.
          </p>
        )}
      </form>

      {publicEntries.length > 0 && (
        <div className="mt-10 text-left">
          <p className="text-xs uppercase tracking-widest text-[var(--inv-text-muted)] mb-3">
            Ya confirmaron
          </p>
          <ul className="space-y-1 text-sm">
            {publicEntries.map((e, i) => (
              <li key={i}>
                {e.name} {e.attending ? "✓" : "✗"}
                {e.attending && e.guests > 0 ? ` (+${e.guests})` : ""}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
