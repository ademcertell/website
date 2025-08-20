import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { notFound } from "next/navigation";
import Link from "next/link";

import Container from "@/components/common/container";
import CustomMDX from "@/components/mdx";
import HideHeader from "@/components/common/HideHeader";

import SimilarReviews from "@/components/common/Notes/SimilarReviews";
import Comments from "@/components/common/Comments";
import LikeButton from "@/components/common/Notes/LikeButton";
import ViewCounter from "@/components/common/Notes/ViewCounter";

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

  return (
    <>
      <HideHeader />
      <section className="-mx-6 md:-mx-8 lg:-mx-0 lg:container lg:px-0">
        <div className="absolute left-4 top-4 z-20">
          <Link
            href="/"
            className="rounded bg-black/40 px-3 py-1 text-sm text-white transition duration-200 hover:bg-black/60"
          >
            Home
          </Link>
        </div>

        <div className="relative overflow-hidden">
          <div className="relative aspect-[16/6] md:aspect-[21/9]">
            {cover ? (
              <img
                src={cover}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-black to-black" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

            <div className="absolute inset-0 flex items-end justify-center md:items-center">
              <div className="px-6 py-8 text-center md:px-10">
                <h1 className="font-heading text-3xl font-semibold tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,.6)] md:text-5xl">
                  {title}
                </h1>

                <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs text-white/85">
                  {date && <span>{date}</span>}
                  {hours && (
                    <>
                      <span className="opacity-60">•</span>
                      <span>{hours}</span>
                    </>
                  )}
                  {platform && (
                    <>
                      <span className="opacity-60">•</span>
                      <span>{platform}</span>
                    </>
                  )}
                </div>

                {typeof rating === "number" && (
                  <div className="mt-4">
                    <span className="rounded-full border border-amber-500/25 bg-amber-500/15 px-2.5 py-0.5 text-[11px] text-amber-300">
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
        <article className="prose prose-invert mx-auto max-w-3xl prose-p:leading-7">
          <CustomMDX source={mdx} />
        </article>
        <div className="my-4 select-none text-muted-foreground/70">———</div>
        <Comments slug={params.slug} />
        <div className="mx-auto mt-10 w-full max-w-6xl">
          <SimilarReviews currentSlug={params.slug} />
        </div>
      </Container>
      <div className="mx-auto mt-8 flex w-full max-w-3xl items-center justify-center gap-3">
        {/*<LikeButton slug={params.slug} />
        <span className="h-4 w-px bg-white/10" aria-hidden />*/}
        <ViewCounter slug={params.slug} />
      </div>
    </>
  );
}
