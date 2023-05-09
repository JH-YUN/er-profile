import { useQuery } from '@tanstack/react-query'
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
  const { isLoading, isError, error, data } = useQuery(
    ['ranking', gameMode],
    () => {
      return axios
        .get(`${process.env.NEXT_PUBLIC_ER_API_URL}/ranks/${gameMode}`)
        .then((res) => res.data)
    },
    {
      staleTime: 5 * 60 * 1000,
    }
  )

  const title = () => {
    if (gameMode === 'solo') return '솔로'
    else if (gameMode === 'duo') return '듀오'
    else if (gameMode === 'squard') return '스쿼드'
  }

  if (isLoading) return <div>loading...</div>
  if (isError) return <div>error!!</div>
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
