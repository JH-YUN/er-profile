import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type Param = {
  userNum: number | string
  next: number | string | undefined | null
}
export const useRecentGame = ({ userNum, next }: Param) => {
  const { data } = useQuery(
    [userNum, next],
    () => {
      return axios
        .get(
          `${process.env.NEXT_PUBLIC_ER_API_URL}/user/games/${userNum}?next=${
            next ?? ''
          }`
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
