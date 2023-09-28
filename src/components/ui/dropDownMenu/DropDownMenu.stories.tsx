import { ElementRef, useRef, useState } from 'react'

import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { Meta, StoryObj } from '@storybook/react'

import s from './DropDownMenu.stories.module.scss'

import { DropDownMenu } from './'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const meta = {
  title: 'Components/DropDownMenu',
  component: DropDownMenu,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof DropDownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => <PreviewDropDown />,
}

const PreviewDropDown = () => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const buttonRef = useRef<ElementRef<'button'>>(null)
  const openMenu = () => setIsShow(true)
  const onOpenChange = (open: boolean) => {
    setIsShow(open)
  }

  return (
    <Card>
      <Button onClick={openMenu} className={s.button} ref={buttonRef}>
        <DotsVerticalIcon />
      </Button>
      <DropDownMenu
        open={isShow}
        onOpenChange={onOpenChange}
        className={s.content}
        container={buttonRef.current}
        sideOffset={20}
      >
        Hello world
      </DropDownMenu>
    </Card>
  )
}
