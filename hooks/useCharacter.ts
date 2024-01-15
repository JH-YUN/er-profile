import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// 캐릭터 정보 react-query
export const useCharacters = () => {
  return useQuery(
    ['characters'],
    async (): Promise<Array<Character>> => {
      const { data } = await axios(
        `${process.env.NEXT_PUBLIC_ER_API_URL}/characters`
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

export default useCharacters
