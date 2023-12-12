import Image from 'next/image'
import { useCallback } from 'react'
import { Tooltip } from './Tooltip'

interface TraitProps {
  trait: Trait
  size: 'main' | 'sub'
}

export const Trait = ({ trait, size }: TraitProps) => {
  const createTooltip = useCallback((trait: Trait) => {
    const tooltip = trait?.tooltip
      ?.replace(/\{.\}/g, '?')
      .replaceAll('\\n', ' ')
    return (
      <>
        <h3 className="text-lg mb-2">{trait.name}</h3>
        <span>{tooltip}</span>
      </>
    )
  }, [])
  const sizeClass = {
    main: `lg:w-[45px] lg:h-[45px] w-[35px] h-[35px]`,
    sub: `w-[35px] h-[35px] hidden xl:block`,
  }
  return (
    <Tooltip message={createTooltip(trait)}>
      <div
        className={`bg-slate-600 border-2 rounded-full relative ${sizeClass[size]}`}
      >
        <Image
          src={`/images/traits/${trait.code}.png`}
          alt={trait.name}
          fill
          sizes="100vw"
        />
      </div>
    </Tooltip>
  )
}
