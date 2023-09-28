import { ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

// import s from './DropDownMenu.module.scss'

type SideType = 'top' | 'right' | 'bottom' | 'left' | undefined
type AlignType = 'start' | 'center' | 'end'

export type DropDownMenuPropsType = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: ReactNode
  className?: string
  container?: HTMLElement | null
  side?: SideType
  sideOffset?: number
  align?: AlignType
  alignOffset?: number
}

export const DropDownMenu = (props: DropDownMenuPropsType) => {
  const {
    open,
    onOpenChange,
    children,
    className,
    container,
    side = undefined,
    sideOffset = 0,
    align = 'center',
    alignOffset = 0,
  } = props

  return (
    <DropdownMenu.Root open={open} onOpenChange={onOpenChange}>
      <DropdownMenu.Portal container={container}>
        <DropdownMenu.Content
          className={className}
          sideOffset={sideOffset}
          side={side}
          align={align}
          alignOffset={alignOffset}
          avoidCollisions
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
