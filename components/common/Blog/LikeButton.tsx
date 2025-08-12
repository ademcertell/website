"use client";

import { useEffect, useState } from "react";

type Counters = { views: number; likes: number };

export default function LikeButton({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null);
  const [pending, setPending] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    let live = true;
    (async () => {
      const r = await fetch(`/api/metrics/${slug}`, { cache: "no-store" });
      const j = (await r.json()) as Counters;
      if (!live) return;
      setCount(j.likes);
      setLiked(localStorage.getItem(`liked:${slug}`) === "1");
    })();
    return () => {
      live = false;
    };
  }, [slug]);

  async function handleLike() {
    if (liked || pending) return;
    setPending(true);
    try {
      const r = await fetch(`/api/metrics/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "likes" }),
      });
      const j = (await r.json()) as Counters;
      setCount(j.likes);
      setLiked(true);
      localStorage.setItem(`liked:${slug}`, "1");
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={liked || pending}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition
      ${
        liked
          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
          : "border-white/10 bg-white/5 hover:bg-white/10"
      }`}
      aria-pressed={liked}
    >
      <span>❤️</span>
      <span>{liked ? "Liked" : "Like"}</span>
      <span className="opacity-70">· {count ?? "…"}</span>
    </button>
  );
}