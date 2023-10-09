import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TabSwitcher, TabType } from '@/components/ui/tabSwitcher'
import { Slider } from '@/components/ui/slider'
import { Icon } from '@/components/ui/icon'
import deleteIcon from '@/assets/icons/delete_icon.svg'
import { DeckTable } from '@/features/deck-pack/deck-table'
import { ChangeEvent, useMemo, useState } from 'react'
import { Pagination } from '@/components/ui/pagination'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '@/services/deck-service/decks.service.ts'
import { DeckModals, NewDeckNameFields } from '@/types/common'
import { Deck, GetDeckQueryParams, Sort } from '@/types/api'
import { AddNewDeckModal } from '@/components/modals/add-new-deck'
import searchIcon from '@/assets/icons/input_search.svg'
import { EditDeckModal } from '@/components/modals/edit-deck'
import { DeleteDeckModal } from '@/components/modals/delete-deck'
import s from './DeckPack.module.scss'

export const DeckPack = () => {
  const [name, setName] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [activeDeck, setActiveDeck] = useState<Deck | undefined>()
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const [sliderValues, setSliderValues] = useState<number[]>([0, 52])
  const [openModal, setOpenModal] = useState<DeckModals | null>(null)
  const [sort, setSort] = useState<Sort | null>(null)
  const [timerId, setTimerId] = useState<number | null>(null)

  const selectOptions = ['10', '20', '30', '50', '100']

  const tabs: TabType[] = [
    {
      id: '1',
      title: 'My Cards',
    },
    {
      id: '2',
      title: 'All Cards',
    },
  ]

  const minCardsCount = String(sliderValues[0])
  const maxCardsCount = String(sliderValues[1])

  const sortedString = useMemo(() => {
    if (!sort) return null

    return `${sort.key}-${sort.direction}` as GetDeckQueryParams['orderBy']
  }, [sort])

  const [createDeck] = useCreateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()

  const { isLoading, data } = useGetDecksQuery({
    name,
    currentPage,
    itemsPerPage,
    maxCardsCount,
    minCardsCount,
    orderBy: sortedString,
  })

  const clearFilterHandler = () => {
    setName('')
    setSliderValues([0, 52])
  }

  const openModalHandler = (value: DeckModals | null, item?: Deck) => {
    setOpenModal(value)
    setActiveDeck(item)
  }

  const changeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.currentTarget.value

    if (timerId !== null) {
      clearTimeout(timerId)
    }

    const newTimerId = +setTimeout(() => {
      setName(inputValue)
    }, 1500)

    setTimerId(newTimerId)
  }

  const changeSliderHandler = (values: number[]) => {
    setSliderValues(values)
  }

  const deleteDeckHandler = () => {
    deleteDeck({ id: activeDeck?.id || '' })
  }

  const updateDeckHandler = (values: NewDeckNameFields) => {
    const { name, isPrivate } = values

    updateDeck({ id: activeDeck?.id || '', name, isPrivate })
  }

  const inputIcon = <Icon srcIcon={searchIcon} />

  if (isLoading) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>
  }

  if (!data) {
    return <div style={{ textAlign: 'center' }}>NO DATA</div>
  }

  return (
    <div className={s.contentWrapper}>
      <div className={s.deckNameAndButton}>
        <Typography variant={'large'}>Deck&apos;s list</Typography>
        <Button onClick={() => openModalHandler(DeckModals.CREATE)}>
          <Typography>Add new deck</Typography>
        </Button>
      </div>
      <div className={s.tableSettings}>
        <Input
          placeholder={'Search'}
          className={s.searchInput}
          leftSideIcon={inputIcon}
          onChange={changeInputHandler}
        />
        <TabSwitcher label={'Show decks cards'} tabs={tabs} />
        <Slider
          label={'Number of cards'}
          max={data.maxCardsCount}
          onValueChange={changeSliderHandler}
          value={sliderValues}
        />
        <Button variant={'secondary'} onClick={clearFilterHandler}>
          <Icon srcIcon={deleteIcon} />
          <Typography variant={'subtitle2'}>Clear filter</Typography>
        </Button>
      </div>
      <DeckTable data={data.items} onIconClick={openModalHandler} sort={sort} setSort={setSort} />
      <Pagination
        className={s.pagination}
        options={selectOptions}
        totalCount={data.pagination.totalItems}
        currentPage={data.pagination.currentPage}
        pageSize={data.pagination.itemsPerPage}
        onChange={setCurrentPage}
        selectFilterChange={setItemsPerPage}
      />
      <AddNewDeckModal open={openModal} setOpen={setOpenModal} onSubmit={createDeck} />
      <EditDeckModal
        activeItem={activeDeck}
        open={openModal}
        setOpen={setOpenModal}
        onSubmit={updateDeckHandler}
      />
      <DeleteDeckModal deleteCallBack={deleteDeckHandler} open={openModal} setOpen={setOpenModal} />
    </div>
  )
}
