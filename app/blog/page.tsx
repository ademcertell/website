import { getBlogPosts } from '@/lib/getBlogPosts';
import Container from '@/components/common/container';
import BlogCard from '@/components/blogcard';

export default function Blog() {
  const allBlogs = getBlogPosts();

  return (
    <Container
      size="large"
      className="prose prose-zinc dark:prose-invert text-zinc-200 container animate-enter"
    >
      <div className="space-y-8">
        {allBlogs
          .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime())
          .map((blog) => (
            <div key={blog.slug}>
              <BlogCard blog={blog} />
            </div>
          ))}
      </div>
    </Container>
  );
};