import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import type { BlogPost } from "@/lib/getBlogPosts";

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

export default function BlogCard({ blog }: { blog: BlogPost }) {
  return (
    <article className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div className="flex-1 space-y-2">
        {blog.metadata.date && (
          <p className="text-xs text-foreground/50">
            {formatDate(blog.metadata.date)}
          </p>
        )}
        <h3 className="text-xl font-semibold text-foreground leading-snug">
          <Link
            href={`/blog/${blog.slug}`}
            className="hover:underline underline-offset-2"
          >
            {blog.metadata.title}
          </Link>
        </h3>
        {blog.metadata.description && (
          <p className="text-sm text-foreground/70 leading-relaxed line-clamp-2">
            {blog.metadata.description}
          </p>
        )}
        <div className="flex items-center gap-6 text-xs text-sky-400">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{readingTime(blog.content)}</span>
          </div>
        </div>
      </div>
      {blog.metadata.image && (
        <div className="relative w-[140px] h-[105px] shrink-0 rounded-lg overflow-hidden ring-1 ring-white/10">
          <Image
            src={blog.metadata.image}
            alt={blog.metadata.title}
            fill
            className="object-cover transition duration-300 hover:brightness-110"
          />
        </div>
      )}
    </article>
  );
}