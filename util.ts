/**
 * MMR 점수를 티어 점수로 변경
 * @param mmr mmr 점수
 * @param rank 랭킹 등수
 * @param seasonId 조회하는 시즌의 시즌 ID
 * @returns 티어, 등급, lp  ex) gold, 3, 21
 */
export const mmrToTier = (mmr: number, rank: number, seasonId?: number) => {
  const a = Math.trunc(mmr / 100)
  let lp = mmr % 100
  let grade: number | string = a % 4
  let tier
  if (a === 0) tier = 'Unrank'
  else if (a < 4) tier = 'Iron'
  else if (a < 8) tier = 'Bronze'
  else if (a < 12) tier = 'Silver'
  else if (a < 16) tier = 'Gold'
  else if (a < 20) tier = 'Platinum'
  else if (a < 24) tier = 'Diamond'
  else {
    lp = mmr - 2400
    grade = '' // 미스릴 이상 티어에서는 grade가 없음
    // 시즌8부터 미스릴 티어 추가
    if (lp >= 200 && rank <= 200) {
      tier = 'Eternity'
      lp -= 200
    } else if (rank > 700 && (seasonId ?? 15) >= 15) {
      tier = 'Mithril' // 시즌8부터 미스릴 티어 추가
    } else {
      tier = 'Demigod'
    }
  }

  return { tier, grade, lp }
}
