"use client";

import { useEffect, useRef, useState } from "react";

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
type ApiResp = { items: Item[]; nextPage: number | null; error?: string };

export default function PhotosGrid() {
  const [items, setItems] = useState<Item[]>([]);
  const [nextPage, setNextPage] = useState<number | null>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const seenIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (items.length === 0) void load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load(p: number | null) {
    if (!p || loading) return;
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`/api/photos?page=${p}&per_page=24`, {
        cache: "no-store",
      });
      const j: ApiResp = await r.json();

      if (!Array.isArray(j.items)) {
        setError(j?.error || "Failed to load photos");
        return;
      }

      const fresh = j.items.filter((it) => {
        if (seenIds.current.has(it.id)) return false;
        seenIds.current.add(it.id);
        return true;
      });

      if (fresh.length) setItems((prev) => [...prev, ...fresh]);
      setNextPage(j.nextPage);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  if (error && items.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-rose-300">
        {error}
      </div>
    );
  }

  return (
    <section>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        {items.map((p) => (
          <figure
            key={p.id}
            className="relative mb-5 break-inside-avoid overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10"
          >
            <a
              href={p.pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <img
                src={p.urlRegular}
                alt={p.alt || "photo"}
                className="w-full object-cover transition duration-300 ease-out group-hover:scale-[1.02] group-hover:opacity-95"
                loading="lazy"
              />
              {/*  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
                <div className="flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-12 text-xs">
                  <div className="truncate text-white/90">
                    <span className="mr-2 align-middle">💗 {p.likes}</span>
                    <span className="opacity-80">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="truncate text-right text-white/80">
                    <span className="opacity-70">by </span>
                    <span className="font-medium">{p.author.name}</span>
                  </div>
                </div>
              </figcaption>*/}
            </a>
          </figure>
        ))}
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`sk-${i}`}
              className="mb-5 h-[320px] break-inside-avoid animate-pulse rounded-2xl border border-white/10 bg-white/5"
            />
          ))}
      </div>
      <div className="mt-8 flex justify-center">
        {nextPage ? (
          <button
            onClick={() => load(nextPage)}
            disabled={loading}
            className="rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium tracking-wide hover:border-white/25 disabled:opacity-60"
          >
            {loading ? "Loading…" : "Load more photos"}
          </button>
        ) : items.length ? (
          <p className="text-xs text-muted-foreground">
            {error ? error : "That’s all ✨"}
          </p>
        ) : null}
      </div>
    </section>
  );
}
