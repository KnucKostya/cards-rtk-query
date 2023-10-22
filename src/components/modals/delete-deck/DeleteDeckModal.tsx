import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { DeckModals } from '@/features/deck-pack'
import s from './DeleteDeckModal.module.scss'

type Props = {
  deckName: string | undefined
  openModal: DeckModals | null
  setOpenModal: (value: DeckModals | null) => void
  deleteCallBack: () => void
}
export const DeleteDeckModal = ({ openModal, setOpenModal, deleteCallBack, deckName }: Props) => {
  const cancelModalHandler = () => {
    setOpenModal(null)
  }

  const onDelete = () => {
    deleteCallBack()
    setOpenModal(null)
  }

  return (
    <Modal
      className={s.modal}
      open={openModal === DeckModals.DELETE}
      closeCallBack={cancelModalHandler}
    >
      <Typography className={s.title} variant={'h2'}>
        Delete Deck
      </Typography>
      <Typography variant={'body1'}>
        Do you really want to remove <Typography variant={'subtitle1'}>{deckName}</Typography>?
      </Typography>
      <Typography className={s.subtitle}>All cards will be deleted.</Typography>
      <div className={s.buttonArea}>
        <Button onClick={cancelModalHandler} variant={'secondary'}>
          <Typography variant={'subtitle2'}>Cancel</Typography>
        </Button>
        <Button onClick={onDelete}>
          <Typography variant={'subtitle2'}>Delete Deck</Typography>
        </Button>
      </div>
    </Modal>
  )
}
