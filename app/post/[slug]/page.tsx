import Image from "next/image";
import { Balancer } from "react-wrap-balancer";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";
import { allPosts, Post } from "@/.contentlayer/generated";

import { Mdx } from "@/components/mdx";
import ClapsButton from "@/components/ui/ClapsButton";

type Props = {
  params: {
    slug: string;
  };
};

interface BlogPost {
  data: {
    readingTime: {
      text: string;
    };
  };
}

export async function generateMetadata({
  params,
}: {
  params: Props["params"];
}) {
  const post = allPosts.find((post: Post) => post.slug === params.slug) as Post;

  return {
    title: post.title,
    description: post.subtitle,
  };
}

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params, data }: any) {
  const post: Post = allPosts.find(
    (post: Post) => post.slug === params.slug
  ) as Post;

  if (!post) {
    notFound();
  }

  return (
    <section className="m-1.5 space-y-6 md:my-20 mt-20">
      <header className="space-y-8 text-center">
        <div className="space-y-4">
          <div className="flex flex-warp items-center justify-center gap-x-6 gap-y-2 text-sm text-black/50 dark:text-white/70">
            <time dateTime={post.date}>
              {format(parseISO(post.date), "d LLLL yyyy")}
            </time>
            <div>
              <span>{post.readingTime.text}</span>
            </div>
          </div>
          <div className="space-y-2">
            <Balancer className="block mx-auto text-2xl md:w-11/12 text-black dark:text-white">
              {post.title}
            </Balancer>
          </div>
        </div>
      </header>
      <div className="w-full text-gray-500 dark:text-white mt-4 mb-10">
        <article>
          <Mdx code={post.body.code} />
        </article>
        <div className="mt-10 flex justify-center">
          <ClapsButton url={post.tweetUrl} />
        </div>
      </div>
    </section>
  );
}
