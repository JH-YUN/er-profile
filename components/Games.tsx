'use client'

import { Suspense, useState } from 'react'
import { MemoGameCard } from './GameCard'
import { GamesSkeleton } from '@/components/skeleton/GamesSkeleton'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type GamesProps = {
  initGames: {
    next: number
    userGames: Array<GameResult>
  }
  userNum: number
}

export const Games = ({ initGames, userNum }: GamesProps) => {
  const { next, userGames } = initGames
  const [nextGameId, setNextGameId] = useState<number>(next)

  const { isLoading, data } = useQuery<Array<GameResult>>(
    ['games', nextGameId],
    async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER}/api/user/games/${userNum}?next=${nextGameId}`
      )

      return data.userGames
    },
    {
      initialData: userGames,
      // cacheTime: 0,
      // staleTime: 0,
    }
  )
  const [gameList, setGameList] = useState<Array<GameResult>>(data)

  const handleMoreGames = () => {
    setGameList([...gameList, ...data])
    setNextGameId(data.at(-1)!.gameId)
  }

  return (
    <>
      <div className="card flex mb-5 justify-between">
        <h1 className="text-2xl font-bold">
          전적<small>(최근 90일)</small>
        </h1>
      </div>
      <div>
        {/* {initGameList.map((game, i) => (
          <div className="mb-1" key={game.gameId}>
            <MemoGameCard {...game} />
          </div>
        ))} */}
      </div>
      <Suspense fallback={<GamesSkeleton count={10} />}>
        {gameList.map((game, i) => (
          <div className="mb-1" key={game.gameId}>
            <MemoGameCard {...game} />
          </div>
        ))}
      </Suspense>

      <button
        type="button"
        className="w-full mt-2 text-white bg-[#1a1b1e] focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        onClick={handleMoreGames}
      >
        더 보기
      </button>
    </>
  )
}
