import type { Metadata } from "next";
import { Fragment } from "react";

import Container from "@/components/common/container";
import BlogCard from "@/components/common/Notes/Card";
import { getBlogPosts, type BlogPost, type PostType } from "@/lib/getBlogPosts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Here you’ll find reflections from books I’ve read, thoughts on life, and my personal blog posts.",
};

export default function Blog() {
  const posts = getBlogPosts();

  const filtered: BlogPost[] = posts.filter((p) => {
    const t = (p.metadata.type ?? "blog") as PostType;
    return t === "note" || t === "blog";
  });

  return (
    <Container size="large">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-heading text-foreground">
          Blog
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Here you&apos;ll find reflections from books I&apos;ve read, thoughts
          on life, and my personal blog posts.
        </p>
      </header>
      <div className="my-2 select-none text-muted-foreground/70">———</div>
      {filtered.map((blog) => (
        <Fragment key={blog.slug}>
          <BlogCard blog={blog} />
        </Fragment>
      ))}
    </Container>
  );
}