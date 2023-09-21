"use client";

import React from "react";
import Link from "next/link";
import useSWR from "swr";

const Games = () => {
  const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());
  const { data } = useSWR("/api/playersummaries", fetcher);

  return (
    <section className="relative rounded-full transform-none overflow-hidden dark:bg-dark_card bg-light_card">
      <div className="w-80 p-5">
        <Link href="https://steamcommunity.com/id/ademcertel/" target="_blank">
          <div className="flex items-center gap-3">
            {data?.steam.getGames === false
              ? data?.steam.getStatus
                ? data?.steam.getStatus
                : "-"
              : data?.steam.getGames}
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Games;