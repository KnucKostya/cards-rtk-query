import type { Meta, StoryObj } from '@storybook/react'

import { AddNewDeckModal } from ''
import { DeckModals } from '@/types/common'

const meta = {
  title: 'Modals/AddNewDeck',
  component: AddNewDeckModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onSubmit: {
      description: 'Send form fields data',
    },
  },
} satisfies Meta<typeof AddNewDeckModal>

export default meta
type Story = StoryObj<typeof meta>

export const AddNewDeck: Story = {
  args: {
    open: DeckModals.CREATE,
  },
}
