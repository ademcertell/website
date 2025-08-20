import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

type Playing = { title: string } | null;
type Reading = { title: string; author?: string } | null;

function cleanText(s: string) {
  return s
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

async function getPlaying(): Promise<Playing> {
  const db = await getDb();
  const col = db.collection<any>("playlog");

  const currentDoc = await col
    .find({ current: true })
    .sort({ updatedAt: -1, _id: -1 })
    .limit(1)
    .next();

  const doc =
    currentDoc ??
    (await col.find({}).sort({ updatedAt: -1, _id: -1 }).limit(1).next());

  const title = typeof doc?.title === "string" ? doc.title.trim() : "";
  return title ? { title } : null;
}

async function getReading(): Promise<Reading> {
  const rss = process.env.GOODREADS_RSS_URL;
  if (!rss) return null;

  try {
    const r = await fetch(rss, { next: { revalidate: 300 } });
    if (!r.ok) return null;
    const xml = await r.text();

    const item = xml.match(/<item>([\s\S]*?)<\/item>/i)?.[1];
    if (!item) return null;

    let title = item.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "";
    const author = item.match(/<author_name>([\s\S]*?)<\/author_name>/i)?.[1];

    title = cleanText(title).replace(/^currently[- ]reading:\s*/i, "");
    const t = title.trim();
    if (!t) return null;

    const a = author ? cleanText(author) : undefined;
    return a ? { title: t, author: a } : { title: t };
  } catch {
    return null;
  }
}

export async function GET() {
  const [playing, reading] = await Promise.all([getPlaying(), getReading()]);
  return NextResponse.json({ playing, reading }, { status: 200 });
}