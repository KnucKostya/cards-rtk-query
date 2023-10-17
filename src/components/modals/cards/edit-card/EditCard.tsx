import s from './editCard.module.scss'
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

type EditCardModalPropsType = {
  open: CardsModals | null
  name: string
  setModalState: (value: CardsModals | null) => void
  editCard: (question: string, answer: string) => void
}

export const EditCardModal = React.memo(
  ({ open, setModalState, editCard, name }: EditCardModalPropsType) => {
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

      console.log(Question, Answer)
      console.log(Question, Answer)
      editCard(Question, Answer)
    })
    const closeModal = () => {
      setModalState(null)
    }

    return (
      <Modal className={s.modal} open={open === CardsModals.UPDATE} setModalState={setModalState}>
        <Typography>{name}</Typography>
        <form onSubmit={onSubmitHandler}>
          <ControlledSelector
            triggerClassName={s.select}
            label={'Chose a question format'}
            name={'selectCardFormat'}
            control={control}
            selectData={data}
          ></ControlledSelector>
          <ControlledInput name={'Question'} label={'Question'} control={control}></ControlledInput>
          <ControlledInput name={'Answer'} label={'Answer'} control={control}></ControlledInput>
          <div className={s.btContainer}>
            <Button onClick={closeModal}>
              <Typography variant={'subtitle2'}>Cancel</Typography>
            </Button>
            <Button type={'submit'} variant={'primary'}>
              <Typography variant={'subtitle2'}>{name}</Typography>
            </Button>
          </div>
        </form>
      </Modal>
    )
  }
)
