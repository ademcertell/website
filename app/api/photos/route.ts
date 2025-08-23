import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type Item = {
  id: string;
  w: number;
  h: number;
  alt: string;
  createdAt: string;
  likes: number;
  urlSmall: string;
  urlRegular: string;
  pageUrl: string;
  author: { name: string; url: string };

  source?: "game" | "real";
  game?: string;
  platform?: string;
  location?: string;
  note?: string;
};

type ApiResp = { items: Item[]; nextPage: number | null; error?: string };

const LOCAL_DIR = path.join(process.cwd(), "public", "game-shots");
const FALLBACK_W = 1200;
const FALLBACK_H = 800;

function humanize(name: string) {
  return name
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}
function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function getLocalList(): Item[] {
  if (!fs.existsSync(LOCAL_DIR)) return [];
  const files = fs
    .readdirSync(LOCAL_DIR)
    .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f));

  const items: Item[] = files.map((file) => {
    const full = path.join(LOCAL_DIR, file);
    const stat = fs.statSync(full);
    const url = `/game-shots/${encodeURIComponent(file)}`;
    return {
      id: `local-${file}`,
      w: FALLBACK_W,
      h: FALLBACK_H,
      alt: humanize(file),
      createdAt: new Date(
        stat.mtimeMs || stat.mtime || Date.now()
      ).toISOString(),
      likes: 0,
      urlSmall: url,
      urlRegular: url,
      pageUrl: url,
      author: {
        name: process.env.SITE_AUTHOR || "Adem Can Certel",
        url: process.env.SITE_URL || "https://ademcan.dev",
      },
      source: "game",
      game: undefined,
      platform: "PC",
    };
  });

  items.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
  return items;
}

async function getUnsplashList(page: number, perPage: number): Promise<Item[]> {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) return [];

  const username = process.env.UNSPLASH_USERNAME;
  const collectionId = process.env.UNSPLASH_COLLECTION_ID;

  let url: URL;
  if (username) {
    url = new URL(`https://api.unsplash.com/users/${username}/photos`);
  } else if (collectionId) {
    url = new URL(
      `https://api.unsplash.com/collections/${collectionId}/photos`
    );
  } else {
    url = new URL("https://api.unsplash.com/photos");
  }
  url.searchParams.set("page", String(page));
  url.searchParams.set("per_page", String(perPage));
  url.searchParams.set("order_by", "latest");

  const r = await fetch(url, {
    headers: { Authorization: `Client-ID ${key}` },
    cache: "no-store",
  });
  if (!r.ok) return [];

  const arr = (await r.json()) as any[];
  const items: Item[] = arr.map((p) => {
    const small = p.urls?.small || p.urls?.regular || p.urls?.full;
    const regular = p.urls?.regular || p.urls?.full || p.urls?.small;

    return {
      id: String(p.id),
      w: Number(p.width || FALLBACK_W),
      h: Number(p.height || FALLBACK_H),
      alt: p.alt_description || p.description || "Untitled",
      createdAt: p.created_at || new Date().toISOString(),
      likes: Number(p.likes || 0),
      urlSmall: small,
      urlRegular: regular,
      pageUrl:
        p.links?.html || p.links?.self || `https://unsplash.com/photos/${p.id}`,
      author: {
        name: p.user?.name || username || "Unsplash",
        url:
          p.user?.links?.html ||
          (username
            ? `https://unsplash.com/@${username}`
            : "https://unsplash.com"),
      },
      source: "real",
      location: p.location?.name || undefined,
      note: p.description || p.alt_description || undefined,
    };
  });

  return items;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = clamp(Number(searchParams.get("page") || 1), 1, 9999);
    const perPage = clamp(Number(searchParams.get("per_page") || 24), 1, 48);
    const source = (searchParams.get("source") || "real") as "real" | "game";

    if (source === "game") {
      const all = getLocalList();
      const start = (page - 1) * perPage;
      const end = start + perPage;
      const slice = all.slice(start, end);
      const nextPage = end < all.length ? page + 1 : null;
      return NextResponse.json({ items: slice, nextPage } satisfies ApiResp);
    } else {
      const items = await getUnsplashList(page, perPage);
      const nextPage = items.length < perPage ? null : page + 1;
      return NextResponse.json({ items, nextPage } satisfies ApiResp);
    }
  } catch (e) {
    return NextResponse.json(
      { items: [], nextPage: null, error: "photos-failed" } satisfies ApiResp,
      { status: 500 }
    );
  }
}