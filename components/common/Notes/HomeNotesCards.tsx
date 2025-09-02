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
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-card/60 hover:border-white/20"
    >
      <div className="p-5 md:p-6">
        <p className="mb-1 text-xs md:text-sm text-muted-foreground">
          <span className="font-semibold text-primary">{eyebrow}</span>
          {date ? <span className="ml-2 opacity-70">{date}</span> : null}
        </p>
        <h3 className="text-lg md:text-xl font-semibold text-foreground">
          {title}
        </h3>
        {desc ? (
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {desc}
          </p>
        ) : null}
      </div>
    </Link>
  );
}

export default function HomeBlogCards() {
  const notes = getPostsByType("note");
  const reviews = getPostsByType("review");

  const latestNote: BlogPost | undefined = notes[0];
  const latestReview: BlogPost | undefined = reviews[0];

  if (!latestNote && !latestReview) return null;

  return (
    <section className="grid gap-6 md:grid-cols-2">
      {latestNote && (
        <Card
          href={`/blog/${latestNote.slug}`}
          eyebrow="Latest Note"
          title={latestNote.metadata.title}
          desc={latestNote.metadata.description}
          date={formatDate(latestNote.metadata.date)}
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
    </section>
  );
}
