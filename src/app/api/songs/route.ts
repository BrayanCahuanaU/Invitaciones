import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getRedis } from "@/lib/redis";
import { TrackResult } from "./search/route";

const voteSchema = z.object({
  slug: z.string().min(1),
  track: z.object({
    id: z.string(),
    title: z.string(),
    artist: z.string(),
    cover: z.string(),
  }),
});

// Sugerir o votar por una canción: si ya existe, su puntaje sube (ZINCRBY),
// así una canción elegida por varios invitados sube de posición sola.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = voteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { slug, track } = parsed.data;
  const redis = getRedis();

  await redis.zincrby(`songs:${slug}`, 1, track.id);

  return NextResponse.json({ ok: true });
}

// GET /api/songs?slug=demo-quince -> ranking ordenado por puntaje descendente
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "Falta slug" }, { status: 400 });
  }

  const redis = getRedis();
  const ranked = await redis.zrange<string[]>(`songs:${slug}`, 0, -1, {
    rev: true,
    withScores: true,
  });
  const metaMap = (await redis.hgetall<Record<string, string>>(
    `songmeta:${slug}`
  )) ?? {};

  const songs: (TrackResult & { score: number })[] = [];
  for (let i = 0; i < ranked.length; i += 2) {
    const id = ranked[i] as unknown as string;
    const score = Number(ranked[i + 1]);
    const rawMeta = metaMap[id];
    let meta: TrackResult;
    if (rawMeta) {
      try {
        meta = JSON.parse(rawMeta) as TrackResult;
      } catch {
        await redis.hdel(`songmeta:${slug}`, id);
        meta = null as unknown as TrackResult;
      }
    } else {
      meta = null as unknown as TrackResult;
    }

    // Sin metadata (o corrupta): se recupera desde Deezer y se cachea.
    if (!meta) {
      try {
        const res = await fetch(`https://api.deezer.com/track/${encodeURIComponent(id)}`);
        if (!res.ok) continue;
        const t = (await res.json()) as {
          title?: string;
          artist?: { name?: string };
          album?: { cover_medium?: string };
        };
        if (!t.title) continue;
        meta = {
          id,
          title: t.title,
          artist: t.artist?.name ?? "",
          cover: t.album?.cover_medium ?? "",
        };
        await redis.hsetnx(`songmeta:${slug}`, id, JSON.stringify(meta));
      } catch {
        continue;
      }
    }

    songs.push({ ...meta, id, score });
  }

  return NextResponse.json({ songs });
}
