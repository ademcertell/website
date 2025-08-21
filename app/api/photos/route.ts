// app/api/photos/route.ts
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
};

const LOCAL_DIR = path.join(process.cwd(), "public", "game-shots");

// Ortak small/regular ölçü defaultları (yerel görseller için)
const FALLBACK_W = 1200;
const FALLBACK_H = 800;

function humanize(name: string) {
  return name
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

function readLocalPhotos(): Item[] {
  if (!fs.existsSync(LOCAL_DIR)) return [];

  const files = fs
    .readdirSync(LOCAL_DIR)
    .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f));

  const items: Item[] = files.map((file) => {
    const full = path.join(LOCAL_DIR, file);
    const stat = fs.statSync(full);
    const url = `/game-shots/${file}`;
    return {
      id: `local-${file}`,
      w: FALLBACK_W,
      h: FALLBACK_H,
      alt: humanize(file),
      createdAt: new Date(stat.mtimeMs || stat.mtime || Date.now()).toISOString(),
      likes: 0,
      urlSmall: url,
      urlRegular: url,
      pageUrl: url, // istersen lightbox/ayrı sayfa yaparsın
      author: {
        name: process.env.SITE_AUTHOR || "Adem Can Certel",
        url: process.env.SITE_URL || "https://ademcan.dev",
      },
    };
  });

  // En yeni dosya en üstte
  items.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
  return items;
}

async function readUnsplashPhotos(): Promise<Item[]> {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  const username = process.env.UNSPLASH_USERNAME;

  if (!key || !username) return [];

  // Kendi fotoğrafların:
  // https://api.unsplash.com/users/{username}/photos
  const resp = await fetch(
    `https://api.unsplash.com/users/${username}/photos?per_page=30&order_by=latest`,
    {
      headers: { Authorization: `Client-ID ${key}` },
      // Not: bu API “kişisel” olduğundan dinamik bırakıyoruz
      // ISR/SWR kullanmak istersen “next: { revalidate: 300 }” ekleyebilirsin
      cache: "no-store",
    }
  );

  if (!resp.ok) return [];

  const arr = await resp.json();

  const items: Item[] = (Array.isArray(arr) ? arr : []).map((p: any) => {
    const small = p.urls?.small || p.urls?.regular || p.urls?.full;
    const regular = p.urls?.regular || p.urls?.full || p.urls?.small;
    const width = Number(p.width || FALLBACK_W);
    const height = Number(p.height || FALLBACK_H);

    return {
      id: String(p.id),
      w: width,
      h: height,
      alt: p.alt_description || p.description || "Untitled",
      createdAt: p.created_at || new Date().toISOString(),
      likes: Number(p.likes || 0),
      urlSmall: small,
      urlRegular: regular,
      pageUrl: p.links?.html || p.links?.self || `https://unsplash.com/photos/${p.id}`,
      author: {
        name: p.user?.name || username,
        url: p.user?.links?.html || `https://unsplash.com/@${username}`,
      },
    };
  });

  // En yeni üste
  items.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
  return items;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const perPage = Math.min(48, Math.max(1, Number(searchParams.get("per_page") || 12)));

    // 1) Yerel “oyun içi” fotoğraflar
    const localItems = readLocalPhotos();

    // 2) Unsplash’teki “kendi hesabın” fotoğraflar
    const unsplashItems = await readUnsplashPhotos();

    // 3) Birleştir + tarihe göre sırala (yeniden)
    const all = [...localItems, ...unsplashItems].sort((a, b) =>
      a.createdAt > b.createdAt ? -1 : 1
    );

    // 4) ID bazlı dublike kırp (ihtiyaten)
    const seen = new Set<string>();
    const unique = all.filter((x) => {
      if (seen.has(x.id)) return false;
      seen.add(x.id);
      return true;
    });

    // 5) Sayfalama
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const slice = unique.slice(start, end);
    const nextPage = end < unique.length ? page + 1 : null;

    return NextResponse.json({ items: slice, nextPage });
  } catch (e) {
    return NextResponse.json({ items: [], nextPage: null, error: "photos-failed" }, { status: 500 });
  }
}
