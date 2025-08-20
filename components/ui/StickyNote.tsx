import React from "react";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
  tone?: "paper" | "yellow" | "mint";
  variant?: "pin" | "tape" | "none";
};

export default function StickyNote({
  children,
  className,
  tone = "paper",
  variant = "pin",
}: Props) {
  const toneClass =
    tone === "yellow"
      ? "bg-[#1d1b11] [background:radial-gradient(circle_at_1px_1px,rgba(255,255,255,.06)1px,transparent_1px)] bg-[length:14px_14px] border-yellow-200/10"
      : tone === "mint"
      ? "bg-[#101b18] [background:radial-gradient(circle_at_1px_1px,rgba(255,255,255,.06)1px,transparent_1px)] bg-[length:14px_14px] border-emerald-200/10"
      : "bg-card/70 [background:radial-gradient(circle_at_1px_1px,rgba(255,255,255,.05)1px,transparent_1px)] bg-[length:14px_14px] border-white/10";

  return (
    <div
      className={clsx(
        "relative rounded-xl border p-5 md:p-6 shadow-[0_10px_30px_-18px_rgba(0,0,0,.6)]",
        "before:absolute before:inset-x-0 before:top-0 before:h-5 before:rounded-t-xl",
        "before:bg-[linear-gradient(180deg,rgba(255,255,255,.06),transparent)]",
        "rotate-[.15deg] md:rotate-[.1deg]",
        toneClass,
        className
      )}
    >
      {variant !== "none" && (
        <div className="pointer-events-none absolute right-2.5 -top-3 z-10">
          {variant === "pin" ? (
            <div className="relative">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-rose-400 drop-shadow-[0_3px_6px_rgba(0,0,0,.45)]"
                aria-hidden
              >
                <path
                  d="M8 3c0-.55.45-1 1-1h6c.55 0 1 .45 1 1v3l3 4-4 4v5l-3-2-3 2v-5L5 10l3-4V3Z"
                  fill="currentColor"
                />
              </svg>
              <span className="absolute -right-1 top-4 h-3 w-3 rounded-full bg-black/20 blur-[2px]" />
            </div>
          ) : (
            <span className="block h-4 w-14 -rotate-6 rounded-[3px] bg-zinc-100/10 shadow-[0_6px_12px_-6px_rgba(0,0,0,.5)]" />
          )}
        </div>
      )}

      <div className="relative z-0 text-sm md:text-base leading-relaxed text-zinc-200">
        {children}
      </div>
    </div>
  );
}