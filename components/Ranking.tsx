import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import Link from 'next/link'
import { mmrToTier } from '../util/mmrToTier'

interface RankingProps {
  gameMode: 'solo' | 'duo' | 'squard'
  count?: number
}

dayjs.extend(utc)

export const Ranking = async ({ gameMode, count }: RankingProps) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ER_API_URL}/ranks/${gameMode}?count=${count}`,
    { next: { revalidate: 60 } }
  )

  const data = await res.json()

  const seasonId = data.seasonId

  return (
    <article className="card">
      <h2 className="text-xl text-center mb-3">랭크 순위</h2>
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
            const { tier, grade, lp } = mmrToTier(el.mmr, el.rank, seasonId)
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

export default Ranking
