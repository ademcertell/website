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
      <div className="w-full text-neutral-800 dark:text-neutral-200">
        <article className="w-full py-3">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <div className="flex items-center">
          <NextLink href={`/post/${data.slug}`}>
            <h4 className="w-full text-lg font-semibold">{data.title}</h4>
          </NextLink>
          </div>
            <div className="flex items-center mt-2 sm:mt-0 justify-between">
              <time
                dateTime={data.date}
                className="opacity-70 dark:opacity-60 text-sm"
              >
                {format(parseISO(data.date), "d LLLL yyyy")}
              </time>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default PostCard;
