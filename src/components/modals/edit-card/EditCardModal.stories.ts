import type { Meta, StoryObj } from '@storybook/react'
import { CardsModals } from '@/features/cards-pack'
import { EditCardModal } from '@/components/modals/edit-card'

const meta = {
  title: 'Modals/EditCard',
  component: EditCardModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof EditCardModal>

export default meta
type Story = StoryObj<typeof meta>

export const EditCard: Story = {
  args: {
    openModal: CardsModals.UPDATE,
    activeCard: undefined,
    selectOptions: ['text', 'images'],
  },
}
