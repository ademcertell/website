import { serialize } from "next-mdx-remote/serialize";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Container from "@/components/common/container";
import CustomMDX from "@/components/mdx";

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
    <Container size="large" className="container animate-enter">
      <header className="mb-6">
        <h1 className="text-2xl font-heading tracking-tight">{title}</h1>
        {data.date && (
          <div className="mt-1 text-xs text-muted-foreground">
            {formatDate(String(data.date))}
          </div>
        )}
      </header>

      <article className="prose prose-invert mx-auto max-w-2xl md:max-w-3xl prose-p:leading-7">
        <CustomMDX source={mdxSource} />
      </article>
    </Container>
  );
}
