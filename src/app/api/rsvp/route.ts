import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getRedis } from "@/lib/redis";

const rsvpSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1).max(120),
  attending: z.boolean(),
  guests: z.number().int().min(0).max(20).default(0),
  isPublic: z.boolean().default(false),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = rsvpSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { slug, ...entry } = parsed.data;
  const redis = getRedis();
  const record = { ...entry, createdAt: new Date().toISOString() };
  await redis.lpush(`rsvp:${slug}`, JSON.stringify(record));

  return NextResponse.json({ ok: true });
}

// GET /api/rsvp?slug=demo-quince -> solo las confirmaciones marcadas como públicas
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "Falta slug" }, { status: 400 });
  }

  const redis = getRedis();
  const raw = await redis.lrange(`rsvp:${slug}`, 0, -1);
  const entries = raw
    .map((r) => {
      try {
        return typeof r === "string" ? JSON.parse(r) : r;
      } catch {
        return null;
      }
    })
    .filter((e) => e && e.isPublic);

  return NextResponse.json({ entries });
}
