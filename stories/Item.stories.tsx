import type { Meta, StoryObj } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Item } from '../components/Item'

const queryClient = new QueryClient()

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Item> = {
  title: 'Item',
  component: Item,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Item>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const CommonItem: Story = {
  args: {
    item: {
      itemType: 'Weapon',
      modeType: 0,
      code: 114501,
      name: '엘리멘탈보우',
      itemGrade: 'Common',
      weaponType: 'Bow',
      option: {
        skillAmp: 37,
        moveSpeed: 0.06,
        attackPower: 39,
        skillAmpByLevel: 2,
      },
      skills: [
        {
          code: 6008003,
          name: '<color=yellow>스킬 공격 치유 방해</color>',
          type: 'passive',
          desc: '스킬 공격에 피격된 대상의 치유 효과가 {2}초 동안 {1} 감소합니다.',
        },
      ],
    },
  },
}

export const UncommonItem: Story = {
  args: {
    item: {
      itemType: 'Weapon',
      modeType: 0,
      code: 114501,
      name: '엘리멘탈보우',
      itemGrade: 'Uncommon',
      weaponType: 'Bow',
      option: {
        skillAmp: 37,
        moveSpeed: 0.06,
        attackPower: 39,
        skillAmpByLevel: 2,
      },
      skills: [
        {
          code: 6008003,
          name: '<color=yellow>스킬 공격 치유 방해</color>',
          type: 'passive',
          desc: '스킬 공격에 피격된 대상의 치유 효과가 {2}초 동안 {1} 감소합니다.',
        },
      ],
    },
  },
}
export const RareItem: Story = {
  args: {
    item: {
      itemType: 'Weapon',
      modeType: 0,
      code: 114501,
      name: '엘리멘탈보우',
      itemGrade: 'Rare',
      weaponType: 'Bow',
      option: {
        skillAmp: 37,
        moveSpeed: 0.06,
        attackPower: 39,
        skillAmpByLevel: 2,
      },
      skills: [
        {
          code: 6008003,
          name: '<color=yellow>스킬 공격 치유 방해</color>',
          type: 'passive',
          desc: '스킬 공격에 피격된 대상의 치유 효과가 {2}초 동안 {1} 감소합니다.',
        },
      ],
    },
  },
}
export const EpicItem: Story = {
  args: {
    item: {
      itemType: 'Weapon',
      modeType: 0,
      code: 114501,
      name: '엘리멘탈보우',
      itemGrade: 'Epic',
      weaponType: 'Bow',
      option: {
        skillAmp: 37,
        moveSpeed: 0.06,
        attackPower: 39,
        skillAmpByLevel: 2,
      },
      skills: [
        {
          code: 6008003,
          name: '<color=yellow>스킬 공격 치유 방해</color>',
          type: 'passive',
          desc: '스킬 공격에 피격된 대상의 치유 효과가 {2}초 동안 {1} 감소합니다.',
        },
      ],
    },
  },
}
export const LegendItem: Story = {
  args: {
    item: {
      itemType: 'Weapon',
      modeType: 0,
      code: 114501,
      name: '엘리멘탈보우',
      itemGrade: 'Legend',
      weaponType: 'Bow',
      option: {
        skillAmp: 37,
        moveSpeed: 0.06,
        attackPower: 39,
        skillAmpByLevel: 2,
      },
      skills: [
        {
          code: 6008003,
          name: '<color=yellow>스킬 공격 치유 방해</color>',
          type: 'passive',
          desc: '스킬 공격에 피격된 대상의 치유 효과가 {2}초 동안 {1} 감소합니다.',
        },
      ],
    },
  },
}

export const MythicItem: Story = {
  args: {
    item: {
      itemType: 'Weapon',
      modeType: 0,
      code: 114501,
      name: '엘리멘탈보우',
      itemGrade: 'Mythic',
      weaponType: 'Bow',
      option: {
        skillAmp: 37,
        moveSpeed: 0.06,
        attackPower: 39,
        skillAmpByLevel: 2,
      },
      skills: [
        {
          code: 6008003,
          name: '<color=yellow>스킬 공격 치유 방해</color>',
          type: 'passive',
          desc: '스킬 공격에 피격된 대상의 치유 효과가 {2}초 동안 {1} 감소합니다.',
        },
      ],
    },
  },
}
