import { ReactNode } from 'react'

import s from './Card.module.scss'

type Props = {
  children?: ReactNode
  classNameCard?: string
  classNameContent?: string
}
export const Card = (props: Props) => {
  const { children, classNameCard, classNameContent } = props

  const finalCardClassName = `${s.card} ${classNameCard ? s[classNameCard] : ''}`
  const finalContentClassName = `${s.content} ${classNameContent ? s[classNameContent] : ''}`

  return (
    <div className={finalCardClassName}>
      <div className={finalContentClassName}>{children}</div>
    </div>
  )
}
