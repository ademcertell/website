import Link from "next/link";
import { getPostsByType, type BlogPost } from "@/lib/getBlogPosts";

function formatDate(date?: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
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
      className="flex flex-col justify-between rounded-3xl border border-white/10 bg-card/40 p-6 hover:border-white/20 transition-colors"
    >
      <div>
        <div className="mb-1 text-[11px] uppercase tracking-wide font-medium text-primary">
          {eyebrow}
        </div>
        <h3 className="text-lg md:text-xl font-semibold text-foreground">
          {title}
        </h3>
        {desc ? (
          <p className="mt-2 line-clamp-2 text-sm text-foreground/70">{desc}</p>
        ) : null}
      </div>
      {date && <p className="mt-4 text-xs text-foreground/50">{date}</p>}
    </Link>
  );
}
export default function HomeBlogCards() {
  const notes = getPostsByType("note");
  const blogs = getPostsByType("blog");
  const reviews = getPostsByType("review");
  const latestNote: BlogPost | undefined = notes[0];
  const latestBlog: BlogPost | undefined = blogs[0];
  const latestReview: BlogPost | undefined = reviews[0];

  if (!latestNote && !latestBlog && !latestReview) return null;
  return (
    <section>
      <div className="grid gap-6 md:grid-cols-2">
        {latestBlog && (
          <Card
            href={`/blog/${latestBlog.slug}`}
            eyebrow="Latest Blog"
            title={latestBlog.metadata.title}
            desc={latestBlog.metadata.description}
            date={formatDate(latestBlog.metadata.date)}
          />
        )}
        {latestReview && (
          <Card
            href={`/reviews/${latestReview.slug}`}
            eyebrow="Latest Review"
            title={latestReview.metadata.title}
            desc={latestReview.metadata.description}
            date={formatDate(latestReview.metadata.date)}
          />
        )}
      </div>
    </section>
  );
}