import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface BlogMetadata {
  title: string;
  date: string;
  description: string;
}

export interface BlogPost {
  slug: string;
  metadata: BlogMetadata;
  content: string;
}

export function getBlogPosts(): BlogPost[] {
  const files = fs.readdirSync(contentDirectory);

  const posts = files.map((filename) => {
    const filePath = path.join(contentDirectory, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
      slug: filename.replace('.mdx', ''),
      metadata: data as BlogMetadata,
      content: content,
    };
  });

  return posts;
}
