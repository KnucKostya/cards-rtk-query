import type { Meta, StoryObj } from '@storybook/react'

import { LoginForm } from './LoginForm.tsx'

const meta = {
  title: 'Auth/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary = () => {
  return <LoginForm />
}
