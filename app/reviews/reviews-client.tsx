"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { BlogPost } from "@/lib/getBlogPosts";

function RatingBadge({ rating = 0 }: { rating?: number }) {
  const color =
    rating >= 8
      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/20"
      : rating >= 6
      ? "bg-amber-500/20 text-amber-300 border-amber-500/20"
      : "bg-rose-500/20 text-rose-300 border-rose-500/20";
  return (
    <span
      className={`rounded-full border px-3 py-1 text-[12px] font-medium ${color}`}
    >
      {rating.toFixed(1)}/10
    </span>
  );
}

export default function ReviewsClient({ reviews }: { reviews: BlogPost[] }) {
  const allTags = Array.from(
    new Set(reviews.flatMap((r) => r.metadata.tags ?? []))
  );
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredReviews = selectedTag
    ? reviews.filter((r) => r.metadata.tags?.includes(selectedTag))
    : reviews;

  return (
    <>
      <div className="flex flex-wrap gap-3 mt-6">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-4 py-1.5 rounded-full text-sm border backdrop-blur-sm transition-all ${
            selectedTag === null
              ? "bg-white/15 border-white/20 text-white"
              : "hover:bg-white/5 border-white/10 text-white/70"
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-1.5 rounded-full text-sm border backdrop-blur-sm transition-all ${
              selectedTag === tag
                ? "bg-white/15 border-white/20 text-white"
                : "hover:bg-white/5 border-white/10 text-white/70"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-2">
        {filteredReviews.map((r) => (
          <Link
            key={r.slug}
            href={`/reviews/${r.slug}`}
            className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition-all shadow-md hover:shadow-2xl flex flex-col max-w-3xl mx-auto"
          >
            {r.metadata.cover && (
              <div className="relative aspect-[2/1] w-full overflow-hidden">
                <Image
                  src={r.metadata.cover}
                  alt={r.metadata.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent" />
                <h3 className="absolute bottom-3 left-4 text-xl font-semibold text-white drop-shadow">
                  {r.metadata.title}
                </h3>
              </div>
            )}
            <div className="flex flex-col flex-1 p-6">
              {r.metadata.rating && <RatingBadge rating={r.metadata.rating} />}

              <p className="mt-3 text-sm text-foreground/70 line-clamp-2 flex-1">
                {r.metadata.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {r.metadata.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="mt-4 text-sm text-blue-400 group-hover:translate-x-1 transition-transform">
                Hemen oku →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}