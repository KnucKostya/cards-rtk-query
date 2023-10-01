import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { clsx } from 'clsx'
import s from './Card.module.scss'

type Props = ComponentPropsWithoutRef<'div'>

export const Card = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, className, ...rest } = props

  const finalCardClassName = clsx(s.card, className)

  return (
    <div ref={ref} className={finalCardClassName} {...rest}>
      {children}
    </div>
  )
})
