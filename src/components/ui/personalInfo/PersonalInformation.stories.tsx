import type { Meta } from '@storybook/react'

import { PersonalInformation } from '@/components/ui/personalInfo/PersonalInformation.tsx'

const meta = {
  title: 'Components/Personal-Info',
  component: PersonalInformation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PersonalInformation>

export default meta
// type Story = StoryObj<typeof meta>

// export const DisabledInput: Story = {
//   args: {
//     disabled: true,
//     label: 'Input',
//   },
// }
export const ProfileInfo = () => {
  return <PersonalInformation />
}
