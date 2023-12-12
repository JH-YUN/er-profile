'use client'
import { useRouter } from 'next/navigation'

type Props = {
  selectedSeason: string
  seasonList: Season[]
  nickname: string
}

export default function SeasonSelect({
  selectedSeason,
  seasonList,
  nickname,
}: Props) {
  const router = useRouter()
  const onChangeSeason = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/users/${nickname}?season=${e.target.value}`)
  }
  return (
    <select defaultValue={selectedSeason} onChange={onChangeSeason}>
      {seasonList.map((season) => (
        <option key={season.seasonID} value={season.seasonID}>
          {season.seasonName}
        </option>
      ))}
    </select>
  )
}
