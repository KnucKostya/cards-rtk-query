import type { Meta, StoryObj } from '@storybook/react'
import { DeckModals } from '@/types/common'
import { DeleteDeckModal } from '@/components/modals/delete-deck/DeleteDeckModal.tsx'

const meta = {
  title: 'Modals/DeleteDeck',
  component: DeleteDeckModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DeleteDeckModal>

export default meta
type Story = StoryObj<typeof meta>

export const DeleteDeck: Story = {
  args: {
    open: DeckModals.DELETE,
  },
}
