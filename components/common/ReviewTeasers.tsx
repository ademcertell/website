import { getPostsByType } from "@/lib/getBlogPosts";
import { Gamepad2 } from "lucide-react";

function RatingBadge({ rating = 0 }: { rating?: number }) {
  const color =
    rating >= 8
      ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_8px_rgba(16,185,129,0.3)]"
      : rating >= 6
      ? "text-amber-400 border-amber-500/30 bg-amber-500/10 shadow-[0_0_8px_rgba(245,158,11,0.25)]"
      : "text-rose-400 border-rose-500/30 bg-rose-500/10 shadow-[0_0_8px_rgba(244,63,94,0.25)]";

  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold tracking-wide ${color}`}
    >
      {rating.toFixed(1)}/10
    </span>
  );
}

export default async function ReviewTeasers({ limit = 4 }: { limit?: number }) {
  const reviews = getPostsByType("review").slice(0, limit);

  if (!reviews.length) {
    return (
      <p className="text-sm text-muted-foreground text-center py-6 italic">
        No reviews yet. Leveling up my backlog… 🎮
      </p>
    );
  }
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {reviews.map((r) => (
        <li
          key={r.slug}
          className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_4px_20px_rgba(255,255,255,0.05)] hover:from-white/[0.06] hover:to-white/[0.03]"
        >
          <a href={`/reviews/${r.slug}`} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <RatingBadge rating={r.metadata.rating} />
              <h3 className="font-bold text-sm sm:text-base text-foreground tracking-wide group-hover:text-white group-hover:drop-shadow-md">
                {r.metadata.title}
              </h3>
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Gamepad2 className="w-3.5 h-3.5 opacity-70" />
              {r.metadata.game?.title} • {r.metadata.game?.platform} •{" "}
              {new Date(r.metadata.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </a>
        </li>
      ))}
    </ul>
  );
}