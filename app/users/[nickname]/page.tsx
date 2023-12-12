import Link from 'next/link'
import { Profile } from '@/components/Profile'
import { Games } from '@/components/Games'
import { HomeIcon } from '@heroicons/react/24/solid'
import SeasonSelect from './SeasonSelect'

class NotFoundUserError extends Error {
  constructor(msg: string, cause?: any) {
    super(msg)
    this.cause = cause
    this.name = 'NotFoundUserError'
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { nickname: string }
  searchParams?: { [key: string]: string | undefined }
}) {
  const userNum = await getUserNumber(params.nickname)
  const initGameResultList = await getRecentGames(userNum)
  const seasonList = await getSeasons()
  let selectedSeason: string | undefined = searchParams?.season

  // 시즌이 없거나, 삭제된 시즌(프리시즌)의 경우 가장 최근 시즌
  if (
    selectedSeason === undefined ||
    seasonList.findIndex((el) => el.seasonID === Number(selectedSeason)) === -1
  ) {
    selectedSeason = String(
      seasonList.find((season) => season.isCurrent === 1)!.seasonID
    )
  }

  let userStats = await getUserStats(userNum, selectedSeason)

  // userStats 검증, 플레이 안한 모드 있을 경우 데이터 추가
  if (userStats.length !== 3) {
    const solo = {
      mmr: 0,
      matchingTeamMode: 1,
      ...userStats.find((el: any) => el.matchingTeamMode === 1),
    }
    const duo = {
      mmr: 0,
      matchingTeamMode: 2,
      ...userStats.find((el: any) => el.matchingTeamMode === 2),
    }
    const squard = {
      mmr: 0,
      matchingTeamMode: 3,
      ...userStats.find((el: any) => el.matchingTeamMode === 3),
    }
    userStats = [solo, duo, squard]
  }

  return (
    <>
      <div className="container">
        <div className="card flex mb-5 justify-between">
          <Link href="/">
            <HomeIcon
              className="h-8 w-8 text-slate-100 transition duration-150 ease-in-out group-hover:text-opacity-80 cursor-pointer"
              aria-hidden="true"
            />
          </Link>
          <h1 className="text-2xl font-bold">{`${decodeURI(
            params.nickname
          )}`}</h1>
          <div className="flex gap-3">
            <SeasonSelect
              selectedSeason={selectedSeason}
              seasonList={seasonList}
              nickname={decodeURI(params.nickname)}
            />
          </div>
        </div>
        <Profile userStats={userStats} selectedSeason={selectedSeason} />
        <Games initGames={initGameResultList} userNum={userNum} />
      </div>
    </>
  )
}

async function getUserNumber(nickname: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/user/nickname?${new URLSearchParams({
      query: nickname,
    })}`,
    { next: { revalidate: 3600 } }
  )

  if (!res.ok) {
    throw new Error('API ERROR')
  }

  const { code, user } = await res.json()
  if (code === 404) {
    throw new NotFoundUserError('존재하지 않는 유저')
  }

  return user.userNum
}

// 시즌 리스트
async function getSeasons() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_ER_API_URL}/seasons`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) {
    throw new Error('API ERROR')
  }
  const data = await res.json()
  const seasons: Array<Season> = data

  return seasons
    .filter(
      (season) => !season.seasonName.startsWith('Pre') || season.isCurrent === 1
    )
    .map((season) => ({
      ...season,
      ...{
        seasonName: season.seasonName
          .replace('Season', '시즌 ')
          .replace('Pre-', '프리'),
      },
    }))
}
// 유저 정보 가져오기
async function getUserStats(
  userNum: string | number,
  seasonId: string | number
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/user/stats/${userNum}/${seasonId}`,
    {
      cache: 'no-cache',
    }
  )
  if (!res.ok) {
    throw new Error('API ERROR')
  }
  let { code, userStats } = await res.json()
  if (code === 404) {
    userStats = []
  }

  return userStats
}

// 최근 게임 가져오기
async function getRecentGames(userNum: string | number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/user/games/${userNum}`,
    {
      cache: 'no-store',
    }
  )
  if (!res.ok) {
    throw new Error('API ERROR')
  }
  const data = await res.json()
  console.log(data.userGames[0].startDtm)
  return data
}
