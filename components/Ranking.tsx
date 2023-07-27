import { useQuery } from '@tanstack/react-query'
import { useRanking } from '../hooks/useRanking'
import Image from 'next/image'
import axios from 'axios'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { mmrToTier } from '../util/mmrToTier'
interface RankingProps {
  gameMode: 'solo' | 'duo' | 'squard'
  count?: number
}

dayjs.extend(utc)

export const Ranking = ({ gameMode, count }: RankingProps) => {
  const { data } = useRanking({ gameMode, count })

  const title = () => {
    if (gameMode === 'solo') return '솔로'
    else if (gameMode === 'duo') return '듀오'
    else if (gameMode === 'squard') return '스쿼드'
  }

  return (
    <article className="card">
      <h2 className="text-xl text-center mb-3">{title()} 랭크 순위</h2>
      <div className="text-center">
        <small>
          {dayjs(data.updateAt).utc(true).local().format('YYYY-MM-DD HH:mm')}{' '}
          기준
        </small>
      </div>
      <table className="table-auto w-full text-center">
        <thead>
          <tr className="border border-none text-lg">
            <th className="py-2">순위</th>
            <th className="py-2">닉네임</th>
            <th className="py-2">티어</th>
            <th className="py-2">LP</th>
          </tr>
        </thead>
        <tbody>
          {data.users.map((el: any, i: number) => {
            const { tier, grade, lp } = mmrToTier(el.mmr, el.rank)
            return (
              <tr key={i} className=" border-b">
                <td className="py-2">{el.rank}</td>
                <td className="py-2">
                  <Link href={`/users/${el.nickname}`}>
                    <span className="hover:underline cursor-pointer">
                      {el.nickname}
                    </span>
                  </Link>
                </td>
                <td className="py-2">
                  {tier}
                  {grade}
                </td>
                <td className="py-2">{lp}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </article>
  )
}

export const RankingSkeleton = () => {
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
