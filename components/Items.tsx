import Image from 'next/image'
import { useCallback } from 'react'
import { Tooltip, TooltipWrapper, TooltipProvider } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

interface ItemsProps {
  items: Array<Item | null>
  stats: Array<Stat>
}
// 퍼센트로 표기해야하는 옵션 리스트
const PERCENT_OPTIONS = [
  'ratio',
  'cooldown',
  'tenacity',
  'critical',
  'lifesteal',
]

export const Items = ({ items, stats }: ItemsProps) => {
  const createTooltip = (item: Item) => {
    const option = Object.entries(item.option).reduce((acc, cur) => {
      const stat = stats.find((el) => el.id === cur[0])
      const surfix =
        PERCENT_OPTIONS.findIndex((el) =>
          stat?.id.toLowerCase().includes(el)
        ) >= 0
          ? '%'
          : ''
      return (
        acc +
        `<div>${stat?.name} ${
          surfix === '%' ? (cur[1] * 100).toFixed(1) : cur[1]
        }${surfix}</div>`
      )
    }, '')
    const skill = item.skills.reduce((acc, cur) => {
      const skillName = cur.name.replace(
        /\<(\w+)\=(\w+)\>(.+)\<\/(\w+)\>/,
        '$3'
      )
      const skillDesc = cur.desc.replace(/\{.\}/g, '?').replaceAll('\\n', ' ')
      return (
        acc + `<h3 class="mt-2">[${skillName}]</h3> <div>${skillDesc}</div>`
      )
    }, '')

    const tooltip = `
      <h3 class="text-lg mb-2">${item.name}</h3>
      ${option}
      ${skill}
    `
    return tooltip
  }
  return (
    <TooltipProvider>
      <div className="grid grid-cols-6 gap-1 sm:grid-cols-3 sm:gap-2">
        {items.map((item) =>
          item === null ? (
            <div
              className={`border-2 border-common-border relative bg-common-top
            w-[53px] h-[30px] lg:w-[74px] lg:h-[42px]`}
            ></div>
          ) : (
            <TooltipWrapper key={item.code} html={createTooltip(item)}>
              <div
                className={`border-2 border-${item.itemGrade.toLowerCase()}-border relative bg-gradient-to-b from-${item.itemGrade.toLowerCase()}-top to-${item.itemGrade.toLowerCase()}-bottom
                w-[53px] h-[30px] lg:w-[74px] lg:h-[42px]`}
              >
                <Image
                  src={`/images/items/${item.code}.png`}
                  layout="fill"
                  alt={item.name}
                />
              </div>
            </TooltipWrapper>
          )
        )}
      </div>
      <Tooltip className="tooltip" />
    </TooltipProvider>
  )
}
