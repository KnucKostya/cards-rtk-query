import { Table } from '@/components/ui/tables'
import { TableHead } from '@/components/ui/tables/TableHead'
import { TableRow } from '@/components/ui/tables/TableRow'
import { TableHeadCell } from '@/components/ui/tables/TableHeadCell'
import { TableBody } from '@/components/ui/tables/TableBody'
import { TableCell } from '@/components/ui/tables/TableCell'
import { Icon } from '@/components/ui/icon'
import deleteIcon from '@/assets/icons/delete_icon.svg'
import { CardsModals } from '@/types/common'
import { DeleteCard } from '@/components/modals/cards/delete-card/DeleteCard.tsx'
import editIcon from '@/assets/icons/edit_icon.svg'
import { CardData } from '@/features/cards/Types.ts'
import s from './cardsTable.module.scss'
import { EditCardModal } from '@/components/modals/cards/edit-card/EditNewCard.tsx'

type TablePropsType = {
  inputSearchData: CardData[]
  mutateCardHandler: (item: CardData, mutationType: CardsModals) => void
  openModal: CardsModals | null
  setModalState: (openType: CardsModals | null) => void
  itemData: null | CardData
  editCardHandler: (question: string, answer: string) => void
}

const CardsTable = (props: TablePropsType) => {
  const {
    editCardHandler,
    setModalState,
    openModal,
    mutateCardHandler,
    itemData,
    inputSearchData,
  } = props

  return (
    <Table className={s.table}>
      <TableHead>
        <TableRow>
          <TableHeadCell>Question</TableHeadCell>
          <TableHeadCell>Answer</TableHeadCell>
          <TableHeadCell>Last Updated</TableHeadCell>
          <TableHeadCell>Grade</TableHeadCell>
          <TableHeadCell className={s.actionTableCell}></TableHeadCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {inputSearchData.map(item => {
          return (
            <TableRow key={item.id}>
              <TableCell>{item.question}</TableCell>
              <TableCell>{item.answer}</TableCell>
              <TableCell>{new Date(item.updated).toLocaleDateString()}</TableCell>
              <TableCell>{item.grade}</TableCell>
              <TableCell className={s.actions}>
                <Icon
                  className={s.icon}
                  srcIcon={deleteIcon}
                  alt={'delete icon'}
                  onClick={() => mutateCardHandler(item, CardsModals.DELETE)}
                />
                <DeleteCard
                  open={openModal}
                  setModalState={setModalState}
                  cardId={itemData?.id}
                  cardQuestion={itemData?.question}
                />
                <Icon
                  className={s.icon}
                  srcIcon={editIcon}
                  onClick={() => mutateCardHandler(item, CardsModals.UPDATE)}
                  alt={'edit icon'}
                />
                <EditCardModal
                  name={'Edit Card'}
                  open={openModal}
                  setModalState={setModalState}
                  editCard={editCardHandler}
                />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default CardsTable
