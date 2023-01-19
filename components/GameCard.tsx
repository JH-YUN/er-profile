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
  )
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
        <div className="card w-full flex items-center gap-[20px] text-center">
          <div className="basis-[50px]">
            #{getGameRank(gameRank, matchingTeamMode)}
          </div>
          <div className="basis-[60px]">
            <div>{matchingTeamModeMap[matchingTeamMode]}</div>
            <div>{matchingModeMap[matchingMode]}</div>
            <div>
              <small>{`v0.${versionMajor}.${versionMinor}`}</small>
            </div>
          </div>
          <div className="flex">
            <Image
              src={characterImgPath}
              width={96}
              height={126}
              placeholder="blur"
              blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
              alt={playerCharaceter?.name}
            />
            <div className="flex flex-col self-end">
              <div className="bg-slate-600 border-2 border-b-0 w-[32px] h-[32px]">
                <Image
                  src={`/images/items/${masteryMap?.[bestWeapon]}.png`}
                  width="32"
                  height="32"
                  alt="무기 아이콘"
                />
              </div>
              <div className="bg-slate-600 border-2 w-[32px] h-[32px]">
                <span className="align-middle">{characterLevel}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col basis-[100px]">
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
          <Items items={equipmentItems!} stats={stats} />
          <div className="flex flex-col basis-[100px]">
            <div>
              <small>MMR</small>
            </div>
            <MMR mmrAfter={mmrAfter} mmrGain={mmrGain} />
          </div>
          <div className="flex flex-col basis-[100px]">
            <div>
              <small>루트 ID</small>
            </div>
            <div>{routeIdOfStart === 0 ? '-' : routeIdOfStart}</div>
          </div>
          <div className="basis-[90px] leading-4">
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
