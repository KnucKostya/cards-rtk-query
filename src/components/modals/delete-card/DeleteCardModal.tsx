import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { CardsModals } from '@/features/cards-pack'
import s1 from '@/components/modals/delete-deck/DeleteDeckModal.module.scss'
import s from './DeleteCardModal.module.scss'

type Props = {
  cardName: string | undefined
  openModal: CardsModals | null
  setOpenModal: (value: CardsModals | null) => void
  deleteCallBack: () => void
  cardQuestion?: string
}
export const DeleteCardModal = ({ openModal, setOpenModal, deleteCallBack, cardName }: Props) => {
  const cancelModalHandler = () => {
    setOpenModal(null)
  }

  const deleteCardHandler = () => {
    deleteCallBack()
    setOpenModal(null)
  }

  return (
    <Modal
      className={s1.modal}
      open={openModal === CardsModals.DELETE}
      closeCallBack={cancelModalHandler}
    >
      <Typography className={s1.title} variant={'h2'}>
        Delete Card
      </Typography>
      <Typography className={s.subtitle} variant={'body1'}>
        Do you really want to remove <Typography variant={'subtitle1'}>{cardName}</Typography>?
      </Typography>
      <div className={s1.buttonArea}>
        <Button onClick={cancelModalHandler}>
          <Typography variant={'subtitle2'}>Cancel</Typography>
        </Button>
        <Button onClick={deleteCardHandler}>
          <Typography variant={'subtitle2'}>Delete Card</Typography>
        </Button>
      </div>
    </Modal>
  )
}
