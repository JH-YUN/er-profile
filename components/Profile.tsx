'use client'
import { MemoTierCard } from './TierCard'
import { MemoCharacterCard } from './CharacterCard'
import { useQueries } from '@tanstack/react-query'
import axios from 'axios'
import useCharacters from '@/hooks/useCharacter'
import useCharacterSkins from '@/hooks/useCharacterSkins'

interface ProfileProps {
  userStats: Array<UserStats>
  selectedSeason: string
}

export const Profile = ({ userStats, selectedSeason }: ProfileProps) => {
  const characters = useCharacters()
  const characterSkins = useCharacterSkins()

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
