import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { ControlledSelector } from '@/components/ui/controlled/controlledSelect'
import { ControlledInput } from '@/components/ui/controlled/controlledInput'
import { Button } from '@/components/ui/button'
import { CardsModals, NewCardField } from '@/types/common'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { newCardSchema } from '@/schemes'

type IModal = {
  name: string
  open: CardsModals | null
  setModalState: (value: CardsModals | null) => void
  submitCallBack: (question: string, answer: string) => void
}

export const CommonModal = ({ name, open, setModalState, submitCallBack }: IModal) => {
  console.log(submitCallBack)
  const openModalType = open === CardsModals.CREATE || open === CardsModals.UPDATE

  const { control, handleSubmit } = useForm<NewCardField>({
    resolver: zodResolver(newCardSchema),
    mode: 'onSubmit',

    defaultValues: {
      selectCardFormat: 'text',
    },
  })
  const selectData = ['text', 'image']

  const onSubmitHandler = handleSubmit(data => {
    const { Question, Answer } = data

    submitCallBack(Question, Answer)
  })

  const closeModal = () => {
    setModalState(null)
  }

  return (
    <Modal open={openModalType} setModalState={setModalState}>
      <Typography>{name}</Typography>
      <form onSubmit={onSubmitHandler}>
        <ControlledSelector
          label={'Chose a question format'}
          name={'selectCardFormat'}
          control={control}
          selectData={selectData}
        ></ControlledSelector>
        <ControlledInput name={'Question'} label={'Question'} control={control}></ControlledInput>
        <ControlledInput name={'Answer'} label={'Answer'} control={control}></ControlledInput>
        <Button onClick={closeModal}>Cancel</Button>
        <Button type={'submit'} variant={'primary'}>
          {/*onClick={addNewCardHandler}*/}
          <Typography variant={'h2'}>{name}</Typography>
        </Button>
      </form>
    </Modal>
  )
}
