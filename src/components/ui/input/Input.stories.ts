import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './Input'

const meta = {
  title: 'ut',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Input',
  },
}
