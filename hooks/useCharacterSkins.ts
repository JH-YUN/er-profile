import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// 캐릭터스킨 정보 react-query
export const useCharacterSkins = () => {
  return useQuery(
    ['characterSkins'],
    async (): Promise<Array<CharacterSkin>> => {
      const { data } = await axios(
        `${process.env.NEXT_PUBLIC_ER_API_URL}/character-skins`
      )
      return data
    },
    {
      staleTime: 5 * 60 * 1000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  )
}

export default useCharacterSkins
