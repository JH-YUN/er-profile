export default function GamesCardSkeleton() {
  return (
    <div className="card w-full">
      <div className="flex animate-pulse">
        <div
          className="mr-3 rounded bg-neutral-600"
          style={{ width: 73.2, height: 96 }}
        ></div>
        <div className="flex-1">
          <div className="h-4 bg-neutral-600 rounded mb-5 w-[200px]"></div>
          <div className="h-4 bg-neutral-600 rounded mb-3"></div>
          <div className="h-4 bg-neutral-600 rounded mb-3"></div>
        </div>
      </div>
    </div>
  )
}
