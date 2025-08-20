// lib/getBlogPosts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostType = "note" | "blog" | "review" | "game";
export type BlogItem = BlogPost
export type Frontmatter = {
  title: string;
  date: string;
  description?: string;
  /**
   * Yoksa "blog" gibi davranırız.
   */
  type?: PostType;

  // --- review / game odaklı opsiyonel alanlar ---
  rating?: number; // 0..10
  game?: {
    title?: string;
    platform?: string;
  };
};

export type BlogPost = {
  slug: string;
  metadata: Frontmatter;
  content: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content");

export function getBlogPosts(): BlogPost[] {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8");
      const { content, data } = matter(raw);

      // `data` (frontmatter) -> Frontmatter tipine cast
      const metadata = data as Frontmatter;

      return { slug, metadata, content };
    })
    .sort(
      (a, b) =>
        new Date(b.metadata.date).getTime() -
        new Date(a.metadata.date).getTime()
    );
}

/** Belirli type’a göre filtre */
export function getPostsByType(type: PostType): BlogPost[] {
  return getBlogPosts().filter(
    (p) => (p.metadata.type ?? "blog") === type
  );
}
