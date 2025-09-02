import type { Metadata } from "next";
import { Fragment, useMemo } from "react";

import Container from "@/components/common/container";
import BlogCard from "@/components/common/Notes/Card";
import { getBlogPosts, type BlogPost, type PostType } from "@/lib/getBlogPosts";
import SectionHeader from "@/components/common/SectionHeader";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Here you’ll find reflections from books I’ve read, thoughts on life, and my personal blog posts.",
};

export default function Blog() {
  const posts = getBlogPosts();

  const filtered: BlogPost[] = useMemo(
    () =>
      posts.filter((p) => {
        const t = (p.metadata.type ?? "blog") as PostType;
        return t === "note" || t === "blog";
      }),
    [posts]
  );

  return (
    <Container size="large" className="container animate-enter">
      <SectionHeader title="Blog" />

      <div className="space-y-12">
        {filtered.map((blog) => (
          <Fragment key={blog.slug}>
            <BlogCard blog={blog} />
          </Fragment>
        ))}
      </div>
    </Container>
  );
}
