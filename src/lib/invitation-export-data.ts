import { getInvitation } from "@/content/registry";
import { getRedis } from "@/lib/redis";
import type { InvitationData } from "@/content/types";

export interface GuestRow {
  name: string;
  attending: boolean;
  guests: number;
  createdAt: string | null;
}

export interface SongRow {
  id: string;
  title: string;
  artist: string;
  score: number;
}

export interface InvitationExportData {
  invitation: InvitationData;
  guests: GuestRow[];
  songs: SongRow[];
  duplicatesRemoved: number;
}

const collator = new Intl.Collator("es", { sensitivity: "base" });

/**
 * Clave para considerar dos nombres como el mismo invitado:
 * sin mayúsculas, sin tildes, sin espacios repetidos.
 */
function nameKey(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function parseRsvp(raw: unknown[]): GuestRow[] {
  const guests: GuestRow[] = [];

  for (const item of raw) {
    let record: Record<string, unknown> | null = null;
    try {
      record = typeof item === "string" ? JSON.parse(item) : (item as Record<string, unknown>);
    } catch {
      record = null;
    }
    if (!record || typeof record.name !== "string") continue;

    const name = record.name.trim().replace(/\s+/g, " ");
    if (!name) continue;

    guests.push({
      name,
      attending: Boolean(record.attending),
      guests:
        typeof record.guests === "number" && Number.isFinite(record.guests)
          ? Math.max(0, Math.trunc(record.guests))
          : 0,
      createdAt: typeof record.createdAt === "string" ? record.createdAt : null,
    });
  }

  return guests;
}

/** Elimina nombres repetidos conservando la confirmación más antigua. */
function dedupeGuests(guests: GuestRow[]) {
  const byKey = new Map<string, GuestRow>();

  for (const guest of guests) {
    const key = nameKey(guest.name);
    if (!key) continue;

    const current = byKey.get(key);
    if (!current) {
      byKey.set(key, guest);
      continue;
    }

    const currentTime = current.createdAt ? Date.parse(current.createdAt) : Infinity;
    const nextTime = guest.createdAt ? Date.parse(guest.createdAt) : Infinity;
    if (Number.isFinite(nextTime) && nextTime < currentTime) {
      byKey.set(key, guest);
    }
  }

  return [...byKey.values()].sort((a, b) => collator.compare(a.name, b.name));
}

interface DeezerTrack {
  title?: string;
  artist?: { name?: string };
}

async function resolveSongMeta(
  redis: ReturnType<typeof getRedis>,
  slug: string,
  id: string,
  rawMeta: string | undefined
) {
  if (rawMeta) {
    try {
      const parsed = JSON.parse(rawMeta) as { title?: string; artist?: string };
      if (parsed?.title) {
        return { title: parsed.title, artist: parsed.artist ?? "" };
      }
    } catch {
      // metadata corrupta: se recupera desde Deezer
    }
  }

  try {
    const res = await fetch(`https://api.deezer.com/track/${encodeURIComponent(id)}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Deezer ${res.status}`);
    const track = (await res.json()) as DeezerTrack;
    if (!track.title) throw new Error("Sin título");

    const meta = { title: track.title, artist: track.artist?.name ?? "" };
    await redis
      .hsetnx(
        `songmeta:${slug}`,
        id,
        JSON.stringify({ id, ...meta, cover: "" })
      )
      .catch(() => undefined);
    return meta;
  } catch {
    return { title: `Canción ${id}`, artist: "" };
  }
}

/**
 * Trae en una sola operación (una petición del navegador) la lista de
 * invitados y el ranking de canciones de la invitación indicada.
 */
export async function getInvitationExportData(
  slug: string
): Promise<InvitationExportData | null> {
  const invitation = getInvitation(slug);
  if (!invitation) return null;

  const redis = getRedis();
  const [rawRsvp, ranked, metaMap] = await Promise.all([
    redis.lrange<unknown[]>(`rsvp:${slug}`, 0, -1),
    redis.zrange<string[]>(`songs:${slug}`, 0, -1, { rev: true, withScores: true }),
    redis.hgetall<Record<string, string>>(`songmeta:${slug}`),
  ]);

  const allGuests = parseRsvp(rawRsvp ?? []);
  const guests = dedupeGuests(allGuests);

  const songs: SongRow[] = [];
  const entries: { id: string; score: number; rawMeta?: string }[] = [];
  for (let i = 0; i < (ranked?.length ?? 0); i += 2) {
    const id = ranked[i];
    const score = Number(ranked[i + 1]);
    if (!id || !Number.isFinite(score)) continue;
    entries.push({ id: String(id), score, rawMeta: metaMap?.[id] });
  }

  // Resuelve metadatos en paralelo; solo consulta Deezer si faltan.
  const resolved = await Promise.all(
    entries.map(async (entry) => {
      const meta = await resolveSongMeta(
        redis,
        slug,
        entry.id,
        entry.rawMeta
      );
      return { id: entry.id, score: entry.score, ...meta };
    })
  );

  for (const song of resolved) {
    songs.push({
      id: song.id,
      title: song.title,
      artist: song.artist,
      score: song.score,
    });
  }
  songs.sort((a, b) => b.score - a.score || collator.compare(a.title, b.title));

  return {
    invitation,
    guests,
    songs,
    duplicatesRemoved: allGuests.length - guests.length,
  };
}
