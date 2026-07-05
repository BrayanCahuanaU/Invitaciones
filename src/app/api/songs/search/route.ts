import { NextRequest, NextResponse } from "next/server";

export interface TrackResult {
  id: string;
  title: string;
  artist: string;
  cover: string;
}

// Deezer no requiere API key y permite búsquedas server-side sin problema de CORS.
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();
  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const res = await fetch(
    `https://api.deezer.com/search?q=${encodeURIComponent(q)}&limit=8`
  );
  if (!res.ok) {
    return NextResponse.json({ results: [] }, { status: 502 });
  }

  interface DeezerTrack {
    id: number | string;
    title: string;
    artist?: { name?: string };
    album?: { cover_medium?: string };
  }

  const data = await res.json();
  const results: TrackResult[] = ((data.data ?? []) as DeezerTrack[]).map((t) => ({
    id: String(t.id),
    title: t.title,
    artist: t.artist?.name ?? "",
    cover: t.album?.cover_medium ?? "",
  }));

  return NextResponse.json({ results });
}
