import { getPostsByType } from "@/lib/getBlogPosts";

function RatingBadge({ rating = 0 }: { rating?: number }) {
  const color =
    rating >= 8 ? "text-emerald-300 border-emerald-500/20 bg-emerald-500/10"
  : rating >= 6 ? "text-amber-300 border-amber-500/20 bg-amber-500/10"
                : "text-rose-300 border-rose-500/20 bg-rose-500/10";

  return (
    <span className={`rounded-full border px-2 py-0.5 text-[11px] ${color}`}>
      {rating.toFixed(1)}/10
    </span>
  );
}

export default async function ReviewTeasers({ limit = 4 }: { limit?: number }) {
  const reviews = getPostsByType("review").slice(0, limit);

  if (!reviews.length) {
    return <p className="text-sm text-muted-foreground">No reviews yet. Coming soon.. ✨</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {reviews.map((r) => (
        <li key={r.slug} className="rounded-2xl border border-white/10 bg-card/60 p-4 transition hover:-translate-y-[1px] hover:border-white/20">
          <a href={`/reviews/${r.slug}`} className="group block">
            <div className="flex items-center gap-2">
              <RatingBadge rating={r.metadata.rating} />
              <h3 className="font-medium text-foreground group-hover:underline">
                {r.metadata.title}
              </h3>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {new Date(r.metadata.date).toLocaleDateString()} • {r.metadata.game?.title} • {r.metadata.game?.platform}
            </p>
          </a>
        </li>
      ))}
    </ul>
  );
}
