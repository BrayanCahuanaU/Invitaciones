"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Music, Search, Plus } from "lucide-react";
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

  const loadRanking = useCallback(async () => {
    try {
      const res = await fetch(`/api/songs?slug=${slug}`);
      if (!res.ok) return;
      const text = await res.text();
      if (!text) return;
      const data = JSON.parse(text);
      const songs: RankedTrack[] = data.songs ?? [];
      setRanking(songs);
      setAddedIds(new Set(songs.map((s: RankedTrack) => s.id)));
    } catch {
      // silencioso
    }
  }, [slug]);

  useEffect(() => {
    loadRanking();
  }, [loadRanking]);

  useEffect(() => {
    function onFocus() {
      loadRanking();
    }
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [loadRanking]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const id = setTimeout(async () => {
      try {
        const res = await fetch(`/api/songs/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) return;
        const text = await res.text();
        if (!text) return;
        const data = JSON.parse(text);
        setResults(data.results ?? []);
      } catch {
        // silencioso
      }
    }, 350);
    return () => clearTimeout(id);
  }, [query]);

  async function addTrack(track: Track) {
    try {
      await fetch("/api/songs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, track }),
      });
    } catch {
      // silencioso
    }
    setAddedIds((prev) => new Set(prev).add(track.id));
    setQuery("");
    setResults([]);
    await loadRanking();
  }

  return (
    <Section id="playlist" className="mb-20 md:mb-20">
      <div className="flex flex-col items-center gap-2 mb-2">
        <Music className="w-5 h-5 text-[#C0C0C0]" />
        <p className="font-display text-3xl md:text-4xl">
          Sugiere una canción
        </p>
      </div>
      <p className="text-[var(--inv-text-muted)] text-sm mb-6">
        Ayúdanos a armar la playlist de la fiesta. Si tu canción ya fue
        elegida por alguien más, súmale tu voto.
      </p>

      <div className="relative max-w-sm mx-auto">
        <div className="flex items-center border-b border-[var(--inv-text-muted)]">
          <Search className="w-4 h-4 text-[#C0C0C0]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar canción o artista..."
            className="w-full bg-transparent py-2 pl-2 outline-none focus:border-[#C0C0C0]"
          />
        </div>
        {results.length > 0 && (
          <ul className="absolute z-50 left-0 right-0 bg-[var(--inv-surface)]/80 backdrop-blur-md border border-white/10 mt-1 max-h-64 overflow-y-auto text-left rounded-lg overflow-hidden">
            {results.map((t) => (
              <li key={t.id}>
                <button
                  onClick={() => addTrack(t)}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#C0C0C0]/10 transition-colors"
                >
                  {t.cover ? (
                    <Image
                      src={t.cover}
                      alt={t.title}
                      width={40}
                      height={40}
                      className="rounded-md flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-md bg-[#C0C0C0]/10 flex items-center justify-center flex-shrink-0">
                      <Music className="w-4 h-4 text-[#C0C0C0]" />
                    </div>
                  )}
                  <span className="text-sm min-w-0">
                    <span className="block truncate">{t.title}</span>
                    <span className="block text-[var(--inv-text-muted)] text-xs truncate">
                      {t.artist}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Estado vacío: aún no hay canciones votadas */}
      {ranking.length === 0 && (
        <p className="text-[var(--inv-text-muted)] text-sm mt-6 text-center">
          Aún no hay canciones en la playlist. ¡Sé el primero en sugerir una!
        </p>
      )}

      {/* Ranking de canciones */}
      {ranking.length > 0 && (
        <div className="mt-8 max-w-lg mx-auto">
          <p className="text-xs uppercase tracking-widest text-[var(--inv-text-muted)] mb-3 text-center">
            Playlist de la fiesta ({ranking.length})
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ranking.map((t) => (
              <div
                key={t.id}
                className="flex items-center gap-3 bg-[var(--inv-surface)]/40 backdrop-blur-md rounded-lg px-3 py-2 border border-white/8"
              >
                {t.cover ? (
                  <Image
                    src={t.cover}
                    alt={t.title}
                    width={48}
                    height={48}
                    className="rounded-md flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-md bg-[#C0C0C0]/10 flex items-center justify-center flex-shrink-0">
        <Music className="w-8 h-8 text-[#C0C0C0]" />
                  </div>
                )}
                <span className="flex-1 text-sm min-w-0">
                  <span className="block truncate">{t.title}</span>
                  <span className="block text-[var(--inv-text-muted)] text-xs truncate">
                    {t.artist}
                  </span>
                </span>
                <button
                  onClick={() => addTrack(t)}
                  disabled={addedIds.has(t.id)}
                  className="flex items-center gap-0.5 text-xs rounded-full border border-[#C0C0C0] px-2.5 py-1 disabled:opacity-40 hover:bg-[#C0C0C0]/10 transition-colors flex-shrink-0"
                >
                  <Plus className="w-3 h-3" />
                  {t.score}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
