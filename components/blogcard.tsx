import Link from 'next/link';

interface BlogMetadata {
  title: string;
  date: string;
  description: string;
}

interface BlogPost {
  slug: string;
  metadata: BlogMetadata;
  content: string;
}

interface BlogCardProps {
  blog: BlogPost;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };


  return (
    <article>
      <h3 className="font-semibold mb-1">
        <Link href={`/blog/${blog.slug}`}>
          {blog.metadata.title}
        </Link>
      </h3>
      <p className="opacity-60 text-zinc-50 mt-1">{blog.metadata.description}</p>
      <p className="opacity-70 text-zinc-50 font-serif mt-1">{formatDate(blog.metadata.date)}</p>
      <p className="opacity-50">{calculateReadingTime(blog.content)}</p>
    </article>
  );
};

export default BlogCard;