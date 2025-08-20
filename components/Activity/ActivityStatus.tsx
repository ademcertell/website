type StatusLabel =
  | "In-Game"
  | "Online"
  | "Away"
  | "Busy"
  | "Snooze"
  | "Offline"
  | "Unknown";

const STYLE_MAP: Record<StatusLabel, string> = {
  "In-Game": "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  Online: "bg-green-500/15 text-green-300 border-green-500/20",
  Away: "bg-amber-500/15 text-amber-300 border-amber-500/20",
  Busy: "bg-rose-500/15 text-rose-300 border-rose-500/20",
  Snooze: "bg-yellow-500/15 text-yellow-300 border-yellow-500/20",
  Offline: "bg-zinc-500/15 text-zinc-300 border-zinc-500/20",
  Unknown: "bg-zinc-500/15 text-zinc-300 border-zinc-500/20",
};

export default function ActivityStatus({ label }: { label?: string }) {
  const classes =
    STYLE_MAP[(label as StatusLabel) ?? "Unknown"] ?? STYLE_MAP.Unknown;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs border ${classes}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {label ?? "Unknown"}
    </span>
  );
}