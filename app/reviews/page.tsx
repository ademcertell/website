import type { Metadata } from "next";
import Container from "@/components/common/container";
import { getPostsByType } from "@/lib/getBlogPosts";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Currently, gaming activity, my completed games, and reviews.",
};

function RatingBadge({ rating = 0 }: { rating?: number }) {
  const color =
    rating >= 8 ? "text-emerald-300 border-emerald-500/20 bg-emerald-500/10" :
    rating >= 6 ? "text-amber-300 border-amber-500/20 bg-amber-500/10" :
                  "text-rose-300 border-rose-500/20 bg-rose-500/10";
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[11px] ${color}`}>
      {rating.toFixed(1)}/10
    </span>
  );
}

export default function ReviewsPage() {
  const reviews = getPostsByType("review");

  return (
    <Container size="large" className="text-foreground container animate-enter">
      <h1 className="text-2xl md:text-3xl font-heading">Game Reviews</h1>
      <p className="text-sm text-muted-foreground mb-6">I write reviews of the games I play and enjoy here.</p>

      <ul className="space-y-4">
        {reviews.map((r) => (
          <li key={r.slug}>
            <a href={`/reviews/${r.slug}`} className="font-xl flex items-center gap-2">
              <RatingBadge rating={r.metadata.rating} />
              <span className="underline underline-offset-2 font-semibold">{r.metadata.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </Container>
  );
}
