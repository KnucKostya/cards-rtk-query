import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from '@/components/ui/typography/Typography.tsx'

const meta = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const H1: Story = {
  render: () => <Typography variant={'h3'}>Hello bitches</Typography>,
}
