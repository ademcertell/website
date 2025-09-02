"use client";

import { useEffect, useState } from "react";

type Status = "Completed" | "Retired" | "Shelved" | "Abandoned" | "Played";

type FinishedItem = {
  title: string;
  url: string;
  date: string | null;
  platform: string | null;
  status?: Status;
};
type PlayedItem = { title: string; url: string };
type ManualItem = FinishedItem & { cover?: string | null };

type Payload =
  | { mode: "finished"; year: string; count: number; items: FinishedItem[]; source: string }
  | { mode: "played"; year: string; count: number; items: PlayedItem[]; source: string }
  | { mode: "manual"; year: string; count: number; items: ManualItem[]; source: string }
  | { error: string };

function CardSkeleton() {
  return (
    <li className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="h-4 w-40 animate-pulse rounded bg-white/10" />
      <div className="mt-2 h-3 w-28 animate-pulse rounded bg-white/5" />
    </li>
  );
}

export default function CompletedList({
  year = String(new Date().getFullYear()),
  limit = 8,
  view = "auto",
}: {
  year?: string;
  limit?: number;
  view?: "auto" | "finished" | "played" | "manual";
}) {
  const [data, setData] = useState<Payload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let live = true;
    (async () => {
      try {
        const qs = new URLSearchParams({
          year,
          limit: String(limit),
          ...(view !== "auto" ? { view } : {}),
        });
        const r = await fetch(`/api/backloggd/completed?${qs.toString()}`, {
          cache: "no-store",
        });
        const j = (await r.json()) as Payload;
        if (!live) return;
        setData(j);
      } catch {
        if (!live) return;
        setData({ error: "fetch-failed" } as any);
      } finally {
        if (live) setLoading(false);
      }
    })();
    return () => {
      live = false;
    };
  }, [year, limit, view]);

  if (loading) {
    return (
      <ul className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {Array.from({ length: limit }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </ul>
    );
  }

  if (!data || "error" in data || !data.items?.length) {
    return (
      <div className="mt-2 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <p className="text-sm text-muted-foreground">
          No data found. Try changing year or view.
        </p>
      </div>
    );
  }

  const isFinishedLike = data.mode === "finished" || data.mode === "manual";

  return (
    <div className="mt-2">
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {data.items.map((g: any, i: number) => {
          const status: Status =
            g.status ?? (data.mode === "played" ? "Played" : "Completed");

          return (
            <li
              key={`${g.title}-${i}`}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-white/20"
            >
              <a
                href={g.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4"
                aria-label={`${g.title} — ${status}`}
              >
                <h3 className="truncate font-medium text-foreground underline-offset-2 group-hover:underline">
                  {g.title}
                </h3>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {isFinishedLike ? (
                    <>
                      {g.platform ? <span>{g.platform}</span> : null}
                      {g.platform && g.date ? <span> • </span> : null}
                      {g.date ?? ""}
                    </>
                  ) : (
                    <span>Recently played</span>
                  )}
                </p>
              </a>
            </li>
          );
        })}
      </ul>

      <div className="mt-3 text-[11px] text-muted-foreground">
        Source:{" "}
        <a
          className="underline decoration-dotted underline-offset-2 hover:decoration-solid"
          href={(data as any).source}
          target="_blank"
          rel="noopener noreferrer"
        >
          {data.mode === "finished"
            ? `Journal ${data.year}`
            : data.mode === "played"
            ? "Played"
            : "Local JSON"}
        </a>
      </div>
    </div>
  );
}
