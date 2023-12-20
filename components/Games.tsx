'use client'

import { Suspense, useState } from 'react'
import { MemoGameCard } from './GameCard'
import { GamesSkeleton } from '@/components/skeleton/GamesSkeleton'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
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

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['games'],
    queryFn: async ({ pageParam }) => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER}/api/user/games/${userNum}`,
        {
          params: {
            next: pageParam ?? '',
          },
        }
      )
      return data.userGames ?? []
    },
    getNextPageParam: (lastPage) => {
      if (lastPage) {
        return lastPage.at(-1)?.gameId
      } else {
        return null
      }
    },
    suspense: true,
    initialData: {
      pages: [userGames],
      pageParams: [''],
    },
    cacheTime: 0,
  })

  const handleMoreGames = () => {
    fetchNextPage()
  }

  return (
    <>
      <div className="card flex mb-5 justify-between">
        <h1 className="text-2xl font-bold">
          전적<small>(최근 90일)</small>
        </h1>
      </div>

      <Suspense fallback={<GamesSkeleton count={10} />}>
        {data!.pages.map((page) =>
          page.map((game: GameResult, i: number) => (
            <div className="mb-1" key={game.gameId}>
              <MemoGameCard {...game} />
            </div>
          ))
        )}
      </Suspense>

      <button
        type="button"
        className="w-full mt-2 text-white bg-[#1a1b1e] focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        onClick={handleMoreGames}
      >
        {hasNextPage ? '더 보기' : '마지막 게임입니다.'}
      </button>
    </>
  )
}
