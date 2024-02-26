"use client";

import NextLink from "next/link";
import { format, parseISO } from "date-fns";

interface PostCardProps {
  data: {
    date: string;
    slug: string;
    title: string;
    readingTime: {
      text: string;
    };
    tweetUrl?: string;
    subtitle?: string;
  };
}

const PostCard = ({ data }: PostCardProps) => {
  return (
    <section>
      <div className="flex flex-col rounded-lg py-4 no-underline text-neutral-800 dark:text-neutral-200 transition-all">
        <article>
          <NextLink href={`/post/${data.slug}`}>
            <h4 className="text-xl font-semibold">{data.title}</h4>
          </NextLink>
          <p className="text-sm mt-1 opacity-70 dark:opacity-60">
            {data.subtitle}
          </p>
          <div className="flex items-center my-1.5 space-x-1">
            <time
              dateTime={data.date}
              className="opacity-70 dark:opacity-60 text-sm"
            >
              {format(parseISO(data.date), "d LLLL yyyy")}
            </time>
          </div>
        </article>
      </div>
    </section>
  );
};

export default PostCard;