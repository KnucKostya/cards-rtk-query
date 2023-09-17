import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from '@/stories/Checkbox.tsx'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const AdaptiveCheckbox: Story = {}

export const Default: Story = {
  args: {
    checked: false,
  },
}

export const DefaultChecked: Story = {
  args: {
    checked: true,
  },
}
