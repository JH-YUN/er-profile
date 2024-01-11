import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// 스탯 정보 react-query
export const useStats = () => {
  return useQuery(
    ['stats'],
    async (): Promise<Array<Stat>> => {
      const { data } = await axios(
        `${process.env.NEXT_PUBLIC_ER_API_URL}/stats`
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

export default useStats
