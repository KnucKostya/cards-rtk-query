import type { Meta, StoryObj } from '@storybook/react'

import { SignUp } from '@/components/auth/sign-up/SignUp.tsx'

const meta = {
  title: 'Auth/SignUp',
  component: SignUp,
  tags: ['autodocs'],
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary = () => {
  return <SignUp />
}
