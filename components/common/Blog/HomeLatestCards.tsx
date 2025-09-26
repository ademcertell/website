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
  title,
  desc,
  date,
  imageSrc,
}: {
  href: string;
  title: string;
  desc?: string;
  date?: string;
  imageSrc?: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col justify-between rounded-3xl border border-white/10 bg-card/40 p-6 hover:border-white/20 transition-colors"
    >
      {imageSrc && (
        <div className="mb-4 overflow-hidden rounded-2xl">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-40 object-cover"
          />
        </div>
      )}
      <div>
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
        {blogs.slice(0, 2).map((blog) => (
          <Card
            key={blog.slug}
            href={`/blog/${blog.slug}`}
            title={blog.metadata.title}
            desc={blog.metadata.description}
            date={formatDate(blog.metadata.date)}
            imageSrc={blog.metadata.image}
          />
        ))}
      </div>
    </section>
  );
}