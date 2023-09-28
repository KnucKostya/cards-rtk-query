import { ReactNode } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import s from './Modal.module.scss'

export type ModalPropsType = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: ReactNode
}

export const Modal = ({ open, onOpenChange, children }: ModalPropsType) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
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
