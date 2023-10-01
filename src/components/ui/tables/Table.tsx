import { ComponentPropsWithoutRef, forwardRef } from 'react'

type Props = ComponentPropsWithoutRef<'table'>
export const Table = forwardRef<HTMLTableElement, Props>((props, ref) => {
  const { children, ...rest } = props

  return (
    <table ref={ref} {...rest}>
      {children}
    </table>
  )
})
