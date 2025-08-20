"use client";

import LikeButton from "./Notes/LikeButton";
import ViewCounter from "./Notes/ViewCounter";

export default function EngagementBar({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copied.");
      }
    } catch {}
  };

  return (
    <div className="mt-10 flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-card/60 p-3">
      <LikeButton slug={slug} />
      <ViewCounter slug={slug} />
      <button
        onClick={share}
        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs hover:bg-white/10"
      >
        Share
      </button>
    </div>
  );
}