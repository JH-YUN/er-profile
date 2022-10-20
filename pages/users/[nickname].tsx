import { useEffect, useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Popover } from '@headlessui/react'
import { TierCard, MemoTierCard } from '../../components/TierCard'
import {
  CharacterCard,
  MemoCharacterCard,
} from '../../components/CharacterCard'
import { SettingPopover } from '../../components/SettingPopover'
import { CameraIcon } from '@heroicons/react/20/solid'
import * as htmltoimage from 'html-to-image'
interface userProps {
  // userNum: number
  error: object
  userStats: Array<any>
  seasons: Array<any>
  selectedSeason: string
}
interface HTTPResponse<T> {
  inError: boolean
  code: number
  message: string
  data?: T
}
interface SettingPopoverOption {
  name: string
  isOn: boolean
}

const User = ({ error, userStats, seasons, selectedSeason }: userProps) => {
  const router = useRouter()
  const onChangeSeason = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.replace(`/users/${router.query.nickname}?season=${e.target.value}`)
  }
  // 캡쳐 버튼 클릭시 캡쳐
  const onClickCaputre = async () => {
    if (typeof window !== 'undefined') {
      console.log(htmltoimage)
      const captureNode = document.getElementById('capture-area')
      htmltoimage
        .toJpeg(captureNode)
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

  const [showMode, setShowMode] = useState<Array<number>>([1, 2, 3])
  const [showWinRate, setShowWinRate] = useState(true)
  const [showTotalGames, setShowTotalGames] = useState(true)
  const [showAverageRank, setShowAverageRank] = useState(true)
  const [showAverageKills, setShowAverageKills] = useState(true)
  const [showAverageHunts, setShowAverageHunts] = useState(true)

  return (
    <>
      <div className="container">
        <div className="card flex mb-5 justify-between">
          <h1 className="text-2xl font-bold">{`${router.query.nickname}의 프로필`}</h1>
          <div className="flex gap-3">
            <select defaultValue={selectedSeason} onChange={onChangeSeason}>
              {seasons.map((season) => (
                <option key={season.seasonID} value={season.seasonID}>
                  {season.seasonName}
                </option>
              ))}
            </select>
            <SettingPopover
              showMode={showMode}
              showWinRate={showWinRate}
              showTotalGames={showTotalGames}
              showAverageRank={showAverageRank}
              showAverageKills={showAverageKills}
              showAverageHunts={showAverageHunts}
              setShowMode={setShowMode}
              setShowWinRate={setShowWinRate}
              setShowTotalGames={setShowTotalGames}
              setShowAverageRank={setShowAverageRank}
              setShowAverageKills={setShowAverageKills}
              setShowAverageHunts={setShowAverageHunts}
            />
            <button>
              <CameraIcon
                onClick={onClickCaputre}
                className="h-8 w-8 text-slate-100 transition duration-150 ease-in-out group-hover:text-opacity-80`}"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
        <div id="capture-area" className="flex gap-10 justify-start">
          {userStats.map((stats: any) => (
            <>
              {
                <div
                  className={`${
                    !showMode.includes(stats.matchingTeamMode) ? 'hidden' : ''
                  } flex flex-col w-full max-w-[400px]`}
                  key={stats.matchingTeamMode}
                >
                  <MemoTierCard
                    key={stats.matchingTeamMode}
                    {...stats}
                    showWinRate={showWinRate}
                    showTotalGames={showTotalGames}
                    showAverageRank={showAverageRank}
                    showAverageKills={showAverageKills}
                    showAverageHunts={showAverageHunts}
                  />
                  {stats.characterStats?.map((characterStat: any) => (
                    <MemoCharacterCard
                      key={characterStat.characterCode}
                      {...characterStat}
                    />
                  ))}
                </div>
              }
            </>
          ))}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // 유저 번호 가져오기
  const getUserNumber = async (nickname: string) => {
    const config = {
      method: 'GET',
      headers: {
        'x-api-key': process.env.API_KEY,
        Accept: 'application/json',
      },
    }
    try {
      const response = await fetch(
        `${process.env.API_URL}/v1/user/nickname?${new URLSearchParams({
          query: nickname,
        })}`,
        config as RequestInit
      )
      if (response.ok) {
        return await response.json()
      } else {
        throw new Error(`get userNum error: ${response.statusText}`)
      }
    } catch (e) {
      console.error(e)
      throw new Error()
    }
  }

  // 시즌 리스트 가져오기
  const getSeasons = () => {
    return [
      {
        seasonID: 1,
        seasonName: '시즌 1',
      },
      {
        seasonID: 3,
        seasonName: '시즌 2',
      },
      {
        seasonID: 5,
        seasonName: '시즌 3',
      },
      {
        seasonID: 7,
        seasonName: '시즌 4',
      },
      {
        seasonID: 9,
        seasonName: '시즌 5',
      },
      {
        seasonID: 11,
        seasonName: '시즌 6',
      },
      {
        seasonID: 13,
        seasonName: '시즌 7',
      },
    ]
  }
  // const getSeasons = async () => {
  //   const config = {
  //     method: 'GET',
  //     headers: {
  //       'x-api-key': process.env.API_KEY,
  //       Accept: 'application/json',
  //     },
  //   }
  //   try {
  //     const response = await fetch(
  //       `${process.env.API_URL}/v1/data/Season`,
  //       config as RequestInit
  //     )
  //     if (response.ok) {
  //       return await response.json()
  //     } else {
  //       throw new Error(`season error: ${response.statusText}`)
  //     }
  //   } catch (e) {
  //     console.error(e)
  //     throw new Error()
  //   }
  // }

  // 유저 정보 가져오기
  const getUserStats = async (
    userNum: string | number,
    seasonId: string | number
  ) => {
    const config = {
      method: 'GET',
      headers: {
        'x-api-key': process.env.API_KEY,
        Accept: 'application/json',
      },
    }

    try {
      const response = await fetch(
        `${process.env.API_URL}/v1/user/stats/${userNum}/${seasonId}`,
        config as RequestInit
      )
      if (response.ok) {
        return await response.json()
      } else {
        throw new Error(`stats error: ${response.statusText}`)
      }
    } catch (e) {
      console.error(e)
      throw new Error()
    }
  }

  try {
    const { code, user } = await getUserNumber(
      context.params?.nickname as string
    )
    const seasons = getSeasons()
    let selectedSeason: string | undefined = context.query.season as string
    if (code === 404) {
      // TODO: 없는 닉네임 입력했을 경우 처리
      console.log('404')
    } else if (code === 429) {
      //TODO: api 요청량 초과 처리
      console.log('429')
    }
    if (
      selectedSeason === undefined ||
      seasons.findIndex((el) => el.seasonID === Number(selectedSeason)) === -1
    ) {
      selectedSeason = String(seasons.at(-1)?.seasonID)
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
      },
    }
  } catch (err) {
    console.error(err)

    return {
      props: {
        error: true,
      },
    }
  }
}

// export const getStaticProps: GetStaticProps = async () => {
//   return {
//     props: {},
//   }
// }

export default User
