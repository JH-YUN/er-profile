'use client'
import { MemoTierCard } from './TierCard'
import { MemoCharacterCard } from './CharacterCard'
import { useQueries } from '@tanstack/react-query'
import axios from 'axios'

interface ProfileProps {
  userStats: Array<UserStats>
  selectedSeason: string
}

export const Profile = ({ userStats, selectedSeason }: ProfileProps) => {
  const [characters, characterSkins] = useQueries({
    queries: [
      {
        queryKey: ['characters'],
        queryFn: async (): Promise<Array<Character>> => {
          const { data } = await axios(
            `${process.env.NEXT_PUBLIC_ER_API_URL}/characters`
          )
          return data
        },
      },
      {
        queryKey: ['characterSkins'],
        queryFn: async (): Promise<Array<CharacterSkin>> => {
          const { data } = await axios(
            `${process.env.NEXT_PUBLIC_ER_API_URL}/character-skins`
          )

          return data
        },
      },
    ],
  })

  // 얼리엑세스 시즌은 솔듀스 3개 모드
  // 정규 시즌은 스쿼드 하나
  if (Number(selectedSeason) < 19) {
    return (
      <div className="flex flex-col w-full items-center lg:flex-row lg:items-start gap-10 mb-3">
        {userStats.map((stats: any) => (
          <div
            className="flex flex-col w-full gap-3"
            key={stats.matchingTeamMode}
          >
            <MemoTierCard key={stats.matchingTeamMode} {...stats} />
            {stats.characterStats?.map((characterStat: any) => (
              <MemoCharacterCard
                key={characterStat.characterCode}
                {...characterStat}
                character={characters.data?.find(
                  (el) => el.code === characterStat.characterCode
                )}
                selectedCharacterSkins={characterSkins?.data?.filter(
                  (el) => el.characterCode === characterStat.characterCode
                )}
              />
            ))}
          </div>
        ))}
      </div>
    )
  } else {
    const duoStats: any = userStats[2]
    return (
      <div className="flex flex-col w-full items-center lg:flex-row lg:items-start lg:h-[480px] gap-10 mb-3">
        <MemoTierCard {...duoStats} />
        <div
          className="flex flex-col w-full gap-3"
          key={duoStats.matchingTeamMode}
        >
          {duoStats.characterStats?.map((characterStat: any) => (
            <MemoCharacterCard
              key={characterStat.characterCode}
              {...characterStat}
              character={characters.data?.find(
                (el) => el.code === characterStat.characterCode
              )}
              selectedCharacterSkins={characterSkins?.data?.filter(
                (el) => el.characterCode === characterStat.characterCode
              )}
            />
          ))}
        </div>
      </div>
    )
  }
}
