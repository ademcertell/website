"use client";

import { useEffect, useState, useCallback } from "react";
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

  const load = useCallback(async () => {
    try {
      const r = await fetch("/api/steam/now-playing", { cache: "no-store" });
      const j = (await r.json()) as Resp;
      setData(j);
    } catch {
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
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let alive = true;
    if (alive) void load();

    const id = setInterval(() => {
      if (alive) void load();
    }, 30_000);

    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [load]);

  if (loading) {
    return (
      <section className="mt-2">
        <ActivitySkeleton />
      </section>
    );
  }

  const subtitle =
    data?.gameName ?? "No current activity (or Steam unreachable).";

  return (
    <section className="mt-2">
      <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] supports-[backdrop-filter]:backdrop-blur-md">
        {data?.headerImage && (
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.headerImage}
              alt={subtitle}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          </div>
        )}
        <div className="p-5 md:p-6">
          <div className="mb-2 flex items-center gap-2">
            <ActivityStatus label={data?.status?.label ?? "Unknown"} />
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-muted-foreground">
              {data?.inGame
                ? "Now playing"
                : data?.fallback
                ? "Last played"
                : "Activity"}
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight mt-5">
            🎮 {subtitle}
          </h3>
          {data?.error && (
            <p className="mt-4 text-xs text-rose-300/80">
              Steam error — try again later.
            </p>
          )}
        </div>
      </article>
    </section>
  );
}