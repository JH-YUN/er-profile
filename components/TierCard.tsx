import { memo } from 'react'
import { mmrToTier } from '../util/mmrToTier'

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
    top2,
    top3,
    nickname,
    totalGames,
    totalWins,
    averageRank,
    averageKills,
    averageAssistants,
    averageHunts,
  } = stats
  const { tier, lp, grade } = mmrToTier(mmr, rank, seasonId)
  return (
    <div
      className={`card w-full h-full min-h-[280px] tier-card-${tier.toLowerCase()}`}
    >
      <div className="card-contents">
        <div className="flex">
          <div
            className={`mr-2 flex-shrink-0 flex-grow-0 basis-[5px] bg-${tier.toLowerCase()}`}
          ></div>
          <ul className="text-white text-base font-bold">
            <h2
              className={`text-xl font-semibold leading-3 mb-5 ${`text-${tier.toLowerCase()}`}`}
            >
              {matchginMode(matchingTeamMode)}
            </h2>
            {mmr === 0 ? (
              <li>전적이 없습니다.</li>
            ) : (
              <>
                <li>
                  {tier} {grade} {lp}LP
                </li>
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
            <li>게임 수: {totalGames}</li>
            <li>승률: {winPercent(totalGames, totalWins)}%</li>
            {seasonId > 19 ? (
              <>
                <li>TOP2: {top2 * 100}%</li>
                <li>TOP3: {top3 * 100}%</li>
              </>
            ) : (
              <></>
            )}
            <li>평균 순위: {averageRank}</li>
            <li>평균 킬: {averageKills}</li>
            <li>평균 사냥: {averageHunts}</li>
            {seasonId > 19 ? (
              <>
                <li>평균 어시: {averageAssistants}</li>
              </>
            ) : (
              <></>
            )}
          </ul>
        )}
      </div>
    </div>
  )
}
const MemoTierCard = memo(TierCard)
export { TierCard, MemoTierCard }
