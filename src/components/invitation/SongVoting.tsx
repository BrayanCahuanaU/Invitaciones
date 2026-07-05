"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Section } from "./Section";

interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string;
}

interface RankedTrack extends Track {
  score: number;
}

export function SongVoting({ slug }: { slug: string }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Track[]>([]);
  const [ranking, setRanking] = useState<RankedTrack[]>([]);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  async function loadRanking() {
    const res = await fetch(`/api/songs?slug=${slug}`);
    const data = await res.json();
    setRanking(data.songs ?? []);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadRanking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    if (query.trim().length < 2) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults([]);
      return;
    }
    const id = setTimeout(async () => {
      const res = await fetch(`/api/songs/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results ?? []);
    }, 350);
    return () => clearTimeout(id);
  }, [query]);

  async function addTrack(track: Track) {
    await fetch("/api/songs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, track }),
    });
    setAddedIds((prev) => new Set(prev).add(track.id));
    setQuery("");
    setResults([]);
    loadRanking();
  }

  return (
    <Section id="playlist">
      <p className="font-display text-3xl mb-2">Sugiere una canción</p>
      <p className="text-[var(--inv-text-muted)] text-sm mb-6">
        Ayúdanos a armar la playlist de la fiesta. Si tu canción ya fue
        elegida por alguien más, súmale tu voto.
      </p>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar canción o artista..."
          className="w-full bg-transparent border-b border-[var(--inv-text-muted)] py-2 outline-none focus:border-[var(--inv-accent)]"
        />
        {results.length > 0 && (
          <ul className="absolute z-10 left-0 right-0 bg-[var(--inv-surface)] border border-[var(--inv-text-muted)]/30 mt-1 max-h-64 overflow-y-auto text-left">
            {results.map((t) => (
              <li key={t.id}>
                <button
                  onClick={() => addTrack(t)}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[var(--inv-accent)]/10"
                >
                  {t.cover && (
                    <Image
                      src={t.cover}
                      alt=""
                      width={36}
                      height={36}
                      className="rounded-sm"
                    />
                  )}
                  <span className="text-sm">
                    <span className="block">{t.title}</span>
                    <span className="block text-[var(--inv-text-muted)] text-xs">
                      {t.artist}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {ranking.length > 0 && (
        <div className="mt-8 text-left">
          <p className="text-xs uppercase tracking-widest text-[var(--inv-text-muted)] mb-3">
            Canciones elegidas por los invitados
          </p>
          <ul className="space-y-2">
            {ranking.map((t) => (
              <li key={t.id} className="flex items-center gap-3">
                {t.cover && (
                  <Image
                    src={t.cover}
                    alt=""
                    width={36}
                    height={36}
                    className="rounded-sm"
                  />
                )}
                <span className="flex-1 text-sm">
                  <span className="block">{t.title}</span>
                  <span className="block text-[var(--inv-text-muted)] text-xs">
                    {t.artist}
                  </span>
                </span>
                <button
                  onClick={() => addTrack(t)}
                  disabled={addedIds.has(t.id)}
                  className="text-xs rounded-full border border-[var(--inv-accent)] px-3 py-1 disabled:opacity-40"
                >
                  +{t.score}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
