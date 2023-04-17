import { MemoTierCard } from './TierCard'
import { MemoCharacterCard } from './CharacterCard'
import { useQueries, useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface ProfileProps {
  userStats: Array<UserStats>
}

export const Profile = ({ userStats }: ProfileProps) => {
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

  if (characters.isLoading || characterSkins.isLoading) {
    return <></>
  } else {
    return (
      !!characterSkins && (
        <div className="flex flex-col w-full items-center lg:flex-row lg:items-start gap-10 mb-3">
          {userStats.map((stats: any) => (
            <div className="flex flex-col w-full" key={stats.matchingTeamMode}>
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
    )
  }
}
