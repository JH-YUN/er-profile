import { useEffect, useState } from 'react'
import { ImageFallback } from './ImageFallback'
import Image from 'next/image'

export interface CharacterImageProps {
  characterName?: string
  skinIndex?: number
  skinCode?: number
  size?: 'Mini' | 'Half' | 'Full'
  width?: number
  height?: number
}

export const CharacterImage = (props: CharacterImageProps) => {
  const { characterName, skinIndex, skinCode, size, width, height } = props

  // 인덱스보다 코드에 우선권 부여
  const code = skinCode ? Number(skinCode.toString().slice(-3)) : skinIndex

  return (
    <ImageFallback
      src={`/images/characters/${characterName}_S${String(code).padStart(
        3,
        '0'
      )}_${size}.png`}
      fallbackSrc={`/images/characters/${characterName}_S000_${size}.png`}
      fill={true}
      alt={characterName as string}
    />
  )
}
