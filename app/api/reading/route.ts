export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

type Reading = { title: string; author?: string } | null;

const get = (s: string, re: RegExp) => re.exec(s)?.[1]?.trim() ?? "";
const first = <T>(xs: T[]) => (xs.length ? xs[0] : null);

function fromTitleGuess(title: string) {
  const m = title.match(/^(.*?)\s+by\s+(.+)$/i);
  if (m) return { title: m[1], author: m[2] };
  return { title };
}

export async function GET() {
  const uid = process.env.GOODREADS_USER_ID?.trim();
  if (!uid) return NextResponse.json({ reading: null });

  const urls = [
    `https://www.goodreads.com/review/list_rss/${uid}?shelf=currently-reading&per_page=10&sort=date_updated&order=d`,
    `https://www.goodreads.com/review/list_rss/${uid}?shelf=currently-reading`,
    `https://www.goodreads.com/review/list_rss/${uid}`,
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        cache: "no-store",
        headers: { "User-Agent": "ademcan.dev (+https://ademcan.dev)" },
      });
      if (!res.ok) continue;

      const xml = await res.text();

      {
        const items = xml.match(/<item>[\s\S]*?<\/item>/gi) ?? [];
        const item =
          items.find((it) =>
            get(
              it,
              /<user_shelves>(?:<!\[CDATA\[)?([\s\S]*?)(?:]]>)?<\/user_shelves>/i
            )
              .toLowerCase()
              .includes("currently-reading")
          ) ?? first(items);

        if (item) {
          const bookTitle =
            get(
              item,
              /<book_title>(?:<!\[CDATA\[)?([\s\S]*?)(?:]]>)?<\/book_title>/i
            ) ||
            get(item, /<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:]]>)?<\/title>/i);
          const author =
            get(
              item,
              /<author_name>(?:<!\[CDATA\[)?([\s\S]*?)(?:]]>)?<\/author_name>/i
            ) || "";

          if (bookTitle) {
            const reading = author
              ? { title: bookTitle, author }
              : fromTitleGuess(bookTitle);
            return NextResponse.json(
              { reading },
              {
                headers: {
                  "Cache-Control": "s-maxage=900, stale-while-revalidate=3600",
                },
              }
            );
          }
        }
      }

      {
        const chunks =
          xml.match(/<item>[\s\S]*?<\/item>/gi) ??
          xml.split(/(?=https:\/\/www\.goodreads\.com\/review\/show\/\d+)/g);

        const pick =
          chunks.find((c) => /shelves:\s*currently-reading/i.test(c)) ??
          first(chunks);

        if (pick) {
          const titleHtml = get(
            pick,
            /<a[^>]*href="https:\/\/www\.goodreads\.com\/review\/show\/\d+"[^>]*>(.*?)<\/a>/i
          );
          const author =
            get(pick, /author:\s*([^<\n\r]+)<br\s*\/?>/i) ||
            get(
              pick,
              /author_name>(?:<!\[CDATA\[)?([\s\S]*?)(?:]]>)?<\/author_name>/i
            );

          if (titleHtml) {
            const textTitle = titleHtml.replace(/<[^>]+>/g, "").trim();
            const reading = author
              ? { title: textTitle, author }
              : fromTitleGuess(textTitle);

            return NextResponse.json(
              { reading },
              {
                headers: {
                  "Cache-Control": "s-maxage=900, stale-while-revalidate=3600",
                },
              }
            );
          }
        }
      }
    } catch {}
  }

  return NextResponse.json({ reading: null });
}