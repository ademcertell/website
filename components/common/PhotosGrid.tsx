"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

const TABS = [
  { key: "real", label: "Real life" },
  { key: "game", label: "In-game" },
] as const;
type TabKey = (typeof TABS)[number]["key"];

export default function PhotosGrid() {
  const [items, setItems] = useState<Item[]>([]);
  const [nextPage, setNextPage] = useState<number | null>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const seenIds = useRef<Set<string>>(new Set());

  const [tab, setTab] = useState<TabKey>("real"); // varsayılan: real
  const [gameFilter, setGameFilter] = useState<string | null>(null);

  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    seenIds.current.clear();
    setItems([]);
    setNextPage(1);
    setGameFilter(null);
    void load(1, tab);
  }, [tab]);

  useEffect(() => {
    if (items.length === 0) void load(1, tab);
  }, []);

  async function load(p: number | null, which: TabKey = tab) {
    if (!p || loading) return;
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(
        `/api/photos?page=${p}&per_page=24&source=${which}`,
        { cache: "no-store" }
      );
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
  const games = useMemo(() => {
    if (tab !== "game") return [];
    const s = new Set(items.filter((p) => p.game).map((p) => p.game as string));
    return Array.from(s).sort();
  }, [items, tab]);

  const filtered = useMemo(() => {
    let arr = items;
    if (tab === "game" && gameFilter)
      arr = arr.filter((p) => p.game === gameFilter);
    return arr;
  }, [items, tab, gameFilter]);
  const openAt = (i: number) => {
    setIdx(i);
    setOpen(true);
    document.documentElement.style.overflow = "hidden";
  };
  const close = () => {
    setOpen(false);
    document.documentElement.style.overflow = "";
  };
  const prev = () => setIdx((i) => (i - 1 + filtered.length) % filtered.length);
  const next = () => setIdx((i) => (i + 1) % filtered.length);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered.length]);

  useEffect(() => {
    if (!open || filtered.length === 0) return;
    const nextIdx = (idx + 1) % filtered.length;
    const prevIdx = (idx - 1 + filtered.length) % filtered.length;
    [nextIdx, prevIdx].forEach((i) => {
      const img = new Image();
      img.src = filtered[i]?.urlRegular || "";
    });
  }, [open, idx, filtered]);

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={[
              "px-3 py-1.5 rounded-full text-sm transition",
              tab === t.key
                ? "bg-white/10 text-white shadow"
                : "bg-white/5 text-white/70 hover:bg-white/10",
            ].join(" ")}
          >
            {t.label}
          </button>
        ))}
        {tab === "game" && games.length > 0 && (
          <div className="ml-2 flex flex-wrap items-center gap-2 pl-3 border-l border-white/10">
            <span className="text-xs text-white/50">Games:</span>
            <button
              className={`px-2 py-1 rounded-full text-xs ${
                gameFilter === null
                  ? "bg-white/10"
                  : "bg-white/5 hover:bg-white/10"
              }`}
              onClick={() => setGameFilter(null)}
            >
              All
            </button>
            {games.map((g) => (
              <button
                key={g}
                onClick={() => setGameFilter((prev) => (prev === g ? null : g))}
                className={`px-2 py-1 rounded-full text-xs ${
                  gameFilter === g
                    ? "bg-white/10"
                    : "bg-white/5 hover:bg-white/10"
                }`}
                title={g}
              >
                {g}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        {filtered.map((p, i) => (
          <figure
            key={p.id}
            className="relative mb-5 break-inside-avoid overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10"
          >
            <button
              type="button"
              onClick={() => openAt(i)}
              className="group block w-full text-left"
              aria-label="Open photo"
            >
              <img
                src={p.urlRegular}
                alt={p.alt || "photo"}
                className="w-full object-cover transition duration-300 ease-out group-hover:scale-[1.02] group-hover:opacity-95"
                loading="lazy"
              />
            </button>
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
        ) : filtered.length ? (
          <p className="text-xs text-muted-foreground">
            {error ? error : "That’s all ✨"}
          </p>
        ) : null}
      </div>
      {open && filtered[idx] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <figure className="relative max-h-[90vh] w-full max-w-6xl">
              <img
                src={filtered[idx].urlRegular}
                alt={filtered[idx].alt || "photo"}
                className="mx-auto max-h-[90vh] w-auto rounded-lg shadow-2xl"
              />
              <button
                onClick={close}
                className="absolute right-2 top-2 rounded-full bg-black/60 px-3 py-1 text-sm hover:bg-black/80"
                aria-label="Close"
              >
                ✕
              </button>
              <button
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r-lg bg-black/50 px-3 py-2 text-xl hover:bg-black/70"
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 rounded-l-lg bg-black/50 px-3 py-2 text-xl hover:bg-black/70"
                aria-label="Next"
              >
                ›
              </button>
              <figcaption className="mt-3 flex items-center justify-between text-sm text-white/85">
                <div className="truncate">
                  {filtered[idx].source === "game" ? (
                    <>
                      🎮{" "}
                      <span className="font-medium">
                        {filtered[idx].game ?? "In-game"}
                      </span>
                    </>
                  ) : filtered[idx].location ? (
                    <>
                      📍{" "}
                      <span className="font-medium">
                        {filtered[idx].location}
                      </span>
                    </>
                  ) : (
                    <>
                      📷{" "}
                      <span className="font-medium">
                        {filtered[idx].author?.name}
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={filtered[idx].urlRegular}
                    download
                    className="rounded-md bg-white/10 px-3 py-1 hover:bg-white/20"
                  >
                    Download
                  </a>
                  <a
                    href={filtered[idx].pageUrl}
                    target="_blank"
                    className="rounded-md bg-white/10 px-3 py-1 hover:bg-white/20"
                  >
                    Open original
                  </a>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      )}
    </section>
  );
}