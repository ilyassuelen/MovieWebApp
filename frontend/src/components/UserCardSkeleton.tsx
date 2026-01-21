export function UserCardSkeleton() {
  return (
    <div className="card-netflix-static p-6 flex flex-col items-center gap-4">
      <div className="h-20 w-20 rounded-full bg-muted animate-pulse" />
      <div className="space-y-2 w-full flex flex-col items-center">
        <div className="h-5 bg-muted rounded w-24 animate-pulse" />
        <div className="h-4 bg-muted rounded w-20 animate-pulse" />
      </div>
    </div>
  );
}
