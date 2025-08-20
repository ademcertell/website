import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

const contentDir = path.join(process.cwd(), "content");

type Front = { title?: string; date?: string; type?: string };

function loadReviews() {
  const files = fs.existsSync(contentDir) ? fs.readdirSync(contentDir) : [];
  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(contentDir, f), "utf8");
      const { data } = matter(raw);
      const front = data as Front;
      return {
        slug: f.replace(/\.mdx$/, ""),
        title: front.title ?? f,
        date: front.date ?? "1970-01-01",
        type: front.type,
      };
    })
    .filter((x) => x.type === "review")
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export default function SimilarReviews({
  currentSlug,
  limit = 3,
}: {
  currentSlug: string;
  limit?: number;
}) {
  const all = loadReviews()
    .filter((x) => x.slug !== currentSlug)
    .slice(0, limit);

  if (!all.length) return null;

  return (
    <section className="mt-12">
      <h2 className="text-lg font-heading mb-3">Related reviews</h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {all.map((r) => (
          <li
            key={r.slug}
            className="rounded-xl border border-white/10 bg-card/60 p-4"
          >
            <Link
              href={`/reviews/${r.slug}`}
              className="font-medium hover:underline"
            >
              {r.title}
            </Link>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(r.date).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
