import type { Meta, StoryObj } from '@storybook/react'

import { Header } from '@/components/ui/header/Header.tsx'

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const AuthorisedUser: Story = {
  args: {
    isAuth: true,
  },
}
export const NotAuthorisedUser: Story = {
  args: {
    isAuth: false,
  },
}
