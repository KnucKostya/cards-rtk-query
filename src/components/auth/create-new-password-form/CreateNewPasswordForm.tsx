import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import eye from '@/assets/icons/eye.svg'
import crossedEye from '@/assets/icons/eye_crossed.svg'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledInput } from '@/components/ui/controlled/controlledInput'
import { Icon } from '@/components/ui/icon'
import { Typography } from '@/components/ui/typography'
import { createNewPasswordSchema } from '@/schemes'
import { CreateNewPasswordFields } from '@/types/common'
import s from './CreateNewPassword.module.scss'

type Props = {
  onSubmit: (values: CreateNewPasswordFields) => void
}

export const CreateNewPasswordForm = (props: Props) => {
  const { onSubmit } = props

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNewPasswordFields>({
    resolver: zodResolver(createNewPasswordSchema),
    mode: 'onSubmit',
    defaultValues: { password: '' },
  })

  const onSubmitHandler = handleSubmit(data => {
    onSubmit(data)
  })

  const icon = showPassword ? <Icon srcIcon={crossedEye} /> : <Icon srcIcon={eye} />

  const inputType = showPassword ? 'text' : 'password'

  return (
    <Card
      className={s.newPasswordCard}
      aria-label={
        'form that helps you create a new password that will be sent into your email address'
      }
    >
      <form className={s.form} onSubmit={onSubmitHandler}>
        <Typography className={s.title} variant={'large'}>
          Create new password
        </Typography>
        <ControlledInput
          aria-label={'enter new password'}
          type={inputType}
          className={s.input}
          control={control}
          name={'password'}
          label={'Password'}
          errorMessage={errors.password?.message}
          rightSideIcon={icon}
          callBack={setShowPassword}
          callBackValue={showPassword}
        />
        <Typography className={s.subtitle} variant={'body2'}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button
          type={'submit'}
          variant={'primary'}
          fullWidth={true}
          aria-label={'submit password changing'}
        >
          <Typography variant={'subtitle2'}>Create New Password</Typography>
        </Button>
      </form>
    </Card>
  )
}
