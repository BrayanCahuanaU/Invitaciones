import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getRedis } from "@/lib/redis";
import { getInvitation } from "@/content/registry";

const rsvpSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1).max(120),
  attending: z.boolean(),
  guests: z.number().int().min(0).max(20).default(0),
  isPublic: z.boolean().default(false),
});

const LUCIANA_SLUG = "luciana-xv";
const LUCIANA_CAPACITY = 150;
const addLucianaRsvpScript = `
  local entries = redis.call('LRANGE', KEYS[1], 0, -1)
  local attendingCount = 0
  for _, entry in ipairs(entries) do
    local ok, decoded = pcall(cjson.decode, entry)
    if ok and type(decoded) == 'table' and decoded.attending == true then
      attendingCount = attendingCount + 1
    end
  end
  if attendingCount >= tonumber(ARGV[2]) then
    return 0
  end
  redis.call('LPUSH', KEYS[1], ARGV[1])
  if ARGV[3] == 'true' then
    attendingCount = attendingCount + 1
  end
  if attendingCount >= tonumber(ARGV[2]) then
    return 2
  end
  return 1
`;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = rsvpSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { slug, ...entry } = parsed.data;
  const invitation = getInvitation(slug);
  if (invitation?.rsvp.status === "full" || invitation?.rsvp.status === "closed") {
    return NextResponse.json(
      { error: "Aforo lleno. Ya no se aceptan más confirmaciones." },
      { status: 403 }
    );
  }
  if (slug === LUCIANA_SLUG && entry.guests > 0) {
    return NextResponse.json(
      { error: "Esta invitación no admite acompañantes." },
      { status: 400 }
    );
  }

  try {
    const redis = getRedis();
    const record = { ...entry, createdAt: new Date().toISOString() };
    if (slug === LUCIANA_SLUG) {
      const result = await redis.eval<number>(
        addLucianaRsvpScript,
        [`rsvp:${slug}`],
        [JSON.stringify(record), String(LUCIANA_CAPACITY), String(entry.attending)]
      );
      if (result === 0) {
        return NextResponse.json(
          { code: "FULL", error: "La lista está llena. Ya no se aceptan más confirmaciones." },
          { status: 409 }
        );
      }
      return NextResponse.json({ ok: true, isFull: result === 2 });
    }

    await redis.lpush(`rsvp:${slug}`, JSON.stringify(record));
  } catch (err) {
    console.error("[rsvp POST]", err);
    return NextResponse.json(
      { error: "Error interno al guardar la confirmación." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

// GET /api/rsvp?slug=demo-quince -> solo las confirmaciones marcadas como públicas
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "Falta slug" }, { status: 400 });
  }

  try {
    const redis = getRedis();
    const raw = await redis.lrange(`rsvp:${slug}`, 0, -1);
    const parsedEntries = raw
      .map((record) => {
        try {
          return typeof record === "string" ? JSON.parse(record) : record;
        } catch {
          return null;
        }
      });
    const isFull =
      slug === LUCIANA_SLUG &&
      parsedEntries.filter((entry) => entry?.attending === true).length >=
        LUCIANA_CAPACITY;
    const entries = parsedEntries.filter((entry) => entry && entry.isPublic);

    return NextResponse.json({ entries, isFull });
  } catch (err) {
    console.error("[rsvp GET]", err);
    return NextResponse.json(
      { error: "Error interno al leer las confirmaciones.", entries: [] },
      { status: 500 }
    );
  }
}
