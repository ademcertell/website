import React from "react";

const SkeletonCard = () => {
  return (
  <>
    <div className="rounded-md space-y-4 p-4 h-full hover:dark:bg-zinc-800 hover:bg-[#f1f5f9] ease-in-out overflow-x-hidden transition-colors">
      <div className="rounded-md bg-black/10 h-5 animate-pulse w-5/12 dark:bg-white/5" />
      <div className="space-y-2">
        <div className="rounded-md bg-black/10 h-4 w-full animate-pulse dark:bg-white/5" />
        <div className="rounded-md bg-black/10 h-4 animate-pulse w-4/12 dark:bg-white/5" />
      </div>
    </div>

    <div className="rounded-md space-y-4 p-4 hover:dark:bg-zinc-800 hover:bg-[#f1f5f9] ease-in-out overflow-x-hidden transition-colors">
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
