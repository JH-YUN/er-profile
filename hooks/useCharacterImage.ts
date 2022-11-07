import { useCallback, useEffect, useMemo, useState } from 'react'

export interface ImageOption {
  characterName?: string
  skinIndex?: number
  skinCode?: number
  size?: 'mini' | 'half' | 'full'
  width?: number
  height?: number
}
export const useCharacterImage = (props: ImageOption) => {
  // 스킨 코드를 스킨 인덱스로 변경
  const codeToIndex = (skinCode: number) => {
    return Number(skinCode.toString().slice(-3))
  }

  const [characterName, setCharacterName] = useState<string>(
    props.characterName ?? ''
  )
  const [skinCode, setSkinCode] = useState<number>(props.skinCode ?? 0)
  const [skinIndex, setSkinIndex] = useState<number>(props.skinIndex ?? 0)
  const [size, setSize] = useState<string>(props.size ?? 'mini')

  const imagePath = useMemo<any>(() => {
    return `/images/characters/${characterName}_S${String(skinIndex).padStart(
      3,
      '0'
    )}_${size}.png`
  }, [characterName, skinIndex, size])
  useEffect(() => {
    setCharacterName(props.characterName as string)
    // 인덱스보다 코드에 우선권 부여
    if (props.skinCode) {
      setSkinCode(props.skinCode)
      setSkinIndex(codeToIndex(skinCode))
    } else {
      setSkinIndex(props.skinIndex as number)
    }
    setSize(props.size as string)
  }, [props.characterName, props.skinIndex, props.size, props.skinCode])

  return imagePath
}
