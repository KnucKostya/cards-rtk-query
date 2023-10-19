// eslint-disable-next-line import/default
import React from 'react'

import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { CardsModals, NewCardField } from '@/types/common'
import { useForm } from 'react-hook-form'
import { ControlledSelector } from '@/components/ui/controlled/controlledSelect'
import { ControlledInput } from '@/components/ui/controlled/controlledInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { newCardSchema } from '@/schemes'
import s from '@/components/modals/cards/edit-card/editCard.module.scss'

type AddCardModalPropsType = {
  open: CardsModals | null
  name: string
  setModalState: (value: CardsModals | null) => void
  createCard: (question: string, answer: string) => void
}

// eslint-disable-next-line import/no-named-as-default-member
export const AddCardModal = React.memo(
  ({ open, setModalState, createCard, name }: AddCardModalPropsType) => {
    const { control, handleSubmit } = useForm<NewCardField>({
      resolver: zodResolver(newCardSchema),
      mode: 'onSubmit',

      defaultValues: {
        selectCardFormat: 'text',
      },
    })

    const data = ['text', 'image']
    const onSubmitHandler = handleSubmit(data => {
      const { Question, Answer } = data

      createCard(Question, Answer)
    })
    const closeModal = () => {
      setModalState(null)
    }

    return (
      <Modal className={s.modal} open={open === CardsModals.CREATE} setModalState={setModalState}>
        <Typography>{name}</Typography>
        <form className={s.form} onSubmit={onSubmitHandler}>
          <div className={s.quizContainer}>
            <ControlledSelector
              triggerClassName={s.select}
              label={'Chose a question format'}
              name={'selectCardFormat'}
              control={control}
              selectData={data}
            ></ControlledSelector>
            <ControlledInput
              className={s.input}
              name={'Question'}
              label={'Question'}
              control={control}
            ></ControlledInput>
            <ControlledInput
              className={s.input}
              name={'Answer'}
              label={'Answer'}
              control={control}
            ></ControlledInput>
          </div>
          <div className={s.btContainer}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type={'submit'} variant={'primary'}>
              <Typography variant={'h2'}>{name}</Typography>
            </Button>
          </div>
        </form>
      </Modal>
    )
  }
)
