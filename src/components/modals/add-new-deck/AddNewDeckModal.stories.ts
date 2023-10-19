import type { Meta, StoryObj } from '@storybook/react'

import { AddNewDeckModal } from '@/components/modals/add-new-deck/AddNewDeckModal.tsx'
import { DeckModals } from '@/features/deck-pack'

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
