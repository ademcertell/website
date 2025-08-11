import Link from "next/link";
import { getBlogPosts } from "@/lib/getBlogPosts";

type P = Awaited<ReturnType<typeof getBlogPosts>>[number];

function formatDate(date?: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function pickLatest(posts: P[], predicate: (p: P) => boolean) {
  return posts
    .filter(predicate)
    .sort(
      (a, b) =>
        new Date(b.metadata.date).getTime() -
        new Date(a.metadata.date).getTime()
    )[0];
}

function Card({
  href,
  eyebrow,
  title,
  desc,
  date,
}: {
  href: string;
  eyebrow: string;
  title: string;
  desc?: string;
  date?: string;
}) {
  return (
      <Link
        href={href}
        className="group block overflow-hidden rounded-2xl border border-white/10 bg-card/60 hover:border-white/20"
      >
        <div className="p-5 md:p-6">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">
            <span className="font-semibold text-primary">{eyebrow}</span>
            {date ? <span className="ml-2 opacity-70">{date}</span> : null}
          </p>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">
            {title}
          </h3>
          {desc ? (
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {desc}
            </p>
          ) : null}
        </div>
      </Link>
  );
}

export default function HomeBlogCards() {
  const all = getBlogPosts();

  const latestPost = pickLatest(
    all,
    (p) => (p.metadata as any)?.type !== "review"
  );
  const latestReview = pickLatest(
    all,
    (p) => (p.metadata as any)?.type === "review"
  );

  if (!latestPost && !latestReview) return null;

  return (
    <section className="mt-12 grid gap-6 md:grid-cols-2">
      {latestPost ? (
        <Card
          href={`/blog/${latestPost.slug}`}
          eyebrow="Latest Post"
          title={latestPost.metadata.title}
          desc={latestPost.metadata.description}
          date={formatDate(latestPost.metadata.date)}
        />
      ) : null}

      {latestReview ? (
        <Card
          href={`/reviews/${latestReview.slug}`}
          eyebrow="Latest Review"
          title={latestReview.metadata.title}
          desc={latestReview.metadata.description}
          date={formatDate(latestReview.metadata.date)}
        />
      ) : null}
    </section>
  );
}
