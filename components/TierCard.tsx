import { memo } from 'react'
import { mmrToTier } from '../util'

// 게임 팀 모드
const matchginMode = (matchingTeamMode: number) => {
  if (matchingTeamMode === 1) return 'SOLO'
  else if (matchingTeamMode === 2) return 'DUO'
  else if (matchingTeamMode === 3) return 'SQUARD'
}

// 상위 퍼센트
const rankPercent = (rank: number, rankSize: number) => {
  return Math.round((rank / rankSize) * 10000) / 100
}

// 승률
const winPercent = (total: number, wins: number) => {
  return Math.round((wins / total) * 1000) / 10
}

const TierCard = (stats: TierCardProps) => {
  const {
    seasonId,
    matchingTeamMode,
    mmr,
    rank,
    rankSize,
    top1,
    nickname,
    totalGames,
    totalWins,
    averageRank,
    averageKills,
    averageHunts,
  } = stats
  const { tier, lp, grade } = mmrToTier(mmr, rank, seasonId)
  return (
    <div
      className="card w-full min-h-[280px]"
      style={{
        backgroundImage: `url('/images/tiers/${tier}.png'), linear-gradient(90deg,  rgb(26, 27, 30) 15%, rgb(var(--color-${tier})))`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 20%, top right',
        backgroundSize: '40%, 100% 48% ',
      }}
    >
      <div className="card-contents">
        <div className="flex">
          <div
            className="mr-2"
            style={{
              backgroundColor: `rgb(var(--color-${tier}))`,
              flex: `0 0 5px`,
            }}
          ></div>
          <ul
            className="text-white text-base font-bold"
            style={{
              backgroundImage: `#fff`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right',
              backgroundSize: '1% 100%',
            }}
          >
            <h2
              className="text-xl font-semibold leading-3 mb-5"
              style={{ color: `rgb(var(--color-${tier})` }}
            >
              {matchginMode(matchingTeamMode)}
            </h2>
            {mmr === 0 ? (
              <li>UNRANKED</li>
            ) : (
              <>
                <li>
                  {tier} {grade} {lp}LP
                </li>
                {/* <li>MMR : {mmr}</li> */}
                <li>
                  {rank}위{' '}
                  <span className="italic">
                    (상위 {rankPercent(rank, rankSize)} %)
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
        {mmr === 0 ? (
          ''
        ) : (
          <ul className="mt-2 font-bold">
            <li>승률: {winPercent(totalGames, totalWins)}%</li>
            <li>게임 수: {totalGames}</li>
            <li>평균 순위: {averageRank}</li>
            <li>평균 킬: {averageKills}</li>
            <li>평균 사냥: {averageHunts}</li>
          </ul>
        )}
      </div>
    </div>
  )
}
const MemoTierCard = memo(TierCard)
export { TierCard, MemoTierCard }
