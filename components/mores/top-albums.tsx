"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Track {
  title: string;
  artist: string;
  url: string;
  coverImage: string;
}

const TopTracks = () => {
  const [topTracks, setTopTracks] = useState<Track[]>([]);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await fetch("/api/stats/tracks");
        if (response.ok) {
          const data = await response.json();
          setTopTracks(data);
        } else {
          console.error("Failed to fetch top tracks:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching top tracks:", error);
      }
    };

    fetchTopTracks();
  }, []);

  return (
    <div className="mt-10 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Top Tracks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topTracks.map((track, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <div className="relative w-full h-40 mb-4">
              <Image
                src={track.coverImage}
                className="w-full h-full object-cover rounded-md border"
                alt={track.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              {track.title}
            </h2>
            <p className="text-sm text-gray-600">{track.artist}</p>
            <a href={track.url} className="text-rose-500 no:underline">
              Listen on Spotify
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopTracks;