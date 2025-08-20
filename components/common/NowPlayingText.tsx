"use client";

import { useEffect, useState } from "react";

type SteamNow = {
  inGame: boolean;
  gameName: string | null;
  fallback?: "recent" | "owned" | null;
};

export default function NowPlayingText({
  emptyLabel = "not playing",
  prefix = "🎮 Currently playing:",
}: {
  emptyLabel?: string;
  prefix?: string;
}) {
  const [data, setData] = useState<SteamNow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let live = true;

    const load = async () => {
      try {
        const r = await fetch("/api/steam/now-playing", { cache: "no-store" });
        const j = (await r.json()) as SteamNow | { error: string };
        if (!live) return;
        if ("inGame" in j) setData(j as SteamNow);
        else setData(null);
      } catch {
        if (live) setData(null);
      } finally {
        if (live) setLoading(false);
      }
    };

    load();
    const id = setInterval(load, 60_000);
    return () => {
      live = false;
      clearInterval(id);
    };
  }, []);

  let text = emptyLabel;
  if (!loading && data) {
    if (data.inGame && data.gameName) {
      text = data.gameName;
    } else if (data.gameName) {
    }
  }

  return (
    <span className="text-xs text-muted-foreground">
      {prefix} <em>{loading ? " — " : text}</em>
    </span>
  );
}
