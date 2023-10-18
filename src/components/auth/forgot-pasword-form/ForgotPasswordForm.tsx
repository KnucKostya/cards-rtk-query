import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledInput } from '@/components/ui/controlled/controlledInput'
import { Typography } from '@/components/ui/typography'
import { forgotPasswordSchema } from '@/schemes'
import { ForgotPasswordFields } from '@/types/common'
import { Link } from 'react-router-dom'
import s from './ForgotPasswordForm.module.scss'

type Props = {
  onSubmit: (data: ForgotPasswordFields) => void
}

export const ForgotPasswordForm = (props: Props) => {
  const { onSubmit } = props

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFields>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onSubmit',
    defaultValues: { email: '' },
  })

  const onSubmitHandler = handleSubmit(data => {
    onSubmit(data)
  })

  return (
    <Card className={s.card}>
      <form className={s.form} onSubmit={onSubmitHandler}>
        <Typography className={s.title} variant={'large'}>
          Forgot your password?
        </Typography>
        <ControlledInput
          aria-label={'enter your email to recover yours password'}
          className={s.input}
          control={control}
          name={'email'}
          label={'Email'}
          errorMessage={errors.email?.message}
        />
        <Typography className={s.subtitle_1} variant={'body2'}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button
          aria-label={'submit password recovering'}
          className={s.button}
          type={'submit'}
          variant={'primary'}
          fullWidth={true}
        >
          <Typography variant={'subtitle1'}>Send Instructions</Typography>
        </Button>
        <Typography className={s.subtitle_2} variant={'body2'}>
          Did you remember your password?
        </Typography>
        <Button
          as={Link}
          to={'/login'}
          aria-label={'try to login if you have remembered your password'}
          type={'submit'}
          variant={'link'}
        >
          <Typography className={s.link} variant={'subtitle2'}>
            Try logging in
          </Typography>
        </Button>
      </form>
    </Card>
  )
}
