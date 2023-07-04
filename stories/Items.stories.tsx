import type { Meta, StoryObj } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Items } from '../components/Items'

const queryClient = new QueryClient()

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Items> = {
  title: 'Items',
  component: Items,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Items>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const DefaultItems: Story = {
  args: {
    items: [
      {
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
      {
        skills: [],
        itemType: 'Armor',
        modeType: 0,
        code: 202502,
        name: '퀸오브하트',
        itemGrade: 'Legend',
        armorType: 'Chest',
        option: {
          cooldownReduction: 0.3,
          hpRegenRatio: 1,
          uniqueCooldownLimit: 0.1,
          defense: 22,
          skillAmp: 45,
        },
      },
      {
        skills: [],
        itemType: 'Armor',
        modeType: 0,
        code: 201409,
        name: '제국왕관',
        itemGrade: 'Epic',
        armorType: 'Head',
        option: {
          cooldownReduction: 0.12,
          skillAmp: 54,
          defense: 8,
        },
      },
      {
        itemType: 'Armor',
        modeType: 0,
        code: 203501,
        name: '스카디의팔찌',
        itemGrade: 'Legend',
        armorType: 'Arm',
        skills: [
          {
            code: 6019002,
            name: '<color=yellow>한파</color>',
            type: 'passive',
            desc: '스킬로 적에게 피해를 입히면 {4}초간 이동 속도를 {1}%만큼 느리게 만듭니다. (쿨다운 {5}초)',
          },
        ],
        option: {
          maxSp: 350,
          spRegenRatio: 1,
          maxHp: 125,
          skillAmp: 66,
        },
      },
      {
        skills: [],
        itemType: 'Armor',
        modeType: 0,
        code: 204406,
        name: '풍화륜',
        itemGrade: 'Epic',
        armorType: 'Leg',
        option: {
          moveSpeed: 0.27,
          spRegenRatio: 1,
          skillAmp: 23,
        },
      },
      null,
    ],
  },
}
