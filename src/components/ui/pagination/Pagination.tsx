import { Selector } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'
import { usePagination } from '@/hooks'
import { clsx } from 'clsx'
import s from './Pagination.module.scss'

type Props = {
  options: string[]
  siblingCount?: number
  totalCount: number
  currentPage: number
  pageSize: number
  onChange: (value: number) => void
  className?: string
  selectFilterChange?: (value: number) => void
}
export const Pagination = (props: Props) => {
  const {
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
    onChange,
    className,
    options,
    selectFilterChange,
  } = props

  const paginationRange = usePagination(totalCount, pageSize, currentPage, siblingCount)

  if (currentPage === 0 || paginationRange.length < 1) {
    return null
  }

  const nextPageHandler = () => {
    onChange(currentPage + 1)
  }

  const previousPageHandler = () => {
    onChange(currentPage - 1)
  }

  const changeSelectFilterHandler = (value: string) => {
    selectFilterChange?.(Number(value))
  }

  const lastPage = paginationRange[paginationRange.length - 1]

  const containerClassName = clsx(s.paginationContainer, className)

  const leftArrowClassName = clsx(s.paginationArrow, currentPage === 1 && s.disabled)

  const rightArrowClassName = clsx(s.paginationArrow, currentPage === lastPage && s.disabled)

  const mappedPages = paginationRange.map((page, index) => {
    const itemClassName = clsx(s.paginationItem, page === currentPage && s.selected)

    const typographyClassName = page === currentPage ? s.textColorDark : s.textColorLight

    if (page === 'DOTS') {
      return (
        <li key={index} className={s.dots}>
          &#8230;
        </li>
      )
    }

    return (
      <li
        key={index}
        className={itemClassName}
        onClick={() => onChange(Number(page))}
        role={'button'}
        aria-label={`page ${page}`}
      >
        <Typography variant={'body2'} className={typographyClassName}>
          {page}
        </Typography>
      </li>
    )
  })

  return (
    <ul className={containerClassName} role={'navigation'} aria-label={'pagination'}>
      <li
        className={leftArrowClassName}
        onClick={previousPageHandler}
        role={'button'}
        aria-label={'previous page'}
      >
        <div className={`${s.arrow} ${s.leftArrow}`} />
      </li>
      {mappedPages}
      <li
        className={rightArrowClassName}
        onClick={nextPageHandler}
        role={'button'}
        aria-label={'next page'}
      >
        <div className={`${s.arrow} ${s.rightArrow}`} />
      </li>
      <div className={s.settings} role={'settings'} aria-label={'pagination page filter'}>
        <Typography variant={'body2'} className={s.textColorLight}>
          Показать
        </Typography>
        <Selector
          triggerClassName={s.trigger}
          contentClassName={s.content}
          value={String(pageSize)}
          setSelectedValue={changeSelectFilterHandler}
          selectData={options}
        />
        <Typography variant={'body2'} className={s.textColorLight}>
          на странице
        </Typography>
      </div>
    </ul>
  )
}
