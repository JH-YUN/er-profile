import { memo } from 'react'

type Tiers =
  | 'iron'
  | 'bronze'
  | 'silver'
  | 'gold'
  | 'platinum'
  | 'diamond'
  | 'mithril'
  | 'demigod'
  | 'eternity'

// mmr 점수를 티어로
const mmrToTier = (mmr: number, rank: number, seasonId: number) => {
  const a = Math.trunc(mmr / 100)
  let lp = mmr % 100
  let grade: number | string = a % 4
  let tier
  if (a === 0) tier = 'unrank'
  else if (a < 4) tier = 'iron'
  else if (a < 8) tier = 'bronze'
  else if (a < 12) tier = 'silver'
  else if (a < 16) tier = 'gold'
  else if (a < 20) tier = 'platinum'
  else if (a < 24) tier = 'diamond'
  else {
    lp = mmr - 2400
    grade = ''
    // 시즌8부터 미스릴 티어 추가
    if (seasonId >= 15) {
      if (rank < 200) {
        tier = 'eternity'
        lp -= 200
      } else if (rank < 700) {
        tier = 'demigod'
      } else tier = 'mithril'
    } else {
      if (lp > 200 && rank < 200) {
        tier = 'eternity'
        lp -= 200
      } else tier = 'demigod'
    }
  }

  return { tier, grade, lp }
}

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
    showWinRate,
    showTotalGames,
    showAverageRank,
    showAverageKills,
    showAverageHunts,
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
            {showWinRate ? (
              <li>승률: {winPercent(totalGames, totalWins)}%</li>
            ) : (
              ''
            )}
            {showTotalGames ? <li>게임 수: {totalGames}</li> : ''}
            {showAverageRank ? <li>평균 순위: {averageRank}</li> : ''}
            {showAverageKills ? <li>평균 킬: {averageKills}</li> : ''}
            {showAverageHunts ? <li>평균 사냥: {averageHunts}</li> : ''}
          </ul>
        )}
      </div>
    </div>
  )
}
const MemoTierCard = memo(TierCard)
export { TierCard, MemoTierCard }
