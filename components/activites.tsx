"use client";

import React from "react";
import Link from "next/link";
import useSWR from "swr";

const Games = () => {
  const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());
  const { data } = useSWR("/api/playersummaries", fetcher);

  return (
    <section>
      <span>
        <Link href="https://steamcommunity.com/id/ademcertel/" target="_blank">
          {data?.steam.getGames === false
            ? data?.steam.getStatus
              ? data?.steam.getStatus
              : "-"
            : data?.steam.getGames}
        </Link>
      </span>
    </section>
  );
};

export default Games;
