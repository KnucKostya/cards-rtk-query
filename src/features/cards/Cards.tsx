import { ChangeEvent, useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import searchIcon from '@/assets/icons/input_search.svg'
import { Typography } from '@/components/ui/typography'
import { Pagination } from '@/components/ui/pagination'
import { Input } from '@/components/ui/input'
import { EmptyCardsPack } from '@/features/emptyCardsPack'
import { Button } from '@/components/ui/button'
import { PackOptions } from '@/components/modals/pack-options/PackOptions.tsx'
import { Icon } from '@/components/ui/icon'
import { useDebounce } from '@/hooks'
import { Sort } from '@/services/deck-service'
import s from './cards.module.scss'
import { useMeQuery } from '@/services/auth-service'
import { DeleteCard } from '@/components/modals/cards/delete-card/DeleteCard.tsx'
import { AddCardModal } from '@/components/modals/cards/add-new-card/AddNewCard.tsx'
import { EditCardModal } from '@/components/modals/cards/edit-card/EditCard.tsx'
import {
  usePostCardMutation,
  useDeleteCardMutation,
  useGetCardsQuery,
} from '@/services/cardService'
import { CardData, GetCardsQueryParams } from '@/features/cards/Types.ts'
import { PreviousPage } from '@/assets/components/PreviousPage.tsx'
import { CardsTable } from '@/features/cards/cards-table/CardsTable.tsx'
import { CardsModals, NewCardField } from '@/types/common'

export const CardsPack = () => {
  const [question, setQuestion] = useState<string>('')
  const [openModal, setOpenModal] = useState<CardsModals | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [activeCard, setActiveCard] = useState<CardData | undefined>()
  const [sort, setSort] = useState<Sort | null>(null)

  const debouncedInputValue = useDebounce(question)

  const { deckName } = useParams<{ deckName: string }>()

  const location = useLocation()

  const sortedString = useMemo(() => {
    if (!sort) return null

    return `${sort.key}-${sort.direction}` as GetCardsQueryParams['orderBy']
  }, [sort])

  const [createCard] = usePostCardMutation()
  const [editCard] = usePostCardMutation()
  const [deleteCard] = useDeleteCardMutation()
  const { data: userData } = useMeQuery()
  const { data, isLoading } = useGetCardsQuery({
    id: location.state.id || '',
    question: debouncedInputValue,
    currentPage,
    itemsPerPage,
    orderBy: sortedString,
  })

  const paginationSelectOptions: string[] = ['10', '20', '30', '50', '100']
  const inputIcon = <Icon srcIcon={searchIcon} />

  const changeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.currentTarget.value)
  }

  const openModalHandler = (value: CardsModals | null, item?: CardData) => {
    setOpenModal(value)
    setActiveCard(item)
  }

  const createCardHandler = (data: NewCardField) => {
    createCard({ id: location.state.id || '', ...data })
    setOpenModal(null)
  }

  const updateCardHandler = (data: NewCardField) => {
    editCard({ id: activeCard?.id || '', ...data })
    setOpenModal(null)
  }

  const deleteCardHandler = () => {
    if (activeCard?.id) {
      deleteCard({ cardId: activeCard?.id })
    }
  }

  if (isLoading) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>
  }

  if (!data) {
    return <div style={{ textAlign: 'center' }}>NO DATA RECEIVED</div>
  }

  if (!data.items.length) {
    return (
      <EmptyCardsPack
        openModal={openModal}
        deckName={deckName || ''}
        deckId={location.state.id || ''}
        setOpenModal={openModalHandler}
        createDeck={createCardHandler}
      />
    )
  }

  return (
    <div className={s.packContainer}>
      <div className={s.insideContainer}>
        <Button as={Link} to={'/'} variant={'link'} className={s.previousPage}>
          <PreviousPage className={s.arrow} />
          <Typography variant={'body2'}>Back to Deck List</Typography>
        </Button>
        <span className={s.packAddName}>
          <Typography className={s.packName} variant={'large'}>
            {deckName}
            <span style={{ marginLeft: '10px' }}>
              <PackOptions />
              {/*тут ^ будет коллбек по откртию модалок */}
            </span>
          </Typography>
          <Button onClick={() => openModalHandler(CardsModals.CREATE)}>Add New Card</Button>
        </span>
        <div className={s.searchContainer}>
          <Input
            className={s.input}
            placeholder={'Search question'}
            leftSideIcon={inputIcon}
            onChange={changeSearchValue}
            value={question}
            withoutError
          />
        </div>
        <CardsTable
          className={s.table}
          onIconClick={openModalHandler}
          data={data.items}
          sort={sort}
          setSort={setSort}
          currentUserId={userData?.id}
        />
      </div>
      <Pagination
        className={s.pagination}
        currentPage={data.pagination.currentPage}
        pageSize={data.pagination.itemsPerPage}
        totalCount={data.pagination.totalItems}
        options={paginationSelectOptions}
        setItemsPerPage={setItemsPerPage}
        setCurrentPage={setCurrentPage}
      />
      <AddCardModal
        open={openModal}
        name={'Add New Card'}
        setModalState={setOpenModal}
        createCard={createCardHandler}
      />
      <EditCardModal
        open={openModal}
        name={'Edit Card'}
        setModalState={setOpenModal}
        editCard={updateCardHandler}
      />
      {/*<DeleteCard*/}
      {/*  open={openModal}*/}
      {/*  setModalState={setOpenModal}*/}
      {/*  cardQuestion={activeCard?.question}*/}
      {/*  cardId={}*/}
      {/*/>*/}
    </div>
  )
}
