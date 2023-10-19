import s from './cards.module.scss'

import { ChangeEvent, memo, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { Typography } from '@/components/ui/typography'
import headerLogo from '@/assets/icons/cardsLogo.png'
import { Pagination } from '@/components/ui/pagination'
import {
  useGetCardsQuery,
  usePatchCardMutation,
  usePostCardMutation,
} from '@/features/cards/CardsApi.ts'
import { Input } from '@/components/ui/input'
import { CardsModals } from '@/types/common'
import { Button } from '@/components/ui/button'
import { CardData } from '@/features/cards/Types.ts'
import { PackOptions } from '@/components/modals/cards/pack-options/PackOptions.tsx'
import CardsTable from '@/features/cards/cards-table/CardsTable.tsx'
import { AddCardModal } from '@/components/modals/cards/add-new-card/AddNewCard.tsx'
import { EmptyPack } from '@/features/cards/EmptyPack/EmptyPack.tsx'

export const Cards = memo(() => {
  const [inputValue, setInputValue] = useState<string>('')
  const [itemData, setItemData] = useState<null | CardData>(null)
  const [openModal, setModalState] = useState<CardsModals | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsOnPage, setItemsOnPage] = useState(10)
  const [postCard] = usePostCardMutation({})
  const [editCard] = usePatchCardMutation({})
  let temporaryPackId = 'clnw7li1r127rvo2q2df0d1ut'
  const { data } = useGetCardsQuery({
    packId: temporaryPackId,
    currentPage,
    itemsPerPage: itemsOnPage,
  })

  const selectOptions = ['10', '20', '30', '50', '100']

  if (!data) {
    return null
  }

  const changeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const inputSearchData = data.items.filter(elements => {
    if (inputValue !== '') {
      return elements.question.includes(inputValue)
    } else {
      return elements
    }
  })

  const addNewCardHandler = async (question: string, answer: string) => {
    const data = { answer, question, packId: temporaryPackId }

    console.log(data)
    try {
      await postCard(data)
      setModalState(null)
    } catch (e) {
      console.log(e)
    }
  }

  const editCardhandler = async (question: string, answer: string) => {
    if (openModal === CardsModals.UPDATE) {
      try {
        await editCard({ question, answer, packId: itemData ? itemData.id : '' })
        setModalState(null)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const mutateCardHandler = (item: CardData, mutationType: CardsModals) => {
    setModalState(mutationType)
    setItemData(item)
  }

  return (
    <div className={s.packContainer}>
      <div className={s.insideContainer}>
        {inputSearchData.length > 0 ? (
          <>
            <>
              <span>
                <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>
                  <label className={s.backToCards}>
                    <FontAwesomeIcon icon={faArrowLeft} style={{ color: '#ffffff' }} />
                    <Typography className={s.backToPacks} variant={'body2'}>
                      Back to Packs List
                    </Typography>
                  </label>
                </Link>
              </span>

              <span className={s.packAddName}>
                <Typography className={s.packName} variant={'large'}>
                  {'packName'}
                  <span style={{ marginLeft: '10px' }}>
                    <PackOptions />
                    {/*тут ^ будет коллбек по откртию модалок */}
                  </span>
                </Typography>

                <Button className={s.bt} onClick={() => setModalState(CardsModals.CREATE)}>
                  Add New Card
                </Button>
                <AddCardModal
                  name={'Add New Card'}
                  open={openModal}
                  setModalState={setModalState}
                  createCard={addNewCardHandler}
                />
              </span>
              <img className={s.packImg} src={headerLogo} alt="" />
              <div className={s.searchContainer}>
                <Input
                  className={s.input}
                  name={'Search input'}
                  onChange={changeSearchValue}
                  value={inputValue}
                />
              </div>
              <CardsTable
                mutateCardHandler={mutateCardHandler}
                setModalState={setModalState}
                editCardHandler={editCardhandler}
                inputSearchData={inputSearchData}
                itemData={itemData}
                openModal={openModal}
              />
            </>
            <Pagination
              currentPage={data.pagination.currentPage}
              pageSize={data.pagination.itemsPerPage}
              totalCount={data.pagination.totalItems}
              options={selectOptions}
              setItemsPerPage={setItemsOnPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        ) : (
          <div className={s.insideContainer}>
            <div className={s.firstContainer}>
              <span>
                <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>
                  <label className={s.backToCards}>
                    <FontAwesomeIcon icon={faArrowLeft} style={{ color: '#ffffff' }} />
                    <Typography className={s.backToPacks} variant={'body2'}>
                      Back to Packs List
                    </Typography>
                  </label>
                </Link>
              </span>

              <span className={s.packAddName}>
                <Typography className={s.packName} variant={'large'}>
                  {'packName'}
                  <span style={{ marginLeft: '10px' }}>
                    <PackOptions />
                    {/*тут ^ будет коллбек по откртию модалок */}
                  </span>
                </Typography>
              </span>
            </div>
            <div className={s.secondContainer}>
              <EmptyPack
                addNewCardHandler={addNewCardHandler}
                setModalState={setModalState}
                openModal={openModal}
              />
            </div>
          </div>
        )}
      </div>
      <Pagination
        currentPage={data.pagination.currentPage}
        pageSize={data.pagination.itemsPerPage}
        totalCount={data.pagination.totalItems}
        options={selectOptions}
        setItemsPerPage={setItemsOnPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
})
