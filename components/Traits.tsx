import Image from 'next/image'
import { useCallback } from 'react'
import { Tooltip, TooltipWrapper, TooltipProvider } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

interface TraitsProps {
  firstCoreTrait: Trait
  firstSubTrait: Array<Trait>
  secondSubTrait: Array<Trait>
}
export const Traits = (props: TraitsProps) => {
  const { firstCoreTrait, firstSubTrait, secondSubTrait } = props
  const createTooltip = useCallback((trait: Trait) => {
    const tooltip = trait.tooltip.replace(/\{.\}/g, '?').replaceAll('\\n', ' ')
    return `
        <h3 class="text-lg mb-2">${trait.name}</h3>
        <span>${tooltip}</span>
      `
  }, [])
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-2 lg:mx-[30px]">
        <div className="flex xl:gap-1 items-end">
          <TooltipWrapper html={createTooltip(firstCoreTrait)}>
            <div className="bg-slate-600 border-2 rounded-full w-[35px] h-[35px] lg:w-[45px] lg:h-[45px] relative">
              <Image
                src={`/images/traits/${firstCoreTrait.code}.png`}
                layout="fill"
                alt={firstCoreTrait.name}
              />
            </div>
          </TooltipWrapper>
          {firstSubTrait?.map((trait, i) => (
            <TooltipWrapper key={trait.code} html={createTooltip(trait)}>
              <div className="bg-slate-600 border-2 rounded-full w-[35px] h-[35px] hidden xl:flex relative">
                <Image
                  src={`/images/traits/${trait.code}.png`}
                  layout="fill"
                  alt={trait.name}
                />
              </div>
            </TooltipWrapper>
          ))}
        </div>

        <div className="xl:flex xl:w-[123px] gap-1 items-end justify-end hidden ">
          {secondSubTrait.map((trait) => (
            <TooltipWrapper key={trait.code} html={createTooltip(trait)}>
              <div className="bg-slate-600 border-2 rounded-full w-[35px] h-[35px] relative">
                <Image
                  src={`/images/traits/${trait.code}.png`}
                  layout="fill"
                  alt={trait.name}
                />
              </div>
            </TooltipWrapper>
          ))}
        </div>
      </div>
      <Tooltip className="tooltip" />
    </TooltipProvider>
  )
}
