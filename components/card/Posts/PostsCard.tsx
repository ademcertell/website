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
        <NextLink href={`/post/${data.slug}`}>
          <h4 className="text-xl font-medium cursor-pointer my-1.5">
            {data.title}
          </h4>
        </NextLink>
        <p className="text-sm">{data.subtitle}</p>
        <div className="flex items-center my-1.5 space-x-1">
          <time
            dateTime={data.date}
            className="text-sm text-slate-500 dark:text-white/70"
          >
            {format(parseISO(data.date!), "d LLLL yyyy")}
          </time>
          <span className="opacity-60">,</span>
          <span className="text-sm text-slate-500 dark:text-white/70">
            {data.readingTime.text}
          </span>
        </div>
      </div>
    </section>
  );
};

export default PostCard;
