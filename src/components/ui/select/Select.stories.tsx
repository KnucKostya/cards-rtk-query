import type { Meta, StoryObj } from '@storybook/react'

import { Selector } from '@/components/ui/select/Select.tsx'

const meta = {
  title: 'Components/Selector',
  component: Selector,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Selector>

export default meta
type Story = StoryObj<typeof meta>

export const AuthorisedUser: Story = {
  args: {
    isAuth: true,
  },
}
// export const NotAuthorisedUser: Story = {
//   args: {
//     isAuth: false,
//   },
// }
