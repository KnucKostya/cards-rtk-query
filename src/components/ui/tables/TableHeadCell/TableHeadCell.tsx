import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { clsx } from 'clsx'
import s from './TableHeadCell.module.scss'

type Props = ComponentPropsWithoutRef<'th'>

export const TableHeadCell = forwardRef<HTMLTableCellElement, Props>((props, ref) => {
  const { children, className, ...rest } = props

  const headerCellClassName = clsx(s.headerCell, className)

  return (
    <th ref={ref} className={headerCellClassName} {...rest}>
      {children}
    </th>
  )
})
