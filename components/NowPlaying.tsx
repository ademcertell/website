"use client";
import { useEffect, useState } from "react";

type Result = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
};

export default function SpotifyPlayer() {
  const [track, setTrack] = useState<Result | null>(null);

  async function fetchNowPlaying() {
    try {
      const res = await fetch("/api/spotify/now-playing", { cache: "no-store" });
      const data = await res.json();
      setTrack(data);
    } catch {
      setTrack({ isPlaying: false });
    }
  }

  useEffect(() => {
    fetchNowPlaying();
    const id = setInterval(fetchNowPlaying, 10_000); // her 10 sn yenile
    return () => clearInterval(id);
  }, []);

  if (!track) return null;

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-black/30 ring-1 ring-white/10">
      {track.isPlaying ? (
        <>
          {track.albumImageUrl && (
            <img
              src={track.albumImageUrl}
              alt={track.title ?? ""}
              className="w-12 h-12 rounded"
            />
          )}
          <div className="flex flex-col">
            <a
              href={track.songUrl}
              target="_blank"
              className="font-medium text-sm hover:underline"
            >
              {track.title}
            </a>
            <span className="text-xs text-white/70">{track.artist}</span>
          </div>
        </>
      ) : (
        <span className="text-sm text-white/70">Not listening on Spotify 🎧</span>
      )}
    </div>
  );
}
