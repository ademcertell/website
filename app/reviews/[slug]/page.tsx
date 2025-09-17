import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { notFound } from "next/navigation";
import Link from "next/link";

import Container from "@/components/common/container";
import CustomMDX from "@/components/mdx";
import HideHeader from "@/components/common/HideHeader";
import SimilarReviews from "@/components/common/Blog/SimilarReviews";
import Comments from "@/components/common/Comments";
import ViewCounter from "@/components/common/Blog/ViewCounter";
import ShareButton from "@/components/common/ReviewsShare";

const contentDir = path.join(process.cwd(), "content");

function mdxFiles() {
  if (!fs.existsSync(contentDir)) return [];
  return fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));
}
function readFrontmatter(file: string) {
  const full = path.join(contentDir, file);
  const raw = fs.readFileSync(full, "utf-8");
  const { data } = matter(raw);
  return { slug: file.replace(/\.mdx$/, ""), data };
}
export async function generateStaticParams() {
  return mdxFiles()
    .map(readFrontmatter)
    .filter((p) => p.data?.type === "review")
    .map((p) => ({ slug: p.slug }));
}
function formatDate(date?: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ReviewPost({
  params,
}: {
  params: { slug: string };
}) {
  const filePath = path.join(contentDir, `${params.slug}.mdx`);
  if (!fs.existsSync(filePath)) return notFound();

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  if (data?.type !== "review") return notFound();

  const mdx = await serialize(content);

  const title: string = data.title ?? params.slug;
  const cover: string | undefined = data.cover;
  const date = formatDate(data.date);
  const hours: string | undefined = data.hours;
  const platform: string | undefined = data.game?.platform;
  const rating: number | undefined = data.rating;
  const tags: string[] = data.tags ?? [];

  return (
    <>
      <HideHeader />
      <section className="-mx-6 md:-mx-8 lg:-mx-0 lg:container lg:px-0">
        <div className="absolute left-4 top-4 z-20 flex gap-2">
          <Link
            href="/reviews"
            className="rounded bg-black/40 px-3 py-1 text-sm text-white transition duration-200 hover:bg-black/60"
          >
            ← İncelemelere Dön
          </Link>
        </div>
        <div className="relative overflow-hidden">
          <div className="relative aspect-[21/9]">
            {cover ? (
              <img
                src={cover}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-black to-black" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex items-end justify-center md:items-center">
              <div className="px-6 py-10 text-center md:px-10">
                <h1 className="font-heading text-4xl md:text-5xl font-semibold tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,.6)]">
                  {title}
                </h1>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs text-white/80">
                  {date && <span>{date}</span>}
                  {hours && <span>• {hours}</span>}
                  {platform && <span>• {platform}</span>}
                </div>
                {tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/10 px-3 py-1 text-xs border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {typeof rating === "number" && (
                  <div className="mt-5 flex flex-col items-center gap-3">
                    <span className="rounded-full border border-amber-500/25 bg-amber-500/15 px-3 py-1 text-sm text-amber-300">
                      {rating.toFixed(1)}/10
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Container size="large" className="mt-8">
        <article className="prose prose-invert mx-auto max-w-4xl prose-img:rounded-xl prose-img:shadow-lg prose-p:leading-7 prose-h2:text-2xl prose-h3:text-xl">
          <CustomMDX source={mdx} />
        </article>
        <div className="mt-10 flex justify-center">
          <ShareButton title={title} />
        </div>
        <div className="my-6 border-t border-white/10 pt-6">
          <Comments slug={params.slug} />
        </div>
        <div className="mx-auto mt-10 w-full max-w-6xl">
          <SimilarReviews currentSlug={params.slug} />
        </div>
        <div className="mt-12 flex justify-center">
          <Link
            href="/reviews"
            className="rounded-lg bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20"
          >
            ← Tüm İncelemelere Dön
          </Link>
        </div>
      </Container>
      <div className="mx-auto mt-8 flex w-full max-w-3xl items-center justify-center gap-3">
        <ViewCounter slug={params.slug} />
      </div>
    </>
  );
}