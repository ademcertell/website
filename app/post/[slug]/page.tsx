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
    <section className="">
      <header className="space-y-8 text-center">
        <Image
          src={post.bannerUrl}
          alt={post.title}
          className="object-cover w-full transition-all rounded-lg h-30 ring-1 dark:ring-white/10 ring-black/10"
          width={1200}
          height={400}
        />
        <div className="space-x-4">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <div className="flex items-center justify-center space-x-2 text-sm text-black/50 dark:text-white/70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <time dateTime={post.date}>
                {format(parseISO(post.date), "d LLLL yyyy")}
              </time>
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  ></path>{" "}
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <span>{post.readingTime.text}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2 mt-2">
            <Balancer className="block mx-auto text-2xl md:w-11/12 text-black dark:text-white font-bold">
              {post.title}
            </Balancer>
          </div>
        </div>
      </header>
      <div className="w-full text-gray-500 dark:text-white mt-4 mb-10">
        <article>
          <Mdx code={post.body.code} />
        </article>
        <div className="mt-10 flex justify-center dark:text-gray-800">
          <ClapsButton url={post.tweetUrl} />
        </div>
      </div>
    </section>
  );
}