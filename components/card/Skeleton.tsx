import React from "react";

const SkeletonCard = () => {
  return (
    <>
      <div className="rounded-md space-y-4 p-4 h-full border border-neutral-300 dark:border-neutral-800 dark:text-neutral-200 text-neutral-500 hover:dark:bg-neutral-800 hover:bg-neutral-100 overflow-x-hidden transition duration-200">
        <div className="rounded-md bg-black/10 h-5 animate-pulse w-5/12 dark:bg-white/5" />
        <div className="space-y-2">
          <div className="rounded-md bg-black/10 h-4 w-full animate-pulse dark:bg-white/5" />
          <div className="rounded-md bg-black/10 h-4 animate-pulse w-4/12 dark:bg-white/5" />
        </div>
      </div>

      <div className="rounded-md space-y-4 p-4 border border-neutral-300 dark:border-neutral-800 dark:text-neutral-200 text-neutral-500 hover:dark:bg-neutral-800 hover:bg-neutral-100 overflow-x-hidden transition duration-200">
        <div className="rounded-md bg-black/10 h-5 animate-pulse w-5/12 dark:bg-white/5" />
        <div className="space-y-2">
          <div className="rounded-md bg-black/10 h-4 w-full animate-pulse dark:bg-white/5" />
          <div className="rounded-md bg-black/10 h-4 animate-pulse w-4/12 dark:bg-white/5" />
        </div>
      </div>
    </>
  );
};

export default SkeletonCard;