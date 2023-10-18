import type { Meta, StoryObj } from '@storybook/react'
import { PageNotFound } from '@/components/ui/404'

const meta = {
  title: 'Components/Page404',
  component: PageNotFound,
} satisfies Meta<typeof PageNotFound>

export default meta
type Story = StoryObj<typeof meta>

export const PageNotFound404: Story = {}
