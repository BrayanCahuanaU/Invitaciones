import { NextRequest, NextResponse } from "next/server";

interface WhatsappMeta {
  title: string;
  description: string;
  image: string;
}

function extractMeta(html: string): WhatsappMeta {
  const ogTitle = html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i)
    ?? html.match(/<meta\s+content="([^"]*)"\s+property="og:title"/i);
  const ogDesc = html.match(/<meta\s+property="og:description"\s+content="([^"]*)"/i)
    ?? html.match(/<meta\s+content="([^"]*)"\s+property="og:description"/i);
  const ogImage = html.match(/<meta\s+property="og:image"\s+content="([^"]*)"/i)
    ?? html.match(/<meta\s+content="([^"]*)"\s+property="og:image"/i);

  return {
    title: ogTitle?.[1] ?? "",
    description: ogDesc?.[1] ?? "",
    image: ogImage?.[1] ?? "",
  };
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "Falta url" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        "Accept": "text/html",
        "Accept-Language": "es-PE,es;q=0.9,en;q=0.8",
      },
      redirect: "follow",
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return NextResponse.json({ title: "", description: "", image: "" });
    }

    const html = await res.text();
    const meta = extractMeta(html);
    return NextResponse.json(meta);
  } catch {
    return NextResponse.json({ title: "", description: "", image: "" });
  }
}
