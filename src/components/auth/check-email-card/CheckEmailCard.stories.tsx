import type { Meta, StoryObj } from '@storybook/react'

import { CheckEmailCard } from '@/components/auth/check-email-card'
import { BrowserRouter } from 'react-router-dom'

const meta = {
  title: 'Auth/CheckEmailCard',
  component: CheckEmailCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CheckEmailCard>

export default meta
type Story = StoryObj<typeof meta>

export const CheckEmail: Story = {
  render: () => {
    return (
      <BrowserRouter>
        <CheckEmailCard />
      </BrowserRouter>
    )
  },
}
