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
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
          Blog
        </h1>
        <div className="mt-2 h-[2px] w-16 bg-gradient-to-r from-primary to-accent rounded-full"></div>
        <p className="text-base text-muted-foreground mt-4 leading-relaxed max-w-2xl">
          Here you&apos;ll find reflections from books I&apos;ve read, thoughts
          on life, and my personal blog posts.
        </p>
      </header>

      {filtered.map((blog) => (
        <Fragment key={blog.slug}>
          <BlogCard blog={blog} />
        </Fragment>
      ))}
    </Container>
  );
}
