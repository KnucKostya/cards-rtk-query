import { Meta, StoryObj } from '@storybook/react'

import { Table } from '@/components/ui/tables/Table.tsx'

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    colored: {
      options: [true, false],
      control: { type: 'radio' },
    },
    fullWidth: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const UnColoredAndNotFullWidth: Story = {
  args: {
    colored: false,
    children: 'Name',
    fullWidth: false,
  },
}

export const ColoredAndNotFullWidth: Story = {
  args: {
    colored: true,
    children: 'Name',
    fullWidth: false,
  },
}

export const UnColoredAndFullWidth: Story = {
  args: {
    colored: false,
    children: 'Name',
    fullWidth: true,
  },
}

export const ColoredAndFullWidth: Story = {
  args: {
    colored: true,
    children: 'Name',
    fullWidth: true,
  },
}
