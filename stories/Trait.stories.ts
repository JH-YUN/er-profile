import type { Meta, StoryObj } from '@storybook/react'
import { Trait } from '../components/Trait'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Trait> = {
  title: 'Trait',
  component: Trait,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Trait>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const MainTrait: Story = {
  args: {
    trait: {
      code: 7000201,
      name: '취약',
      tooltip:
        '동일 실험체에게 기본 공격 또는 개별의 피해를 입히는 스킬(무기, 아이템 스킬 제외)을 3회 적중 시 고정 피해를 추가로 입히며, 대상의 방어력을 감소시킵니다. ',
      traitGameMode: 'LumiaBase',
    },
    size: 'main',
  },
}

export const SubTrait: Story = {
  args: {
    trait: {
      code: 7110201,
      name: '특공대',
      traitGameMode: 'LumiaBase',
      tooltip:
        '주변에 존재하는 자신을 제외한 모든 실험체 수 만큼 받는 피해가 감소합니다.',
    },
    size: 'sub',
  },
}
