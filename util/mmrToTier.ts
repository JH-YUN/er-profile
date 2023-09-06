/**
 * MMR 점수를 티어 점수로 변경
 * @param mmr mmr 점수
 * @param rank 랭킹 등수
 * @param seasonId 조회하는 시즌의 시즌 ID
 * @returns 티어, 등급, lp  ex) gold, 3, 21
 */
export const mmrToTier = (
  mmr: number,
  rank: number,
  seasonId: number | string
) => {
  if (typeof seasonId === 'string') seasonId = Number(seasonId)
  let perTierLp // 1티어 단계당 필요한 lp
  // 10 시즌(공식 1.0)부터 1티어당 250lp로 변경
  if (seasonId >= 19) {
    perTierLp = 250
  } else {
    perTierLp = 100
  }
  const a = Math.trunc(mmr / perTierLp)
  let lp = mmr % perTierLp
  let grade: number | string = 4 - (a % 4)
  let tier
  if (a === 0) tier = 'Unrank'
  else if (a < 4) tier = 'Iron'
  else if (a < 8) tier = 'Bronze'
  else if (a < 12) tier = 'Silver'
  else if (a < 16) tier = 'Gold'
  else if (a < 20) tier = 'Platinum'
  else if (a < 24) tier = 'Diamond'
  else {
    lp = mmr - 24 * perTierLp
    grade = '' // 미스릴 이상 티어에서는 grade가 없음
    if (lp >= 200 && rank <= 200) {
      tier = 'Eternity'
      if (seasonId < 19) lp -= 200 // 정식 시즌 이전에는 이터니티 달성시 lp 차감
    } else if (rank > 700 && (seasonId ?? 15) >= 15) {
      tier = 'Mithril' // 시즌8부터 미스릴 티어 추가
    } else {
      tier = 'Demigod'
    }
  }

  return { tier, grade, lp }
}
