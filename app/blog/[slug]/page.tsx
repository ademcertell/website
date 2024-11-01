import { serialize } from "next-mdx-remote/serialize";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Container from "@/components/common/container";
import CustomMDX from "@/components/mdx";

const contentDirectory = path.join(process.cwd(), "content");

export async function generateStaticParams() {
  const files = fs.readdirSync(contentDirectory);

  return files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));
}

const calculateReadingTime = (content: string) => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

interface BlogPostProps {
  params: { slug: string };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const filePath = path.join(contentDirectory, `${params.slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(fileContent);

  const mdxSource = await serialize(content);

  return (
    <Container size="large" className="text-zinc-200 container animate-enter overflow-x-hidden">
      <h1 className="text-3xl font-bold tracking-tight mb-4">{data.title}</h1>
      <div className="flex justify-start items-center mt-2 mb-8 text-sm text-neutral-400">
        <time dateTime={data.date}>{formatDate(data.date)}</time>
        <span className="mx-2 text-neutral-500"> — </span>
        <span>{calculateReadingTime(content)}</span>
      </div>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert text-justify w-auto">
        <CustomMDX source={mdxSource} />
      </article>
    </Container>
  );
}
