import { useCharacterImage } from '../hooks/useCharacterImage'
import Image from 'next/image'
import { memo } from 'react'
import { ChevronUpIcon } from '@heroicons/react/24/solid'
import { MMR } from './MMR'
import dayjs from 'dayjs'
import { Traits } from './Traits'
import { Items } from './Items'

export const GameCard = (props: GameCardProps) => {
  const {
    characters,
    traits,
    items,
    stats,
    characterNum,
    characterLevel,
    gameRank,
    matchingMode,
    matchingTeamMode,
    skinCode,
    bestWeapon,
    bestWeaponLevel,
    versionMajor,
    versionMinor,
    equipment,
    skillLevelInfo,
    skillOrderInfo,
    mmrBefore,
    mmrGain,
    mmrAfter,
    damageToPlayer,
    damageToMonster,
    teamKill,
    accountLevel,
    traitFirstCore,
    traitFirstSub,
    traitSecondSub,
    startDtm,
    playerKill,
    playerAssistant,
    monsterKill,
    playerDeaths,
    playTime,
    routeIdOfStart,
  } = props
  const playerCharaceter = characters.find(
    (character) => character.code === characterNum
  )
  const characterImgPath = useCharacterImage({
    characterName: playerCharaceter?.resource,
    skinCode: skinCode,
    size: 'mini',
  })

  // 특성
  const firstCoreTrait = traits.find((el) => el.code === traitFirstCore)
  const firstSubTrait = traits.filter((el) => traitFirstSub.includes(el.code))
  const secondSubTrait = traits.filter((el) => traitSecondSub.includes(el.code))

  // 아이템
  const equipmentItems = Object.entries(equipment).map(([i, code]) =>
    items.find((item) => item.code === code)
  ) as Array<Item>
  const matchingModeMap: { [key: number]: string } = {
    2: '일반',
    3: '랭크',
  }
  const matchingTeamModeMap: { [key: number]: string } = {
    1: '솔로',
    2: '듀오',
    3: '스쿼드',
    4: '코발트',
  }
  const getGameRank = (rank: number, matchingTeamMode: number) => {
    if (matchingTeamMode === 4) {
      return rank === 1 ? '승리' : '패배'
    } else {
      return rank
    }
  }
  const secondToMinuteSecond = (second: number): string => {
    const min = Math.floor(second / 60)
      .toString()
      .padStart(2, '0')
    const sec = (second % 60).toString().padStart(2, '0')

    return `${min}:${sec}`
  }

  const masteryMap: { [key: number]: string } = {
    1: 'Glove',
    2: 'Tonfa',
    3: 'Bat',
    4: 'Whip',
    5: 'HighAngleFire',
    6: 'DirectFire',
    7: 'Bow',
    8: 'CrossBow',
    9: 'Pistol',
    10: 'AssaultRifle',
    11: 'SniperRifle',
    13: 'Hammer',
    14: 'Axe',
    15: 'OneHandSword',
    16: 'TwoHandSword',
    17: '폴암 (미사용)',
    18: 'DualSword',
    19: 'Spear',
    20: 'Nunchaku',
    21: 'Rapier',
    22: 'Guitar',
    23: 'Camera',
    24: 'Arcana',
    25: 'VFArm',
    101: '함정',
    102: '제작',
    103: '탐색',
    104: '이동',
    201: '체력',
    202: '방어',
    203: '명상',
    204: '사냥',
  }
  return (
    <>
      {playerCharaceter ? (
        <div className="card p-3 md:p-6 w-full flex items-center gap-[10px] md:gap-[20px] text-center flex-wrap sm:flex-nowrap">
          <div className="flex flex-col md:flex-row md:items-center md:basis-[100px] gap-[10px] shrink-0">
            <div className="md:basis-[40px] md:text-left shrink-0">
              #{getGameRank(gameRank, matchingTeamMode)}
            </div>
            <div className="md:basis-[60px] shrink-0">
              <div>{matchingTeamModeMap[matchingTeamMode]}</div>
              <div>{matchingModeMap[matchingMode]}</div>
              <div>
                <small>{`v0.${versionMajor}.${versionMinor}`}</small>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="relative w-[56px] h-[73px] sm:w-[76px] sm:h-[100px] md:w-[96px] md:h-[126px]">
              <Image
                src={characterImgPath}
                layout="fill"
                alt={playerCharaceter?.name}
              />
            </div>
            <div className="flex sm:flex-col sm:self-end">
              <div className="bg-slate-600 border-2 w-[28px] h-[28px] border-r-0 sm:w-[32px] sm:h-[32px] sm:border-b-0 sm:border-r-2 relative">
                <Image
                  src={`/images/items/${masteryMap?.[bestWeapon]}.png`}
                  layout="fill"
                  alt="무기 아이콘"
                />
              </div>
              <div className="bg-slate-600 border-2 w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] relative">
                <span className="sm:align-middle text-sm">
                  {characterLevel}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col basis-[100px] shrink-0">
            <div>
              <small>K / A / H</small>
            </div>
            <div>{`${playerKill} / ${playerAssistant} / ${monsterKill}`}</div>
          </div>
          <Traits
            firstCoreTrait={firstCoreTrait!}
            firstSubTrait={firstSubTrait}
            secondSubTrait={secondSubTrait}
          />
          <Items items={equipmentItems} stats={stats} />
          <div className="hidden lg:flex-col lg:basis-[100px] lg:flex">
            <div>
              <small>MMR</small>
            </div>
            <MMR mmrAfter={mmrAfter} mmrGain={mmrGain} />
          </div>
          <div className="hidden xl:flex-col xl:basis-[100px] xl:flex">
            <div>
              <small>루트 ID</small>
            </div>
            <div>{routeIdOfStart === 0 ? '-' : routeIdOfStart}</div>
          </div>
          <div className="hidden sm:flex sm:flex-col sm:basis-[90px] sm:leading-4 sm:shrink-0">
            <div>
              <small>{dayjs(startDtm).format('YY년 MM월 DD일')}</small>
              <small>{dayjs(startDtm).format('hh시 mm분')}</small>
            </div>
            <div className="mt-2">{secondToMinuteSecond(playTime)}</div>
          </div>
        </div>
      ) : (
        <div className="card w-full">
          <div className="flex animate-pulse">
            <div
              className="mr-3 rounded bg-neutral-600"
              style={{ width: 73.2, height: 96 }}
            ></div>
            <div className="flex-1">
              <div className="h-4 bg-neutral-600 rounded mb-5 w-[200px]"></div>
              <div className="h-4 bg-neutral-600 rounded mb-3"></div>
              <div className="h-4 bg-neutral-600 rounded mb-3"></div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export const MemoGameCard = memo(GameCard)
