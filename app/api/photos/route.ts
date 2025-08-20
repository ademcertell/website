import { NextResponse } from "next/server";

const BASE = "https://api.unsplash.com";

type UPhoto = {
  id: string;
  width: number;
  height: number;
  alt_description: string | null;
  created_at: string;
  likes: number;
  urls: { small: string; regular: string };
  links: { html: string };
  user: { name: string; links: { html: string } };
};

export async function GET(req: Request) {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  const username = process.env.UNSPLASH_USERNAME;

  if (!key || !username) {
    return NextResponse.json(
      { items: [], nextPage: null, error: "Missing UNSPLASH env" },
      { status: 500 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") ?? 1);
    const perPage = Math.min(Number(searchParams.get("per_page") ?? 12), 30);

    const r = await fetch(
      `${BASE}/users/${encodeURIComponent(
        username
      )}/photos?page=${page}&per_page=${perPage}&order_by=latest`,
      { headers: { Authorization: `Client-ID ${key}` }, cache: "no-store" }
    );

    // Unsplash hata cevabını da items=[] şeklinde sar
    if (!r.ok) {
      const body = await r.text().catch(() => "");
      return NextResponse.json(
        { items: [], nextPage: null, error: `unsplash:${r.status}`, body },
        { status: 500 }
      );
    }

    const data = (await r.json()) as unknown;

    // Beklenmeyen response güvenliği
    if (!Array.isArray(data)) {
      return NextResponse.json(
        { items: [], nextPage: null, error: "unexpected-response" },
        { status: 500 }
      );
    }

    const items = (data as UPhoto[]).map((p) => ({
      id: p.id,
      w: p.width,
      h: p.height,
      alt: p.alt_description ?? "Photo",
      createdAt: p.created_at,
      likes: p.likes,
      urlSmall: p.urls.small,
      urlRegular: p.urls.regular,
      pageUrl: p.links.html,
      author: { name: p.user.name, url: p.user.links.html },
    }));

    const uniq: typeof items = [];
    const seen = new Set<string>();
    for (const it of items) {
      if (seen.has(it.id)) continue;
      seen.add(it.id);
      uniq.push(it);
    }

    const nextPage = uniq.length >= perPage ? page + 1 : null;
    return NextResponse.json(
      { items: uniq, nextPage },
      {
        headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
      }
    );
  } catch {
    return NextResponse.json(
      { items: [], nextPage: null, error: "server-fail" },
      { status: 500 }
    );
  }
}
