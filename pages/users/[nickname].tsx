import { useEffect, useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Popover } from '@headlessui/react'
import { TierCard, MemoTierCard } from '../../components/TierCard'
import { MemoCharacterCard } from '../../components/CharacterCard'
import { SettingPopover } from '../../components/SettingPopover'
import { CameraIcon } from '@heroicons/react/20/solid'
import * as htmltoimage from 'html-to-image'
import { Games } from '../../components/Games'
import { RssIcon } from '@heroicons/react/24/solid'

const User = ({
  error,
  userStats,
  seasons,
  selectedSeason,
  userNum,
}: userProps) => {
  const router = useRouter()
  const [characters, setCharacters] = useState<Array<Character>>([])
  const [characterSkins, setCharacterSkins] = useState<Array<CharacterSkin>>([])
  const [items, setItems] = useState<Array<Item>>([])
  const [traits, setTraits] = useState<Array<Trait>>([])
  const [stats, setStats] = useState<Array<Stat>>([])
  const [gameResults, setGameResults] = useState<Array<GameResult>>([])
  const [nextGameId, setNextGameId] = useState<number>()

  const onChangeSeason = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.replace(`/users/${router.query.nickname}?season=${e.target.value}`)
  }

  const getCharacters = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ER_API_URL}/characters`)
    if (res.ok) {
      setCharacters(await res.json())
    }
  }
  const getCharacterSkins = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ER_API_URL}/character-skins`
    )
    if (res.ok) {
      const skins = await res.json()
      setCharacterSkins(skins)
    }
  }
  const getItems = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ER_API_URL}/items`)
    if (res.ok) {
      const items = await res.json()
      setItems(items)
    }
  }
  const getTraits = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ER_API_URL}/traits`)
    if (res.ok) {
      const traits = await res.json()
      setTraits(traits)
    }
  }

  const getStats = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ER_API_URL}/stats`)
    if (res.ok) {
      const stats = await res.json()
      setStats(stats)
    }
  }

  const getRecentGames = async (next: number | string = '') => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/user-games/${userNum}?next=${next}`
    )
    if (res.ok) {
      const { userGames, next } = await res.json()
      setGameResults((prev) => [...prev, ...userGames])
      setNextGameId(next)
    }
  }

  const getMoreGames = async () => {
    getRecentGames(nextGameId)
  }

  useEffect(() => {
    getCharacters()
    getCharacterSkins()
    getItems()
    getRecentGames()
    getTraits()
    getStats()
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
        <div
          id="capture-area"
          className="flex flex-col w-full items-center lg:flex-row lg:items-start gap-10  mb-3"
        >
          {userStats.map((stats: any) => (
            <>
              {
                <div
                  className={`${
                    !showMode.includes(stats.matchingTeamMode) ? 'hidden' : ''
                  } flex flex-col w-full`}
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
                      character={characters.find(
                        (el) => el.code === characterStat.characterCode
                      )}
                      characterSkins={characterSkins.filter(
                        (el) => el.characterCode === characterStat.characterCode
                      )}
                    />
                  ))}
                </div>
              }
            </>
          ))}
        </div>
        <Games
          gameResults={gameResults}
          getMoreGames={getMoreGames}
          characters={characters}
          traits={traits}
          items={items}
          stats={stats}
        />
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
  // 프리 시즌이 현재 시즌일경우 제외하고 제거(데이터 없음)
  // 일단 한글화
  const getSeasons = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ER_API_URL}/seasons`)
    const seasons: Array<{
      seasonName: string
      isCurrent: 0 | 1
      seasonID: number
    }> = await res.json()

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
    const seasons = await getSeasons()
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
    console.error(err)

    return {
      props: {
        error: true,
      },
    }
  }
}

export default User
