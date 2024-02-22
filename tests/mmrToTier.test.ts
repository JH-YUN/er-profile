import { mmrToTier } from '../util/mmrToTier'

describe('mmr to tier test after 3 season', () => {
  it('eternity mmr', () => {
    expect(mmrToTier(7919, 1, 23)).toStrictEqual({
      tier: 'Eternity',
      grade: '',
      lp: 1719,
    })
    expect(mmrToTier(6363, 200, 23)).toStrictEqual({
      tier: 'Mithril',
      grade: '',
      lp: 163,
    })
  })
  it('demigod mmr', () => {
    expect(mmrToTier(6463, 201, 23)).toStrictEqual({
      tier: 'Demigod',
      grade: '',
      lp: 263,
    })
    expect(mmrToTier(6198, 400, 23)).toStrictEqual({
      tier: 'Diamond',
      grade: 1,
      lp: 348,
    })
  })
  it('demigod mmr but low rank', () => {
    expect(mmrToTier(6500, 701, 23)).toStrictEqual({
      tier: 'Mithril',
      grade: '',
      lp: 300,
    })
    expect(mmrToTier(6823, 910, 23)).toStrictEqual({
      tier: 'Mithril',
      grade: '',
      lp: 623,
    })
  })
  it('mithril mmr', () => {
    expect(mmrToTier(6266, 1, 23)).toStrictEqual({
      tier: 'Mithril',
      grade: '',
      lp: 66,
    })
  })
  it('diamond mmr', () => {
    expect(mmrToTier(6133, 2, 23)).toStrictEqual({
      tier: 'Diamond',
      grade: 1,
      lp: 283,
    })
  })
  it('platinum mmr', () => {
    expect(mmrToTier(3726, 2268, 23)).toStrictEqual({
      tier: 'Platinum',
      grade: 4,
      lp: 126,
    })
  })
  it('gold mmr', () => {
    expect(mmrToTier(3237, 31967, 23)).toStrictEqual({
      tier: 'Gold',
      grade: 2,
      lp: 137,
    })
  })

  it('silver mmr test', () => {
    expect(mmrToTier(2232, 39571, 23)).toStrictEqual({
      tier: 'Silver',
      grade: 2,
      lp: 132,
    })
  })

  it('bronze mmr test', () => {
    expect(mmrToTier(801, 66805, 23)).toStrictEqual({
      tier: 'Bronze',
      grade: 4,
      lp: 1,
    })
  })

  it('iron mmr test', () => {
    expect(mmrToTier(661, 66805, 23)).toStrictEqual({
      tier: 'Iron',
      grade: 1,
      lp: 61,
    })
  })
})
describe('mmr to tier test after 1.0 season', () => {
  it('eternity mmr', () => {
    expect(mmrToTier(7919, 1, 19)).toStrictEqual({
      tier: 'Eternity',
      grade: '',
      lp: 1919,
    })
    expect(mmrToTier(6363, 200, 19)).toStrictEqual({
      tier: 'Eternity',
      grade: '',
      lp: 363,
    })
  })
  it('demigod mmr', () => {
    expect(mmrToTier(6363, 201, 19)).toStrictEqual({
      tier: 'Demigod',
      grade: '',
      lp: 363,
    })
    expect(mmrToTier(6198, 400, 19)).toStrictEqual({
      tier: 'Demigod',
      grade: '',
      lp: 198,
    })
  })
  it('demigod mmr but low rank', () => {
    expect(mmrToTier(6363, 701, 19)).toStrictEqual({
      tier: 'Mithril',
      grade: '',
      lp: 363,
    })
    expect(mmrToTier(6073, 910, 19)).toStrictEqual({
      tier: 'Mithril',
      grade: '',
      lp: 73,
    })
  })
  it('diamond mmr', () => {
    expect(mmrToTier(5760, 1625, 19)).toStrictEqual({
      tier: 'Diamond',
      grade: 1,
      lp: 10,
    })
  })
  it('gold mmr', () => {
    expect(mmrToTier(3311, 31967, 19)).toStrictEqual({
      tier: 'Gold',
      grade: 3,
      lp: 61,
    })
  })

  it('silver mmr test', () => {
    expect(mmrToTier(2921, 39571, 19)).toStrictEqual({
      tier: 'Silver',
      grade: 1,
      lp: 171,
    })
  })

  it('bronze mmr test', () => {
    expect(mmrToTier(1146, 66805, 19)).toStrictEqual({
      tier: 'Bronze',
      grade: 4,
      lp: 146,
    })
  })
})

describe('mmr to tier test after 15 season and before 1.0 season', () => {
  it('eternity mmr test', () => {
    expect(mmrToTier(3224, 1, 15)).toStrictEqual({
      tier: 'Eternity',
      grade: '',
      lp: 624,
    })
  })
  it('eternity mmr but low rank test', () => {
    expect(mmrToTier(3558, 201, 15)).toStrictEqual({
      tier: 'Demigod',
      grade: '',
      lp: 1158,
    })
  })
  it('demigod mmr test', () => {
    expect(mmrToTier(2593, 112, 15)).toStrictEqual({
      tier: 'Demigod',
      grade: '',
      lp: 193,
    })
  })
  it('demigod mmr but low rank test', () => {
    expect(mmrToTier(2878, 702, 15)).toStrictEqual({
      tier: 'Mithril',
      grade: '',
      lp: 478,
    })
  })
  it('mithril mmr test', () => {
    expect(mmrToTier(2413, 800, 15)).toStrictEqual({
      tier: 'Mithril',
      grade: '',
      lp: 13,
    })
  })
  it('mithril mmr but high rank test', () => {
    expect(mmrToTier(2413, 198, 15)).toStrictEqual({
      tier: 'Demigod',
      grade: '',
      lp: 13,
    })
  })
  it('diamond mmr test', () => {
    expect(mmrToTier(2399, 201, 15)).toStrictEqual({
      tier: 'Diamond',
      grade: 1,
      lp: 99,
    })
  })
  it('platinum mmr test', () => {
    expect(mmrToTier(1886, 800, 15)).toStrictEqual({
      tier: 'Platinum',
      grade: 2,
      lp: 86,
    })
  })

  it('gold mmr test', () => {
    expect(mmrToTier(1386, 800, 15)).toStrictEqual({
      tier: 'Gold',
      grade: 3,
      lp: 86,
    })
  })

  it('silver mmr test', () => {
    expect(mmrToTier(800, 800, 15)).toStrictEqual({
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
