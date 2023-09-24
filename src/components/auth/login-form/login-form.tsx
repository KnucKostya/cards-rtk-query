import { useForm } from 'react-hook-form'

import { Button } from '../../ui/button'

import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'

type FormValues = {
  email: string
  password: string
  rememberMe: boolean
}

export const LoginForm = () => {
  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('email')} placeholder={'email'} />
      <Input {...register('password')} placeholder={'password'} />
      <Checkbox label={'checkBox'} />
      <Button type="submit">Submit</Button>
    </form>
  )
}
