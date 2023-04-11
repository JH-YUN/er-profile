import { MemoTierCard } from './TierCard'
import { MemoCharacterCard } from './CharacterCard'

interface ProfileProps {
  userStats: Array<UserStats>
  characters: Array<Character>
  characterSkins: Array<CharacterSkin>
}
export const Profile = ({
  userStats,
  characters,
  characterSkins,
}: ProfileProps) => {
  return (
    <div className="flex flex-col w-full items-center lg:flex-row lg:items-start gap-10 mb-3">
      {userStats.map((stats: any) => (
        <div className="flex flex-col w-full" key={stats.matchingTeamMode}>
          <MemoTierCard key={stats.matchingTeamMode} {...stats} />
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
      ))}
    </div>
  )
}
