"use client";

import { useEffect, useState } from "react";

type Counters = { views: number; likes: number };

export default function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let live = true;

    const key = `viewed:${slug}`;
    const already = sessionStorage.getItem(key) === "1";

    (async () => {
      if (!already) {
        await fetch(`/api/metrics/${slug}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "views" }),
        });
        sessionStorage.setItem(key, "1");
      }
      const r = await fetch(`/api/metrics/${slug}`, { cache: "no-store" });
      const j = (await r.json()) as Counters;
      if (!live) return;
      setViews(j.views);
    })();

    return () => {
      live = false;
    };
  }, [slug]);

  return (
    <span className="text-xs text-muted-foreground">
      {views === null ? "…" : `${views.toLocaleString()} views`}
    </span>
  );
}
