import { ReactNode } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import s from './Modal.module.scss'

import { Button, ButtonProps } from '@/components/ui/button'

export type ModalPropsType = ButtonProps & {
  btnTitle: ReactNode
  btnClassName?: string
  children: ReactNode
}

export const Modal = (props: ModalPropsType) => {
  const { variant, btnClassName = '', btnTitle, children } = props

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant={variant} className={btnClassName}>
          {btnTitle}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content className={s.content}>
          {children}
          <Dialog.Close className={s.closeBtn} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
