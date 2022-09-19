import { useEffect, useState } from 'react'
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

const getWinRate = (wins: number, total: number) => {
  return Math.round((wins / total) * 1000) / 10
}

const CharacterCard = ({
  characterCode,
  totalGames,
  wins,
  top3,
}: CharacterCardProps) => {
  const [character, setCharacter] = useState<Character>()
  const [skins, setSkins] = useState([])
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
              style={{ width: 122, height: 160 }}
            ></div>
            <div className="flex-1">
              <div className="h-4 bg-neutral-600 rounded mb-3"></div>
              <div className="h-4 bg-neutral-600 rounded mb-3"></div>
              <div className="h-4 bg-neutral-600 rounded mb-3"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card mt-2">
          <div className="flex">
            <div className="mr-3">
              <Image
                src={`/images/characters/${character.resource}_S000_Mini.png`}
                width={122}
                height={160}
                alt={character.name}
              />
            </div>
            <ul className="text-white text-base font-bold">
              <li>{character.name}</li>
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
