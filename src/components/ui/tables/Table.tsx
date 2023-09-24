import { ReactNode } from 'react'

import s from './Table.module.scss'

export type TablesProps = {
  colored?: boolean
  fullWidth?: boolean
  children: ReactNode
  className?: string
}

export const Table = ({
  colored = false,
  fullWidth = false,
  children,
  className = '',
}: TablesProps) => {
  const finalClassName = `${s.table}
    + ' ' + ${colored ? s.colored : ''}
    + ' ' + ${fullWidth ? s.fullWidth : ''}
    + ' ' + ${className}
    `

  return <div className={finalClassName}>{children}</div>
}
