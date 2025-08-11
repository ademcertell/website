import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export interface BlogMetadata {
  title: string;
  date: string;                 // ISO
  description: string;
  type?: "post" | "review";     // default
  rating?: number;              // review 
  game?: {                      // review 
    title?: string;
    platform?: string;
    hours?: number;
  };
  cover?: string;               // cover
}

export interface BlogPost {
  slug: string;
  metadata: BlogMetadata;
  content: string;
}

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(contentDirectory)) return [];
  const files = fs.readdirSync(contentDirectory).filter(f => f.endsWith(".mdx"));

  return files.map((filename) => {
    const filePath = path.join(contentDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      slug: filename.replace(/\.mdx$/i, ""),
      metadata: {
        ...(data as any),
        type: (data as any)?.type ?? "post",
      } as BlogMetadata,
      content,
    };
  });
}

export function getPostsByType(type: "post" | "review"): BlogPost[] {
  return getBlogPosts()
    .filter(p => (p.metadata.type ?? "post") === type)
    .sort((a, b) => (new Date(a.metadata.date) > new Date(b.metadata.date) ? -1 : 1));
}

export function getSlugsByType(type: "post" | "review"): { slug: string }[] {
  return getPostsByType(type).map(p => ({ slug: p.slug }));
}
