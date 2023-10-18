import { Button } from '@/components/ui/button'
import { CardsModals } from '@/types/common'
import { AddCardModal } from '@/components/modals/cards/add-new-card/AddNewCard.tsx'
import s from './emptyPack.module.scss'
import { Typography } from '@/components/ui/typography'

type IEmpty = {
  setModalState: (value: CardsModals | null) => void
  openModal: CardsModals | null
  addNewCardHandler: (question: string, answer: string) => void
}

export const EmptyPack = ({ setModalState, openModal, addNewCardHandler }: IEmpty) => {
  return (
    <div className={s.emptyPack}>
      <Typography className={s.typography} variant={'body1'}>
        This pack is empty. Click add new card to fill this pack
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
    </div>
  )
}
