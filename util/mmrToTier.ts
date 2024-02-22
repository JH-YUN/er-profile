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
  let grade: number | string
  let tier
  let lp
  // 시즌 3 이후 점수 계산
  if (seasonId >= 23) {
    if (mmr < 1600) {
      // 아이언, 브론즈의 디비전 구간 200점
      perTierLp = 200
      const a = Math.trunc(mmr / perTierLp)
      grade = 4 - (a % 4)
      lp = mmr % perTierLp
      if (a < 4) {
        tier = 'Iron'
      } else {
        tier = 'Bronze'
      }
    } else if (mmr < 3600) {
      // 실버, 골드의 디비전 구간 250점
      perTierLp = 250
      const a = Math.trunc((mmr - 1600) / perTierLp)
      grade = 4 - (a % 4)
      lp = (mmr - 1600) % perTierLp
      if (a < 4) {
        tier = 'Silver'
      } else {
        tier = 'Gold'
      }
    } else if (mmr < 4800) {
      // 플래티넘의 디비전 구간 300점
      perTierLp = 300
      const a = Math.trunc((mmr - 3600) / perTierLp)
      grade = 4 - (a % 4)
      lp = (mmr - 3600) % perTierLp
      tier = 'Platinum'
    } else if (mmr < 6200) {
      // 다이아몬드의 디비전 구간 350점
      perTierLp = 350
      const a = Math.trunc((mmr - 4800) / perTierLp)
      grade = 4 - (a % 4)
      lp = (mmr - 4800) % perTierLp
      tier = 'Diamond'
    } else {
      grade = '' // 미스릴 이상은 grade가 없음
      lp = mmr - 6200
      if (mmr >= 6400 && rank <= 200) {
        //  6400점 이상, 랭킹 200위 이내 이터니티
        tier = 'Eternity'
      } else if (mmr >= 6400 && rank <= 700) {
        // 6400점 이상, 랭킹 700위 이내 데미갓
        tier = 'Demigod'
      } else {
        tier = 'Mithril'
      }
    }
  } else {
    // 시즌 2 이전 점수 계산
    // 10 시즌(공식 1.0)부터 1티어당 250lp로 변경
    if (seasonId >= 19) {
      perTierLp = 250
    } else {
      perTierLp = 100
    }
    const a = Math.trunc(mmr / perTierLp)
    lp = mmr % perTierLp
    grade = 4 - (a % 4)
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
  }

  return { tier, grade, lp }
}
