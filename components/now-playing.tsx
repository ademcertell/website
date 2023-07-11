"use client";

import useSWR from "swr";

import Link from "next/link";
import Image from "next/image";

import fetcher from "@/lib/fetcher";

import { Song } from "@/types/api";

const NowPlaying = () => {
  const { data } = useSWR<Song>("/api/spotify", fetcher);

  return (
    <div className="relative rounded-full transform-none overflow-hidden dark:bg-dark_card bg-light_card">
      <div className="w-80 p-5">
        {data?.isPlaying && data.songUrl ? (
          <div className="flex items-center gap-3">
            <Image
              className="rounded-xl"
              src={data.albumImageURL}
              alt={data.name}
              width={55}
              height={55}
            />
            <Link href={data.songUrl} target="_blank">
              <div className="flex flex-col gap-1">
                <span className="text-black dark:text-white text-sm font-medium leading-none">
                  {data.name}
                </span>
                <span className="text-black dark:text-white text-sm">{data.artist}</span>
              </div>
            </Link>
          </div>
        ) : (
          "Not Listening"
        )}
      </div>
    </div>
  );
};

export default NowPlaying;
