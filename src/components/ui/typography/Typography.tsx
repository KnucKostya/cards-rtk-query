import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import style from './Typography.module.scss'

type Elements = keyof typeof ELEMENTS
type Colors = 'violet' | 'light' | 'grey' | 'error' | 'dark'

type Props<T extends ElementType> = {
  htmlTag?: T
  variant?: Elements
  children?: ReactNode
  className?: string
  color?: Colors
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType = 'p'>(
  props: Props<T> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>
) => {
  const { variant = 'body1', color, className, children, onClick, ...rest } = props

  const Element = ELEMENTS[variant]

  return (
    <Element
      onClick={onClick}
      className={`${style.element} ${className ? style.className : ''}`}
      data-state={variant}
      data-color={color}
      {...rest}
    >
      {children}
    </Element>
  )
}

const ELEMENTS = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  subtitle1: 'p',
  subtitle2: 'p',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  link1: 'a',
  link2: 'a',
  overline: 'p',
  large: 'p',
} as const
