export default function RankingSkeleton() {
  return (
    <article className="card">
      <div className="animate-pulse">
        <div className="flex justify-center">
          <div className="h-4 bg-neutral-600 mb-3 w-40"></div>
        </div>
        <div className="flex justify-center">
          <div className="h-2 bg-neutral-600 mt-3 w-32"></div>
        </div>
        <div className="text-center">
          {new Array(10).fill(true).map((el, i) => (
            <div className="h-4 bg-neutral-600 mt-7" key={i}></div>
          ))}
        </div>
      </div>
    </article>
  )
}
