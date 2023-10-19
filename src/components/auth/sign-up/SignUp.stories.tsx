import type { Meta } from '@storybook/react'

import { SignUp } from '@/components/auth/sign-up/SignUp.tsx'

const meta = {
  title: 'Auth/SignUp',
  component: SignUp,
  tags: ['autodocs'],
} satisfies Meta<typeof SignUp>

export default meta

export const Primary = () => {
  return <SignUp onSubmit={() => {}} />
}
