"use client";

import { useEffect, useState } from "react";

export default function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let live = true;

    const key = `viewed:${slug}`;
    const already = typeof window !== "undefined" && sessionStorage.getItem(key) === "1";

    (async () => {
      try {
        if (!already) {
          await fetch(`/api/metrics/${slug}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "views" }),
          });
          sessionStorage.setItem(key, "1");
        }

        const r = await fetch(`/api/metrics/${slug}`, { cache: "no-store" });
        const j = (await r.json()) as { views?: number };

        if (!live) return;
        setViews(typeof j.views === "number" ? j.views : 0);
      } catch {
        if (!live) return;
        setViews(0);
      }
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
