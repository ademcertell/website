export default function ActivitySkeleton() {
  return (
    <div className="overflow-hidden rounded-md border border-white/10 bg-card/60 animate-pulse">
      <div className="h-40 md:h-52 w-full bg-white/5" />
      <div className="p-5 md:p-6 space-y-3">
        <div className="h-6 w-28 bg-white/10 rounded-full" />
        <div className="h-6 w-56 bg-white/10 rounded" />
        <div className="flex gap-3 pt-1">
          <div className="h-4 w-28 bg-white/10 rounded" />
          <div className="h-4 w-24 bg-white/10 rounded" />
        </div>
      </div>
    </div>
  );
}