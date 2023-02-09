interface userProps {
  error: object
  userStats: Array<any>
  seasons: Array<any>
  selectedSeason: string
  userNum: number
}
interface SettingPopoverOption {
  name: string
  isOn: boolean
}
interface Character {
  code: number
  name: string
  resource: string
}

interface CharacterSkin {
  name: string
  index: number
  grade: number
  code: number
  characterCode: number
}
interface GameResult {
  gameId: number
  seasonId: number
  matchingMode: number
  matchingTeamMode: number
  characterNum: number
  skinCode: number
  characterLevel: number
  gameRank: number
  playerKill: number
  playerAssistant: number
  monsterKill: number
  bestWeapon: number
  bestWeaponLevel: number
  equipment: {
    '0': number // 무기
    '1': number // 옷
    '2': number // 머리
    '3': number // 팔
    '4': number // 다리
    '5': number // 장신구
  }
  versionMajor: number
  versionMinor: number
  skillLevelInfo: Array<number>
  skillOrderInfo: Array<number>
  serverName: string
  mmrBefore: number
  mmrAfter: number
  mmrGain: number
  playTime: number
  watchTime: number
  totalTime: number
  damageToPlayer: number
  damageToMonster: number
  teamKill: number
  accountLevel: number
  traitFirstCore: number
  traitFirstSub: number[]
  traitSecondSub: number[]
  startDtm: string
  duration: number
  playerKill: number
  playerAssistant: number
  monsterKill: number
  playerDeaths: number
  routeIdOfStart: number
}

interface CharacterCardProps {
  characterCode: number
  totalGames?: number
  wins?: number
  top3?: number
  character: Character
  characterSkins: Array<CharacterSkin>
}
interface Character {
  code: number
  name: string
  skinCodes: Array<number>
  resource: string
}

interface CharacterSkin {
  name: string
  index: number
  grade: number
  code: number
}

interface GamesProps {
  gameResults: Array<GameResult>
  getMoreGames: Function
  characters: Characters<Character>
  traits: Array<Trait>
  items: Array<Item>
  stats: Array<Stat>
}
interface GameCardProps extends GameResult {
  characters: Array<Character>
  traits: Array<Trait>
  items: Array<Item>
  stats: Array<Stat>
}

interface TierCardProps {
  seasonId: number
  matchingTeamMode: number
  mmr: number
  rank: number
  rankSize: number
  top1: number
  top2: number
  nickname: string
  totalGames: number
  totalWins: number
  averageRank: string
  averageKills: string
  averageHunts: string
  showWinRate: boolean
  showTotalGames: boolean
  showAverageRank: boolean
  showAverageKills: boolean
  showAverageHunts: boolean
}

interface SettingPopoverProps {
  showMode: Array<number>
  showWinRate: boolean
  showTotalGames: boolean
  showAverageRank: boolean
  showAverageKills: boolean
  showAverageHunts: boolean
  setShowMode: Dispatch<SetStateAction<number[]>>
  setShowWinRate: Dispatch<boolean>
  setShowTotalGames: Dispatch<boolean>
  setShowAverageRank: Dispatch<boolean>
  setShowAverageKills: Dispatch<boolean>
  setShowAverageHunts: Dispatch<boolean>
}

interface Item {
  code: number
  name: string
  itemType: 'Weapon' | 'Armor'
  itemGrade: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legend' | 'Mythic'
  skills: Array<ItemSkill>
  option: Object
  modeType: number
  weaponType?: string
  armorType?: string
  desc: string
}
interface ItemSkill {
  code: number
  name: string
  type: 'passive' | 'active'
  desc: string
}

interface Trait {
  code: number
  name: string
  tooltip: string
  traitGameMode: string
}

interface Stat {
  id: string
  name: string
}
