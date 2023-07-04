import { mmrToTier } from '../util/mmrToTier'

describe('mmr to tier test after 15 season', () => {
  it('eternity mmr test', () => {
    expect(mmrToTier(3224, 1)).toStrictEqual({
      tier: 'Eternity',
      grade: '',
      lp: 624,
    })
  })
  it('eternity mmr but low rank test', () => {
    expect(mmrToTier(3558, 201)).toStrictEqual({
      tier: 'Demigod',
      grade: '',
      lp: 1158,
    })
  })
  it('demigod mmr test', () => {
    expect(mmrToTier(2593, 112)).toStrictEqual({
      tier: 'Demigod',
      grade: '',
      lp: 193,
    })
  })
  it('demigod mmr but low rank test', () => {
    expect(mmrToTier(2878, 702)).toStrictEqual({
      tier: 'Mithril',
      grade: '',
      lp: 478,
    })
  })
  it('mithril mmr test', () => {
    expect(mmrToTier(2413, 800)).toStrictEqual({
      tier: 'Mithril',
      grade: '',
      lp: 13,
    })
  })
  it('mithril mmr but high rank test', () => {
    expect(mmrToTier(2413, 198)).toStrictEqual({
      tier: 'Demigod',
      grade: '',
      lp: 13,
    })
  })
  it('diamond mmr test', () => {
    expect(mmrToTier(2399, 201)).toStrictEqual({
      tier: 'Diamond',
      grade: 1,
      lp: 99,
    })
  })
  it('platinum mmr test', () => {
    expect(mmrToTier(1886, 800)).toStrictEqual({
      tier: 'Platinum',
      grade: 2,
      lp: 86,
    })
  })

  it('gold mmr test', () => {
    expect(mmrToTier(1386, 800)).toStrictEqual({
      tier: 'Gold',
      grade: 3,
      lp: 86,
    })
  })

  it('silver mmr test', () => {
    expect(mmrToTier(800, 800)).toStrictEqual({
      tier: 'Silver',
      grade: 4,
      lp: 0,
    })
  })
})

describe('mmr to tier test before 15 season', () => {
  it('eternity mmr test', () => {
    expect(mmrToTier(3224, 1, 14)).toStrictEqual({
      tier: 'Eternity',
      grade: '',
      lp: 624,
    })
  })
  it('eternity mmr but low rank test', () => {
    expect(mmrToTier(3558, 201, 14)).toStrictEqual({
      tier: 'Demigod',
      grade: '',
      lp: 1158,
    })
  })
  it('demigod mmr test', () => {
    expect(mmrToTier(2593, 112, 14)).toStrictEqual({
      tier: 'Demigod',
      grade: '',
      lp: 193,
    })
  })
  it('demigod mmr but low rank test', () => {
    expect(mmrToTier(2878, 702, 14)).toStrictEqual({
      tier: 'Demigod',
      grade: '',
      lp: 478,
    })
  })
  it('mithril mmr test', () => {
    expect(mmrToTier(2413, 800, 14)).toStrictEqual({
      tier: 'Demigod',
      grade: '',
      lp: 13,
    })
  })
  it('mithril mmr but high rank test', () => {
    expect(mmrToTier(2413, 198, 14)).toStrictEqual({
      tier: 'Demigod',
      grade: '',
      lp: 13,
    })
  })
})
