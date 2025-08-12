import Link from "next/link";

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
  isLast?: boolean;
}

const BlogCard = ({ blog, isLast }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div className="text-center">
      <article className="py-6 text-left">
        <header>
          <h3 className="text-lg sm:text-xl font-semibold text-foreground">
            <Link
              href={`/blog/${blog.slug}`}
              className="underline-offset-2 hover:underline"
            >
              {blog.metadata.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            {blog.metadata.description}
          </p>
        </header>
        <div className="mt-2 flex items-center gap-2 text-xs tracking-wide text-muted-foreground font-mono uppercase">
          <span>{formatDate(blog.metadata.date)}</span>
          <span>•</span>
          <span>{calculateReadingTime(blog.content)}</span>
        </div>
      </article>

      {!isLast && (
        <div className="my-4 text-muted-foreground/70 select-none">• • •</div>
      )}
    </div>
  );
};

export default BlogCard;