import { memo, useState } from 'react'
import { CharacterImage } from './CharacterImage'
import { useQueries } from '@tanstack/react-query'
import axios from 'axios'

const getWinRate = (wins: number, total: number) => {
  return Math.round((wins / total) * 1000) / 10
}

export const CharacterCard = ({
  totalGames,
  wins,
  top3,
  character,
  selectedCharacterSkins,
}: CharacterCardProps) => {
  const [selectedSkinIndex, setSelectedSkinIndex] = useState<number>(0)

  const onChangeSkin = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const skinIndex = Number(e.target.value)
    setSelectedSkinIndex(skinIndex)
  }

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
              {selectedCharacterSkins?.map((skin) => (
                <option key={skin.code} value={skin.index}>
                  {skin.index === 0 ? '기본 스킨' : skin.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex">
            <div className="mr-5 mb-2 w-[73px] h-[96px] relative">
              <CharacterImage
                characterName={character.resource}
                skinIndex={selectedSkinIndex}
                size="Mini"
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
