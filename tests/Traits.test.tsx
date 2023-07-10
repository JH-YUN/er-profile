import { Traits } from '../components/Traits'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Traits', () => {
  it('matches snapshot', () => {
    const firstCoreTrait: Trait = {
      code: 7000201,
      name: '취약',
      tooltip:
        '동일 실험체에게 기본 공격 또는 개별의 피해를 입히는 스킬(무기, 아이템 스킬 제외)을 3회 적중 시 고정 피해를 추가로 입히며, 대상의 방어력을 감소시킵니다. ',
      traitGameMode: 'LumiaBase',
    }
    const firstSubTraits: Array<Trait> = [
      {
        code: 7010201,
        name: '복수자',
        tooltip:
          '안전지대 활성화 단계 이후로 자신이 안전지대 안에 있을 때 적에게 입히는 피해가 증가합니다.',
        traitGameMode: 'LumiaBase',
      },
      {
        code: 7010301,
        name: '수확',
        tooltip:
          '자신 또는 자신의 소환물이 입히는 모든 피해만큼 스태미나가 회복됩니다.',
        traitGameMode: 'LumiaBase',
      },
    ]
    const secondSubTraits: Array<Trait> = [
      {
        code: 7110201,
        name: '특공대',
        traitGameMode: 'LumiaBase',
        tooltip:
          '주변에 존재하는 자신을 제외한 모든 실험체 수 만큼 받는 피해가 감소합니다.',
      },
      {
        code: 7110301,
        name: '둔감',
        tooltip: '치명타 피해를 입으면 입는 치명타 피해가 감소합니다.',
        traitGameMode: 'LumiaBase',
      },
    ]
    const utils = render(
      <Traits
        firstCoreTrait={firstCoreTrait}
        firstSubTrait={firstSubTraits}
        secondSubTrait={secondSubTraits}
      />
    )
    expect(utils.container).toMatchSnapshot()
  })
})
