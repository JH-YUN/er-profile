import { Trait } from './Trait'

interface TraitsProps {
  firstCoreTrait: Trait
  firstSubTrait: Array<Trait>
  secondSubTrait: Array<Trait>
}

export const Traits = (props: TraitsProps) => {
  const { firstCoreTrait, firstSubTrait, secondSubTrait } = props

  return (
    <div className="flex flex-col gap-2 lg:mx-[30px]">
      <div className="flex xl:gap-1 items-end">
        <Trait trait={firstCoreTrait} size="main" />
        {firstSubTrait?.map((trait, i) => (
          <Trait trait={trait} size="sub" key={i} />
        ))}
      </div>

      <div className="xl:flex xl:w-[123px] gap-1 items-end justify-end hidden">
        {secondSubTrait.map((trait, i) => (
          <Trait trait={trait} size="sub" key={i} />
        ))}
      </div>
    </div>
  )
}
