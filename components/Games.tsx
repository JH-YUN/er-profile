import { GameCard, MemoGameCard } from './GameCard'

export const Games = ({
  gameResults,
  getMoreGames,
  characters,
  traits,
  items,
  stats,
}: GamesProps) => {
  const handleMoreGames = () => {
    getMoreGames()
  }
  return (
    <>
      <div className="card flex mb-5 justify-between">
        <h1 className="text-2xl font-bold">
          전적<small>(최근 90일)</small>
        </h1>
      </div>
      {gameResults.map((game, i) => (
        <div className="mb-1" key={game.gameId}>
          <MemoGameCard
            {...game}
            characters={characters}
            traits={traits}
            items={items}
            stats={stats}
          />
        </div>
      ))}

      <button
        type="button"
        className="w-full mt-2 text-white bg-[#1a1b1e] focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        onClick={handleMoreGames}
      >
        더 보기
      </button>
    </>
  )
}
