interface MMRprops {
  mmrAfter: number
  mmrGain: number
}
export const MMR = ({ mmrAfter, mmrGain }: MMRprops) => {
  const mmrTag =
    mmrGain > 0 ? (
      <>
        &nbsp; <span className="text-red-500">▲</span>
        {mmrGain}
      </>
    ) : mmrGain < 0 ? (
      <>
        &nbsp; <span className="text-blue-500">▼</span>
        {mmrGain}
      </>
    ) : (
      <span>⁃</span>
    )
  return (
    <div>
      {mmrAfter}
      <small>{mmrTag}</small>
    </div>
  )
}
