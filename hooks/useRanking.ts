import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface UseRankingProrps {
  gameMode: 'solo' | 'duo' | 'squard'
  count?: number
}
export const useRanking = ({ gameMode, count = 10 }: UseRankingProrps) => {
  const { data } = useQuery(
    ['ranking', gameMode],
    () => {
      return axios
        .get(
          `${process.env.NEXT_PUBLIC_ER_API_URL}/ranks/${gameMode}?count=${count}`
        )
        .then((res) => res.data)
    },
    {
      staleTime: 5 * 60 * 1000,
      suspense: true,
    }
  )

  return { data }
}
