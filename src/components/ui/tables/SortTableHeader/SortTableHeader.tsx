import { ComponentPropsWithoutRef } from 'react'
import { TableHeadCell } from '@/components/ui/tables/TableHeadCell'
import sortDown from '@/assets/icons/sort_down.svg'
import sortUp from '@/assets/icons/sort_up.svg'
import { Icon } from '@/components/ui/icon'
import { Column } from '@/features/deck-pack'
import { Sort } from '@/services/deck-service'
import s from './SortTableHeader.module.scss'

type Props = Omit<
  ComponentPropsWithoutRef<'th'> & {
    columns: Column[]
    sort?: Sort
    onSort?: (sort: Sort) => void
  },
  'children'
>

export const TableHeadCellWithSort = ({ columns, sort, onSort, ...restProps }: Props) => {
  const sortDownIcon = <Icon className={s.sortIcon} srcIcon={sortDown} />
  const sortUpIcon = <Icon className={s.sortIcon} srcIcon={sortUp} />
  const sortHandler = (key: string) => () => {
    if (!onSort || !key) return

    if (sort?.key !== key) {
      return onSort({ key, direction: 'asc' })
    }

    if (sort.direction === 'desc') {
      return onSort(null)
    }

    return onSort({
      key,
      direction: sort?.direction === 'asc' ? 'desc' : 'asc',
    })
  }

  return columns.map(({ title, key }) => (
    <TableHeadCell key={key} onClick={sortHandler(key)} {...restProps}>
      {title}
      {sort && sort.key === key && (
        <span>{sort.direction === 'asc' ? sortUpIcon : sortDownIcon}</span>
      )}
    </TableHeadCell>
  ))
}
