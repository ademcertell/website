import { serialize } from "next-mdx-remote/serialize";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

import CustomMDX from "@/components/mdx";
import Container from "@/components/common/container";
import BlogIntroduction from "@/components/common/Blog/BlogIntroduction";

const contentDirectory = path.join(process.cwd(), "content");

export async function generateStaticParams() {
  const files = fs.readdirSync(contentDirectory);
  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => ({ slug: filename.replace(".mdx", "") }));
}

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

interface NotePageProps {
  params: { slug: string };
}

export default async function NotePage({ params }: NotePageProps) {
  const filePath = path.join(contentDirectory, `${params.slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(raw);

  const mdxSource = await serialize(content);
  const title = (data.title as string | undefined) ?? params.slug;

  return (
    <div className="relative">
      <Container
        size="large"
        className="container animate-enter flex flex-col md:flex-row gap-10"
      >
        <div className="flex-1">
          <header className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            {data.date && (
              <div className="mt-1 text-sm text-muted-foreground">
                {formatDate(String(data.date))}
              </div>
            )}
          </header>

          <article className="prose prose-invert prose-p:leading-7">
            <CustomMDX source={mdxSource} />
          </article>
        </div>
      </Container>

      <BlogIntroduction />
    </div>
  );
}