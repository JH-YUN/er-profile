import { useEffect, useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Profile } from '../../components/Profile'
import { CameraIcon } from '@heroicons/react/20/solid'
import * as htmltoimage from 'html-to-image'
import { Games } from '../../components/Games'
import { HomeIcon } from '@heroicons/react/24/solid'
import { useQueries } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import {
  createErApiAxios,
  createOfficialApiAxios,
} from '../../util/customAxios'

class NotFoundUserError extends Error {
  constructor(msg: string, cause?: any) {
    super(msg)
    this.cause = cause
    this.name = 'NotFoundUserError'
  }
}

const User = ({
  error,
  userStats,
  seasons,
  selectedSeason,
  userNum,
}: userProps) => {
  const router = useRouter()
  const [gameResults, setGameResults] = useState<Array<GameResult>>([])
  const [nextGameId, setNextGameId] = useState<number>()

  const onChangeSeason = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.replace(`/users/${router.query.nickname}?season=${e.target.value}`)
  }
  const erApiAxios = createErApiAxios()
  const officialApiAxios = createOfficialApiAxios()

  const getRecentGames = async (nextGameId: number | string = '') => {
    const res = await officialApiAxios(
      `/user/games/${userNum}?next=${nextGameId}`
    )

    const { userGames, next } = res.data
    setGameResults((prev) => [...prev, ...userGames])
    setNextGameId(next)
  }

  const getMoreGames = async () => {
    getRecentGames(nextGameId)
  }

  useEffect(() => {
    if (!error) {
      getRecentGames()
    }
  }, [])

  // 캡쳐 버튼 클릭시 캡쳐
  const onClickCaputre = async () => {
    if (typeof window !== 'undefined') {
      console.log(htmltoimage)
      const captureNode = document.getElementById('capture-area')
      htmltoimage
        .toJpeg(captureNode!)
        .then((dataUrl) => {
          const link = document.createElement('a')
          link.download = 'my-image-name.jpg'
          link.href = dataUrl
          link.click()
        })
        .catch((err) => {
          alert('캡쳐 실패, 잠시 후 다시 시도해주세요.')
          console.log(err)
        })
    }
  }

  if (error && error === 'NotFoundUserError') return <>존재하지 않는 유저</>
  else if (error) return <>{'에러'}</>
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
          <h1 className="text-2xl font-bold">{`${router.query.nickname}`}</h1>
          <div className="flex gap-3">
            <select defaultValue={selectedSeason} onChange={onChangeSeason}>
              {seasons.map((season) => (
                <option key={season.seasonID} value={season.seasonID}>
                  {season.seasonName}
                </option>
              ))}
            </select>
            <button>
              <CameraIcon
                onClick={onClickCaputre}
                className="h-8 w-8 text-slate-100 transition duration-150 ease-in-out group-hover:text-opacity-80`}"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
        <Profile userStats={userStats} />
        <Games gameResults={gameResults} getMoreGames={getMoreGames} />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // 유저 번호 가져오기
  const getUserNumber = async (nickname: string) => {
    // 공식 api 요청용 axios
    const officialApiAxios = createOfficialApiAxios()

    const response = await officialApiAxios.get(
      `/user/nickname?${new URLSearchParams({
        query: nickname,
      })}`
    )

    return response.data
  }

  // 시즌 리스트 가져오기
  // 프리 시즌이 현재 시즌일경우 제외하고 제거(데이터 없음)
  // 일단 한글화
  const getSeasons = async () => {
    const erApiAxios = createErApiAxios()
    const response = await erApiAxios(`/seasons`)
    const seasons: Array<{
      seasonName: string
      isCurrent: 0 | 1
      seasonID: number
    }> = response.data

    return seasons
      .filter(
        (season) =>
          !season.seasonName.startsWith('Pre') || season.isCurrent === 1
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
  const getUserStats = async (
    userNum: string | number,
    seasonId: string | number
  ) => {
    // 공식 api 요청용 axios
    const officialApiAxios = createOfficialApiAxios()
    const response = await officialApiAxios(
      `/user/stats/${userNum}/${seasonId}`
    )

    if (response.data.code === 404) {
      response.data.userStats = []
    }
    return response.data
  }

  try {
    const { code, user } = await getUserNumber(
      context.params?.nickname as string
    )
    if (code === 404) {
      console.log('404 에러 발생')
      throw new NotFoundUserError('존재하지 않는 닉네임')
    }

    const seasons = await getSeasons()
    let selectedSeason: string | undefined = context.query.season as string
    if (
      selectedSeason === undefined ||
      seasons.findIndex((el) => el.seasonID === Number(selectedSeason)) === -1
    ) {
      selectedSeason = String(
        seasons.find((season) => season.isCurrent === 1)!.seasonID
      )
    }
    let { userStats } = await getUserStats(user.userNum, selectedSeason)

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

    return {
      props: {
        error: false,
        userStats: userStats,
        seasons: seasons,
        selectedSeason: selectedSeason,
        userNum: user.userNum,
      },
    }
  } catch (err) {
    console.log(err)
    if (err instanceof NotFoundUserError) {
      return {
        props: {
          error: err.name,
        },
      }
    } else {
      return {
        props: {
          error: true,
        },
      }
    }
  }
}

export default User
