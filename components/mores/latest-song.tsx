"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  formatDistanceToNow,
  isYesterday,
  parseISO,
  differenceInSeconds,
} from "date-fns";
import { MusicIcon } from "../ui/music-icon";

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const fade = {
  ease: "easeInOut",
  duration: 0.6,
};

interface CurrentlyPlaying {
  albumImageUrl: string;
  title: string;
  artist: string;
  album: string;
  songUrl: string;
}

const LatestSong = () => {
  const [currentlyPlaying, setCurrentlyPlaying] =
    useState<CurrentlyPlaying | null>(null);

  useEffect(() => {
    const fetchCurrentlyPlaying = async () => {
      try {
        const response = await fetch("/api/now-playing");
        if (response.ok) {
          const data = await response.json();
          setCurrentlyPlaying(data);
        } else {
          console.error(
            "Failed to fetch currently playing song:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching currently playing song:", error);
      }
    };

    fetchCurrentlyPlaying();
  }, []);

  return (
    <>
      <div className="min-w-0 max-w-full flex w-fit gap-4 rounded pr-2 ring-offset-4 transition hover:opacity-60">
        <div className="relative aspect-square h-20 flex-none overflow-hidden rounded bg-zinc-100 dark:bg-zinc-800">
          <MusicIcon className="absolute h-full w-full text-zinc-300 dark:text-zinc-600" />
          <AnimatePresence>
            {currentlyPlaying ? (
              <motion.img
                animate="visible"
                className="absolute h-full w-full object-cover rounded-md"
                exit="hidden"
                initial="hidden"
                key={`${currentlyPlaying.artist} ${currentlyPlaying.title}`}
                loading="lazy"
                src={currentlyPlaying.albumImageUrl}
                transition={fade}
                variants={variants}
              />
            ) : (
              <></>
            )}
          </AnimatePresence>
        </div>
        <div className="flex min-w-0 flex-col justify-center">
          {currentlyPlaying ? (
            <>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="my-1 flex items-center"
              >
                {currentlyPlaying.title}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="truncate text-zinc-500 dark:text-zinc-400"
              >
                {currentlyPlaying.artist}
              </motion.p>
            </>
          ) : (
            <>
              <p className="my-1 flex items-center">Not Playing</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LatestSong;