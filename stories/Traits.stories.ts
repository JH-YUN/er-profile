import type { Meta, StoryObj } from '@storybook/react'
import { Traits } from '../components/Traits'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Traits> = {
  title: 'Traits',
  component: Traits,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Traits>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const LumiaTraits: Story = {
  args: {
    firstCoreTrait: {
      code: 7000201,
      name: '취약',
      tooltip:
        '동일 실험체에게 기본 공격 또는 개별의 피해를 입히는 스킬(무기, 아이템 스킬 제외)을 3회 적중 시 고정 피해를 추가로 입히며, 대상의 방어력을 감소시킵니다. ',
      traitGameMode: 'LumiaBase',
    },
    firstSubTrait: [
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
    ],
    secondSubTrait: [
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
    ],
  },
}
export const CobaltTraits: Story = {
  args: {
    firstCoreTrait: {
      code: 7000201,
      name: '취약',
      tooltip:
        '동일 실험체에게 기본 공격 또는 개별의 피해를 입히는 스킬(무기, 아이템 스킬 제외)을 3회 적중 시 고정 피해를 추가로 입히며, 대상의 방어력을 감소시킵니다. ',
      traitGameMode: 'LumiaBase',
    },
    secondSubTrait: [
      {
        code: 7900102,
        name: '공격력 II',
        traitGameMode: 'Cobalt',
        tooltip: '공격력이 {0} 증가합니다.',
      },
      {
        code: 7923203,
        name: '하이퍼 크리티컬',
        tooltip:
          '스킬 피해에 치명타가 발동합니다. 공격력이 {0}%, 치명타 피해가 {1}% 감소합니다.',
        traitGameMode: 'Cobalt',
      },
      {
        code: 7920501,
        name: '잠꾸러기 I',
        tooltip:
          '{0}초 이상 적에게 피해를 입지 않을 때 매 초마다 잃은 체력과 스태미나의 {1}%를 회복합니다.',
        traitGameMode: 'Cobalt',
      },
    ],
  },
}
