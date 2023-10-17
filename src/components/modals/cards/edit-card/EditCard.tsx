import s from './editCard.module.scss'
// eslint-disable-next-line import/default
import React, { useState } from 'react'

import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { CardsModals, NewCardField } from '@/types/common'
import { useForm } from 'react-hook-form'
import { ControlledSelector } from '@/components/ui/controlled/controlledSelect'
import { ControlledInput } from '@/components/ui/controlled/controlledInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { newCardSchema } from '@/schemes'
import { toast } from 'react-toastify'

type EditCardModalPropsType = {
  open: CardsModals | null
  name: string
  setModalState: (value: CardsModals | null) => void
  editCard: (question: string, answer: string) => void
}

export const EditCardModal = React.memo(
  ({ open, setModalState, editCard, name }: EditCardModalPropsType) => {
    const [fileFinal, setFile] = useState('')

    const { control, handleSubmit, watch } = useForm<NewCardField>({
      resolver: zodResolver(newCardSchema),
      mode: 'onSubmit',

      defaultValues: {
        selectCardFormat: 'text',
      },
    })

    const selectCardFormatValue = watch('selectCardFormat')

    const data = ['text', 'image']
    const onSubmitHandler = handleSubmit(data => {
      const { Question, Answer } = data

      editCard(Question, Answer)
    })
    const closeModal = () => {
      setModalState(null)
    }

    return (
      <Modal className={s.modal} open={open === CardsModals.UPDATE} setModalState={setModalState}>
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
              type={selectCardFormatValue === 'text' ? 'text' : 'file'}
              className={s.input}
              name={'Question'}
              label={'Question'}
              control={control}
            ></ControlledInput>
            <ControlledInput
              type={selectCardFormatValue === 'text' ? 'text' : 'file'}
              className={s.input}
              name={'Answer'}
              label={'Answer'}
              control={control}
            ></ControlledInput>
          </div>
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
