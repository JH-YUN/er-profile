import { memo, useEffect, useState } from 'react'
import Image from 'next/image'
interface CharacterCardProps {
  characterCode: number
  totalGames?: number
  wins?: number
  top3?: number
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
}

const getWinRate = (wins: number, total: number) => {
  return Math.round((wins / total) * 1000) / 10
}

const createSkinImageName = (
  characterName: string,
  skinIndex: number,
  size: 'mini' | 'half' | 'full' = 'mini'
) => {
  const maxIndexLen = 3

  return `${characterName}_S${String(skinIndex).padStart(
    maxIndexLen,
    '0'
  )}_${size}`
}

const CharacterCard = ({
  characterCode,
  totalGames,
  wins,
  top3,
}: CharacterCardProps) => {
  const [character, setCharacter] = useState<Character>()
  const [skins, setSkins] = useState<Array<CharacterSkin>>([])
  const [seletedSkinIndex, setSelectedSkinIndex] = useState<number>(0)
  const getCharacter = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/characters/${characterCode}`
    )
    if (res.ok) {
      setCharacter(await res.json())
    }
  }
  const getCharacterSkins = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/character-skins/${characterCode}`
    )
    if (res.ok) {
      setSkins(await res.json())
    }
  }

  const onChangeSkin = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const skinIndex = Number(e.target.value)
    setSelectedSkinIndex(skinIndex)
  }
  useEffect(() => {
    getCharacter()
    getCharacterSkins()
  }, [])
  return (
    <>
      {!character ? (
        <div className="card mt-2">
          <div className="flex animate-pulse">
            <div
              className="mr-3 rounded bg-neutral-600"
              style={{ width: 73.2, height: 96 }}
            ></div>
            <div className="flex-1">
              <div className="h-4 bg-neutral-600 rounded mb-3"></div>
              <div className="h-4 bg-neutral-600 rounded mb-3"></div>
              <div className="h-4 bg-neutral-600 rounded mb-3"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card mt-2 py-2 px-4">
          <div className="text-right mb-2">
            <select className="w-[100px]" onChange={onChangeSkin}>
              {skins.map((skin) => (
                <option key={skin.code} value={skin.index}>
                  {skin.index === 0 ? '기본 스킨' : skin.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex">
            <div className="mr-5">
              <Image
                src={`/images/characters/${createSkinImageName(
                  character.resource,
                  seletedSkinIndex
                )}.png`}
                width={73.2}
                height={96}
                alt={character.name}
              />
            </div>
            <ul className="text-white text-base font-bold self-center">
              {/* <li>{character.nameKor}</li> */}
              {totalGames ? <li>게임 수: {totalGames}</li> : ''}
              {wins !== undefined && totalGames !== undefined ? (
                <li>승률: {getWinRate(wins, totalGames)}%</li>
              ) : (
                ''
              )}
              {top3 !== undefined && totalGames !== undefined ? (
                <li>TOP3: {getWinRate(top3, totalGames)}%</li>
              ) : (
                ''
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default CharacterCard

export const MemoCharacterCard = memo(CharacterCard)
