import { Fragment } from "react";
import type { Metadata } from "next";

import { getBlogPosts } from "@/lib/getBlogPosts";
import Container from "@/components/common/container";
import BlogCard from "@/components/blogcard";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my thoughts on frontend development, design, and more.",
};

export default function Blog() {
  const allBlogs = getBlogPosts();

  return (
    <Container size="large">
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.date) > new Date(b.metadata.date) // 'publishedAt' yerine 'date' kullandım.
          ) {
            return -1;
          }
          return 1;
        })
        .map((blog) => (
          <Fragment key={blog.slug}>
            <BlogCard blog={blog} />
          </Fragment>
        ))}
    </Container>
  );
}