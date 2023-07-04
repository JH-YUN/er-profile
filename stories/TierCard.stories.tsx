import type { Meta, StoryObj } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TierCard } from '../components/TierCard'

const queryClient = new QueryClient()

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof TierCard> = {
  title: 'TierCard',
  component: TierCard,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TierCard>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const UnrankTier: Story = {
  args: {
    seasonId: 9,
    matchingMode: 3,
    matchingTeamMode: 2,
    mmr: 2405,
    nickname: '투끼',
    rank: 1532,
    rankSize: 50038,
    totalGames: 98,
    totalWins: 17,
    totalTeamKills: 345,
    rankPercent: 0.03,
    averageRank: '4.83',
    averageKills: '1.64',
    averageHunts: '15.02',
    top1: 0.17,
    top2: 0.32,
    top3: 0.39,
    top5: 0.53,
    top7: 0.76,
  },
}
