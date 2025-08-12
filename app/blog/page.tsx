import type { Metadata } from "next";
import { Fragment } from "react";

import { getPostsByType } from "@/lib/getBlogPosts";

import Container from "@/components/common/container";
import BlogCard from "@/components/common/Blog/blogcard";

export const metadata: Metadata = {
  title: "Blog",
  description: "Frontend, tasarım ve notlar.",
};

export default function Blog() {
  const posts = getPostsByType("post");

  return (
    <Container size="large">
      {posts.map((blog) => (
        <Fragment key={blog.slug}>
          <BlogCard blog={blog} />
        </Fragment>
      ))}
    </Container>
  );
}
