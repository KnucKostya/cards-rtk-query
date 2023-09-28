import { useState } from 'react'

import { faEye, faEyeLowVision } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import s from './CreateNewPassword.module.scss'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledInput } from '@/components/ui/controlled/controlledInput'
import { Typography } from '@/components/ui/typography'
import { createNewPasswordSchema } from '@/schemes'
import { CreateNewPasswordFields } from '@/types/common'

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
  })

  const onSubmitHandler = handleSubmit(data => {
    onSubmit(data)
  })

  const icon = showPassword ? (
    <FontAwesomeIcon icon={faEyeLowVision} style={{ color: '#ffffff' }} />
  ) : (
    <FontAwesomeIcon icon={faEye} style={{ color: '#ffffff' }} />
  )

  const inputType = showPassword ? 'text' : 'password'

  return (
    <Card className={s.newPasswordCard}>
      <form className={s.form} onSubmit={onSubmitHandler}>
        <Typography className={s.title} variant={'large'}>
          Create new password
        </Typography>
        <ControlledInput
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
        <Button type={'submit'} variant={'primary'} fullWidth={true}>
          <Typography variant={'subtitle2'}>Create New Password</Typography>
        </Button>
      </form>
    </Card>
  )
}
