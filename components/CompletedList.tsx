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

type PlayedItem = {
  title: string;
  url: string;
  cover: string | null;
};

type ManualItem = FinishedItem & { cover?: string | null };

type Payload =
  | { mode: "finished"; year: string; count: number; items: FinishedItem[]; source: string }
  | { mode: "played";   year: string; count: number; items: PlayedItem[];   source: string }
  | { mode: "manual";   year: string; count: number; items: ManualItem[];   source: string }
  | { error: string };

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

  const badgeStyle = (status?: Status) => {
    switch (status) {
      case "Completed": return "text-emerald-300 border-emerald-500/20 bg-emerald-500/10";
      case "Retired":   return "text-blue-300 border-blue-500/20 bg-blue-500/10";
      case "Shelved":   return "text-amber-300 border-amber-500/20 bg-amber-500/10";
      case "Abandoned": return "text-rose-300 border-rose-500/20 bg-rose-500/10";
      default:          return "text-gray-300 border-gray-500/20 bg-gray-500/10";
    }
  };

  if (loading) {
    return (
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: limit }).map((_, i) => (
          <div key={i} className="h-24 rounded-xl border border-white/10 bg-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!data || "error" in data || !data.items?.length) {
    return <p className="mt-4 text-sm text-muted-foreground">No data found.</p>;
  }

  const isFinishedLike = data.mode === "finished" || data.mode === "manual";

  return (
    <div className="mt-6">
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.items.map((g: any, i: number) => (
          <li key={`${g.title}-${i}`} className="rounded-2xl border border-white/10 bg-card/60 p-4">
            <div className="flex items-start gap-3">
              {!isFinishedLike && g.cover ? (
                <div className="relative h-16 w-12 overflow-hidden rounded-md shrink-0">
                  <img src={g.cover} alt={g.title} className="h-full w-full object-cover" />
                </div>
              ) : null}
              {data.mode === "manual" && g.cover ? (
                <div className="relative h-16 w-12 overflow-hidden rounded-md shrink-0">
                  <img src={g.cover} alt={g.title} className="h-full w-full object-cover" />
                </div>
              ) : null}

              <div className="flex-1">
                <a href={g.url} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
                  {g.title}
                </a>

                {isFinishedLike ? (
                  <div className="mt-1 text-xs text-muted-foreground">
                    {g.platform ? `${g.platform}` : null}
                    {g.platform && g.date ? " • " : ""}
                    {g.date ?? ""}
                  </div>
                ) : null}
              </div>

              <span className={`rounded-full border px-2 py-0.5 text-[11px] ${badgeStyle(g.status ?? (data.mode === "played" ? "Played" : "Completed"))}`}>
                {g.status ?? (data.mode === "played" ? "Played" : "Completed")}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-3 text-[11px] text-muted-foreground">
        Source:{" "}
        <a className="underline" href={(data as any).source} target="_blank" rel="noopener noreferrer">
          {data.mode === "finished" ? `Journal ${data.year}` : data.mode === "played" ? "Played" : "Local JSON"}
        </a>
      </div>
    </div>
  );
}
