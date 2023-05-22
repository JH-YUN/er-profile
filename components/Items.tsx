import Image from 'next/image'
import { Item } from './Item'
import { Tooltip } from './Tooltip'

interface ItemsProps {
  items: Array<Item | null>
}
// 퍼센트로 표기해야하는 옵션 리스트
const PERCENT_OPTIONS = [
  'ratio',
  'cooldown',
  'tenacity',
  'critical',
  'lifesteal',
]

export const Items = ({ items }: ItemsProps) => {
  return (
    <div className="grid grid-cols-6 gap-1 sm:grid-cols-3 sm:gap-2">
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </div>
  )
}
