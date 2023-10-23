import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { ControlledInput } from '@/components/ui/controlled/controlledInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { Selector } from '@/components/ui/select'
import { useState } from 'react'
import { addNewCardSchema } from '@/schemes'
import { CardsModals, NewCardFields } from '@/features/cards-pack'
import { clsx } from 'clsx'
import { Label } from '@radix-ui/react-label'
import { Icon } from '@/components/ui/icon'
import coverIcon from '@/assets/icons/cover_icon.svg'
import s from './AddNewCardModal.module.scss'
import s1 from '@/components/modals/add-new-deck/AddNewDeckModal.module.scss'
import s2 from '@/components/ui/button/Button.module.scss'

type Props = {
  openModal: CardsModals | null
  setOpenModal: (value: CardsModals | null) => void
  onSubmit?: (data: NewCardFields) => void
  selectOptions?: string[]
}

export const AddNewCardModal = ({ openModal, setOpenModal, onSubmit, selectOptions }: Props) => {
  const [cardType, setCardType] = useState('text')

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewCardFields>({
    resolver: zodResolver(addNewCardSchema),
    mode: 'onSubmit',

    defaultValues: {
      question: '',
      answer: '',
    },
  })

  const onSubmitHandler = handleSubmit(data => {
    onSubmit?.(data)
    closeModalHandler()
  })

  const closeModalHandler = () => {
    setOpenModal(null)
    reset({ question: '', answer: '' })
  }

  const coverButtonStyle = clsx(s2.button, s2.secondary, s2.fullWidth, s.coverButton)

  return (
    <Modal
      className={s1.modal}
      open={openModal === CardsModals.CREATE}
      closeCallBack={closeModalHandler}
    >
      <Typography className={s1.title} variant={'h2'}>
        Add New Card
      </Typography>
      <form className={s1.form} onSubmit={onSubmitHandler}>
        <Selector
          className={s.selector}
          value={cardType}
          setSelectedValue={setCardType}
          label={'Chose a question format'}
          selectData={selectOptions}
        />
        {cardType === 'picture' && (
          <>
            <ControlledInput
              withoutError
              hidden
              control={control}
              name={'questionImg'}
              type={'file'}
              id={'questionImg'}
            />
            <Label htmlFor={'questionImg'} className={coverButtonStyle}>
              <Icon srcIcon={coverIcon} />
              <Typography variant={'subtitle2'}>Change Question Cover</Typography>
            </Label>
          </>
        )}
        <ControlledInput
          className={s.questionInput}
          autoFocus
          name={'question'}
          label={'Question'}
          control={control}
          errorMessage={errors.question?.message}
        />
        {cardType === 'picture' && (
          <>
            <ControlledInput
              withoutError
              hidden
              control={control}
              name={'answerImg'}
              type={'file'}
              id={'answerImg'}
            />
            <Label htmlFor={'answerImg'} className={coverButtonStyle}>
              <Icon srcIcon={coverIcon} />
              <Typography variant={'subtitle2'}>Change Answer Cover</Typography>
            </Label>
          </>
        )}
        <ControlledInput
          className={s.answerInput}
          name={'answer'}
          label={'Answer'}
          control={control}
          errorMessage={errors.answer?.message}
        />
        <div className={s1.buttonArea}>
          <Button type={'button'} variant={'secondary'} onClick={closeModalHandler}>
            <Typography variant={'subtitle2'}>Cancel</Typography>
          </Button>
          <Button type={'submit'} variant={'primary'}>
            <Typography variant={'subtitle2'}>Add Card</Typography>
          </Button>
        </div>
      </form>
    </Modal>
  )
}
