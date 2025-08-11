import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

const BASE = "https://backloggd.com";
const UA = "ademcan.dev (single summary)";
const clean = (s?: string) => (s ?? "").replace(/\s+/g, " ").trim();

async function fetchHtml(url: string) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": UA,
      "Accept": "text/html,*/*",
      "Accept-Language": "en-US,en;q=0.9,tr;q=0.8",
      "Referer": BASE,
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`fetch ${res.status}`);
  return res.text();
}

/** /u/<user>/journal Finished data */
async function parseFinished(username: string, year: string, limit: number) {
  const urls = [
    `${BASE}/u/${username}/journal/dates/year:${year}/`,
    `${BASE}/u/${username}/journal/?year=${year}&session=Finished`,
  ];

  for (const url of urls) {
    try {
      const html = await fetchHtml(url);
      const $ = cheerio.load(html);

      if (!/Finished/i.test($.root().text())) continue;

      // /games/<slug>
      const anchors = $('a[href^="/games/"]').filter((_, a) =>
        /^\/games\/[^/]+\/?$/.test($(a).attr("href") || "")
      );

      const items: Array<{ title: string; url: string; date: string | null; platform: string | null }> = [];

      anchors.each((_, a) => {
        const link = $(a);
        const row = link.closest(".log, .journal-item, .entry, .log-row, .row, li, .journal__entry");
        const rowText = row.text();
        if (!/Finished/i.test(rowText)) return;

        let title =
          clean(link.text()) ||
          clean(row.find(".game-title, .title").first().text()) ||
          clean(row.find("img[alt]").attr("alt")) ||
          "";
        if (!title) return;

        const href = link.attr("href")!;
        const url2 = href.startsWith("http") ? href : `${BASE}${href}`;

        const platform =
          clean(
            row.find('a[href*="played_platform:"], .platform, .log-platform, .col-platform').first()
              .text()
          ) || null;

        const time = row.find("time").first();
        const date =
          time.attr("datetime") ||
          clean(time.text()) ||
          clean(row.find(".date, .log-date, .col-date").first().text()) ||
          null;

        items.push({ title, url: url2, date, platform });
      });

      const seen = new Set<string>();
      const uniq = items.filter((x) => {
        const key = `${x.title}_${x.platform ?? ""}_${x.date ?? ""}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      if (uniq.length) {
        return { mode: "finished" as const, source: url, items: uniq.slice(0, limit) };
      }
    } catch {
    }
  }

  return { mode: "finished" as const, source: urls, items: [] as any[] };
}

/** /u/<user>/games/played/ -  years */
async function parsePlayed(username: string, limit: number) {
  const url = `${BASE}/u/${username}/games/played/`;
  const html = await fetchHtml(url);
  const $ = cheerio.load(html);

  const items: Array<{ title: string; url: string; cover: string | null }> = [];

  $('[class*="game"], .game-card, .game, .game-item')
    .has('a[href^="/games/"]')
    .each((_, el) => {
      const a = $(el)
        .find('a[href^="/games/"]')
        .filter((_, x) => /^\/games\/[^/]+\/?$/.test($(x).attr("href") || ""))
        .first();

      const href = a.attr("href");
      if (!href) return;

      const title =
        clean($(el).find("img[alt]").attr("alt")) ||
        clean(a.text()) ||
        clean($(el).find(".title, .game-title").first().text()) ||
        "";
      if (!title) return;

      const url2 = href.startsWith("http") ? href : `${BASE}${href}`;
      const cover =
        $(el).find("img").attr("src") ||
        $(el).find("img").attr("data-src") ||
        null;

      items.push({ title, url: url2, cover });
    });

  return { mode: "played" as const, source: url, items: items.slice(0, limit) };
}

async function parseInspect(username: string) {
  const url = `${BASE}/u/${username}/games/played/`;
  const html = await fetchHtml(url);
  const $ = cheerio.load(html);

  const anchors: { href: string; text: string; alt?: string }[] = [];
  $('a[href^="/games/"]').each((_, a) => {
    const href = $(a).attr("href") || "";
    if (!/^\/games\/[^/]+\/?$/.test(href)) return;
    anchors.push({ href, text: clean($(a).text()), alt: $(a).find("img[alt]").attr("alt") });
  });

  return {
    url,
    totalGameLinks: anchors.length,
    sample: anchors.slice(0, 12),
    htmlLength: html.length,
  };
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const username = process.env.BACKLOGGD_USERNAME;
    if (!username) return NextResponse.json({ error: "Missing BACKLOGGD_USERNAME" }, { status: 500 });

    const view = searchParams.get("view") ?? "auto"; // auto | finished | played | inspect
    const year = searchParams.get("year") ?? String(new Date().getFullYear());
    const limit = Number(searchParams.get("limit") ?? 12);

    if (view === "inspect") {
      const out = await parseInspect(username);
      return NextResponse.json(out);
    }

    if (view === "finished") {
      const out = await parseFinished(username, year, limit);
      return NextResponse.json({ mode: out.mode, year, count: out.items.length, items: out.items, source: out.source });
    }

    if (view === "played") {
      const out = await parsePlayed(username, limit);
      return NextResponse.json({ mode: out.mode, year, count: out.items.length, items: out.items, source: out.source });
    }

    const fin = await parseFinished(username, year, limit);
    if (fin.items.length) {
      return NextResponse.json({ mode: fin.mode, year, count: fin.items.length, items: fin.items, source: fin.source });
    }
    const pl = await parsePlayed(username, limit);
    return NextResponse.json({ mode: pl.mode, year, count: pl.items.length, items: pl.items, source: pl.source });
  } catch {
    return NextResponse.json({ error: "parse-error" }, { status: 500 });
  }
}
