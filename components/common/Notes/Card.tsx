import Link from "next/link";
import type { BlogPost, PostType } from "@/lib/getBlogPosts";

function formatDate(date?: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function readingTime(content: string) {
  const wpm = 200;
  const minutes = Math.ceil(content.split(/\s+/).length / wpm);
  return `${minutes} min read`;
}

/** minimalist, borderless badge — just colored uppercase text */
function TypeBadge({ type }: { type: PostType }) {
  const map: Record<PostType, { label: string; cls: string }> = {
    note:   { label: "note",   cls: "text-amber-400" },
    blog:   { label: "blog",   cls: "text-sky-400" },
    review: { label: "review", cls: "text-rose-400" },
    game:   { label: "game",   cls: "text-violet-400" },
  };
  const { label, cls } = map[type] ?? map.blog;
  return (
    <span className={`text-[10px] uppercase tracking-[0.14em] ${cls}`}>
      {label}
    </span>
  );
}

export default function BlogCard({ blog }: { blog: BlogPost }) {
  const type = (blog.metadata.type ?? "blog") as PostType;

  return (
    <article className="text-left">
      {/* meta line */}
      <div className="mb-2 flex flex-wrap items-center gap-3 text-xs text-foreground/60">
        <TypeBadge type={type} />
        {blog.metadata.date && (
          <>
            <span>{formatDate(blog.metadata.date)}</span>
            <span>•</span>
            <span>{readingTime(blog.content)}</span>
          </>
        )}
      </div>

      {/* title */}
      <h3 className="text-xl sm:text-2xl font-semibold text-foreground leading-snug">
        <Link
          href={`/blog/${blog.slug}`}
          className="hover:underline underline-offset-2"
        >
          {blog.metadata.title}
        </Link>
      </h3>

      {/* description */}
      {blog.metadata.description && (
        <p className="mt-2 text-sm text-foreground/70 leading-relaxed max-w-2xl">
          {blog.metadata.description}
        </p>
      )}
    </article>
  );
}
