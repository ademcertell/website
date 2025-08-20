"use client";

import { useEffect, useState } from "react";
import ActivityStatus from "./ActivityStatus";
import ActivitySkeleton from "./ActivitySkeleton";

type Resp = {
  inGame: boolean;
  status?: { label: string; emoji: string };
  gameName: string | null;
  appId: string | number | null;
  headerImage: string | null;
  storeUrl: string | null;
  steamProfileUrl: string | null;
  avatar: string | null;
  fallback?: "recent" | "owned" | null;
  error?: string;
};

export default function Activity() {
  const [data, setData] = useState<Resp | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    const load = async () => {
      try {
        const r = await fetch("/api/steam/now-playing", { cache: "no-store" });
        const j = (await r.json()) as Resp;
        if (!alive) return;
        setData(j);
      } catch {
        if (!alive) return;
        setData({
          inGame: false,
          gameName: null,
          appId: null,
          headerImage: null,
          storeUrl: null,
          steamProfileUrl: null,
          avatar: null,
          error: "fetch-failed",
        });
      } finally {
        if (alive) setLoading(false);
      }
    };

    load();
    const id = setInterval(load, 30_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const subtitle =
    data?.gameName ??
    (loading ? "Loading…" : "Steam verisi alınamadı ya da hiç oyun yok.");

  // SKELETON
  if (loading) {
    return (
      <section className="mt-12">
        <ActivitySkeleton />
      </section>
    );
  }

  return (
    <section className="mt-12">
      <div className="group relative overflow-hidden rounded-md border border-white/10 bg-card/60">
        {data?.headerImage ? (
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            <img
              src={data.headerImage}
              alt={subtitle ?? ""}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
          </div>
        ) : null}

        <div className="p-6">
          <div className="mb-2 flex items-center gap-2">
            <ActivityStatus label={data?.status?.label ?? "Unknown"} />
            <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-muted-foreground">
              {data?.inGame
                ? "Now Playing"
                : data?.fallback
                ? "Last played"
                : "Activity"}
            </p>
          </div>

          <h3 className="text-xl md:text-2xl mt-5 font-semibold tracking-tight text-foreground">
            🎮 {subtitle}
          </h3>

          {data?.error && (
            <p className="mt-2 text-xs text-rose-300/80">
              Steam’e ulaşılamadı. Lütfen tekrar deneyin.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}