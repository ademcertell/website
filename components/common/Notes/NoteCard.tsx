import Link from "next/link";
import { getPostsByType, type BlogPost } from "@/lib/getBlogPosts";
import StickyNote from "@/components/ui/StickyNote";

function formatDate(date?: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default function NoteCards() {
  const notes = getPostsByType("note");
  if (notes.length === 0) return null;

  return (
    <div className="space-y-6">
      {notes.map((n: BlogPost) => (
        <StickyNote key={n.slug} variant="pin" tone="yellow">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span className="rounded-full border border-amber-200/30 bg-amber-100/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-amber-200">
              Note
            </span>
            <time className="opacity-70">{formatDate(n.metadata.date)}</time>
          </div>

          <h3 className="text-base font-semibold leading-tight">
            <Link href={`/blog/${n.slug}`} className="hover:underline">
              {n.metadata.title}
            </Link>
          </h3>

          {n.metadata.description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {n.metadata.description}
            </p>
          )}
        </StickyNote>
      ))}
    </div>
  );
}