import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// 특성 정보 react-query
export const useTraits = () => {
  return useQuery(
    ['traits'],
    async (): Promise<Array<Trait>> => {
      const { data } = await axios(
        `${process.env.NEXT_PUBLIC_ER_API_URL}/traits`
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

export default useTraits
