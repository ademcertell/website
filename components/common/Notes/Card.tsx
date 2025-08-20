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

function TypeBadge({ type }: { type: PostType }) {
  const map: Record<PostType, { label: string; cls: string }> = {
    note: {
      label: "note",
      cls: "bg-amber-500/15 text-amber-300 border-amber-400/20",
    },
    blog: {
      label: "blog",
      cls: "bg-sky-500/15 text-sky-300 border-sky-400/20",
    },
    review: {
      label: "review",
      cls: "bg-rose-500/15 text-rose-300 border-rose-400/20",
    },
    game: {
      label: "game",
      cls: "bg-violet-500/15 text-violet-300 border-violet-400/20",
    },
  };
  const { label, cls } = map[type] ?? map.blog;
  return (
    <span
      className={`rounded-md border px-2 py-[2px] text-[10px] uppercase tracking-wider ${cls}`}
    >
      {label}
    </span>
  );
}

export default function BlogCard({ blog }: { blog: BlogPost }) {
  const type = (blog.metadata.type ?? "blog") as PostType;

  return (
    <div className="text-center">
      <article className="py-6 text-left">
        <header className="space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <TypeBadge type={type} />
            <span className="text-muted-foreground">
              {formatDate(blog.metadata.date)}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              {readingTime(blog.content)}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-semibold text-foreground">
            <Link
              href={`/blog/${blog.slug}`}
              className="underline-offset-2 hover:underline"
            >
              {blog.metadata.title}
            </Link>
          </h3>

          {blog.metadata.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {blog.metadata.description}
            </p>
          )}
        </header>
      </article>

      <div className="my-4 select-none text-muted-foreground/70">• • •</div>
    </div>
  );
}