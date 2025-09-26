import { Fragment, useMemo } from "react";

import { getBlogPosts, type BlogPost, type PostType } from "@/lib/getBlogPosts";
import Container from "@/components/container";
import BlogCard from "@/components/common/Blog/BlogCard";
import SectionHeader from "@/components/common/SectionHeader";

export default function Blog() {
  const posts = getBlogPosts();

  const filtered: BlogPost[] = useMemo(
    () =>
      posts.filter((p) => {
        const t = (p.metadata.type ?? "blog") as PostType;
        return t === "blog";
      }),
    [posts]
  );

  return (
    <Container size="large" className="container animate-enter">
      <SectionHeader title="Blog" />
      <div className="space-y-10">
        {filtered.map((blog, index) => (
          <Fragment key={blog.slug}>
            <BlogCard blog={blog} />
            {index < filtered.length - 1 && (
              <hr className="border-t border-white/10 opacity-20 my-4" />
            )}
          </Fragment>
        ))}
      </div>
    </Container>
  );
}