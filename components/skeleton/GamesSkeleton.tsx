import GamesCardSkeleton from '@/components/skeleton/GamesCardSkeleton'
export function GamesSkeleton({ count }: { count: number }) {
  return (
    <div className="mb-1">
      {Array.from({ length: count }).map((_, i) => (
        <GamesCardSkeleton key={i} />
      ))}
    </div>
  )
}
