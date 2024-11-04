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
    return `${minutes} Min read`;
  };
  return (
  <article>
    <header>
      <h3 className="font-semibold mb-1 text-zinc-100">
        <Link href={`/blog/${blog.slug}`}>
          {blog.metadata.title}
        </Link>
      </h3>
      <p className="mt-1 opacity-70 text-zinc-200">{blog.metadata.description}</p>
    </header>
       <div className='mt-1 flex items-center space-x-2 text-sm tracking-wider opacity-50 text-zinc-200 font-mono'>
        <span>{formatDate(blog.metadata.date)}</span>
        <span>·</span>
        <span>{calculateReadingTime(blog.content)}</span>
      </div>
  </article>
  );
};

export default BlogCard;