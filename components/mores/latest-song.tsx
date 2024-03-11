"use client";

import { useState, useEffect } from "react";
import type { Transition, Variants } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const variants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const fade: Transition = {
  ease: "easeInOut",
  duration: 0.6,
};

interface CurrentlyPlaying {
  albumImageUrl: string;
  title: string;
  artist: string;
  album: string;
  songUrl: string;
  playing: boolean;
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
      {currentlyPlaying && (
        <a
          href={currentlyPlaying.songUrl}
          target="_blank"
          className="min-w-0 max-w-full flex w-fit gap-4 rounded pr-2 ring-offset-4 transition hover:opacity-60"
        >
          <div className="relative aspect-square h-20 flex-none overflow-hidden rounded bg-zinc-100 dark:bg-zinc-800">
            <AnimatePresence>
              {currentlyPlaying.albumImageUrl ? (
                <motion.img
                  alt={`${currentlyPlaying.title} by ${currentlyPlaying.artist}`}
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
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                  <span>Now Playing</span>
                </div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex min-w-0 flex-col justify-center">
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
          </div>
          {currentlyPlaying.playing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <svg
                className="w-12 h-12 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 014.5 4.5L2 2v4a9.956 9.956 0 002 5.787V17h.001l1.999-.709zM12 20c-1.473 0-2.84-.516-3.905-1.376l-1.416 1.416A9.966 9.966 0 0012 22c5.523 0 10-4.477 10-10h-2c0 4.418-3.582 8-8 8z"
                ></path>
              </svg>
            </motion.div>
          )}
        </a>
      )}
    </>
  );
};

export default LatestSong;