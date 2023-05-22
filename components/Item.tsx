import Image from 'next/image'
import { Tooltip } from './Tooltip'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useCallback } from 'react'
import React from 'react'

interface ItemProps {
  item: Item | null
}

// 퍼센트로 표기해야하는 옵션 리스트
const PERCENT_OPTIONS = [
  'ratio',
  'cooldown',
  'tenacity',
  'critical',
  'lifesteal',
]

// 아이템 등급별 class
const itemGradeClass = {
  Common: `border-common-border from-common-top to-common-bottom`,
  Uncommon: `border-uncommon-border from-uncommon-top to-uncommon-bottom`,
  Rare: `border-rare-border from-rare-top to-rare-bottom`,
  Epic: `border-epic-border from-epic-top to-epic-bottom`,
  Legend: `border-legend-border from-legend-top to-legend-bottom`,
  Mythic: `border-mythic-border from-mythic-top to-mythic-bottom`,
}

export const Item = ({ item }: ItemProps) => {
  const { data, isLoading } = useQuery(
    ['stats'],
    async (): Promise<Array<Stat>> => {
      const { data } = await axios(
        `${process.env.NEXT_PUBLIC_ER_API_URL}/stats`
      )

      return data
    }
  )

  const createTooltip = useCallback((item: Item, stats: Array<Stat>) => {
    const options = Object.entries(item.option).map(
      ([optionKey, optionValue], i) => {
        const stat = stats?.find((el) => el.id === optionKey)
        const surfix =
          PERCENT_OPTIONS.findIndex((el) =>
            stat?.id.toLowerCase().includes(el)
          ) >= 0
            ? '%'
            : ''
        return (
          <div key={optionKey}>
            {stat?.name.replace(/\<(.+)\=(.+)\>(.+)\<\/(.+)\>/, '$3')}{' '}
            {surfix === '%' ? (optionValue * 100).toFixed(1) : optionValue}
            {surfix}
          </div>
        )
      }
    )
    const skills = item.skills.map((skill) => {
      const skillName = skill.name.replace(/\<(.+)\=(.+)\>(.+)\<\/(.+)\>/, '$3')
      const skillDesc = skill.desc
        .replace(/\<(.+)\=(.+)\>(.+)\<\/(.+)\>/, '$3')
        .replace(/\{.\}/g, '?')
        .replaceAll('\\n', ' ')

      return (
        <React.Fragment key={skill.code}>
          <h3 className="mt-2">[{skillName}]</h3> <div>{skillDesc}</div>
        </React.Fragment>
      )
    })

    const tooltip = (
      <>
        <h3 className="text-lg mb-2">{item.name}</h3>
        {options.map((el) => el)}
        {skills.map((el) => el)}
      </>
    )
    return tooltip
  }, [])

  if (isLoading) {
    return <></>
  }
  if (item === null) {
    return (
      <div
        className={`border-2 border-common-border relative bg-common-top
    w-[53px] h-[30px] lg:w-[74px] lg:h-[42px]`}
      ></div>
    )
  }
  return (
    <Tooltip message={createTooltip(item, data!)}>
      <div
        className={`border-2 relative bg-gradient-to-b ${
          itemGradeClass[item.itemGrade ?? 'Common']
        }
  w-[53px] h-[30px] lg:w-[74px] lg:h-[42px]`}
      >
        <Image
          src={`/images/items/${item.code}.png`}
          layout="fill"
          alt={item.name}
        />
      </div>
    </Tooltip>
  )
}
