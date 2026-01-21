export function MovieCardSkeleton() {
  return (
    <div className="card-netflix-static overflow-hidden">
      <div className="aspect-[2/3] bg-muted animate-pulse" />
      <div className="p-3 md:hidden space-y-2">
        <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
        <div className="h-3 bg-muted rounded w-1/3 animate-pulse" />
      </div>
    </div>
  );
}
