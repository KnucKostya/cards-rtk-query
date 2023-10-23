import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../../ui/button'
import { Card } from '@/components/ui/card'
import { ControlledInput } from '@/components/ui/controlled/controlledInput/ControlledInput.tsx'
import { Typography } from '@/components/ui/typography'
import { logInSchema } from '@/schemes'
import { Icon } from '@/components/ui/icon'
import crossedEye from '@/assets/icons/eye_crossed.svg'
import eye from '@/assets/icons/eye.svg'
import { LogInFields } from '@/types/common'
import { Link } from 'react-router-dom'
import { ControlledCheckbox } from '@/components/ui/controlled/controlledCheckbox'
import s from './LoginForm.module.scss'

type Props = {
  onSubmit?: (data: LogInFields) => void
}

export const LoginForm = ({ onSubmit }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LogInFields>({
    resolver: zodResolver(logInSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  })

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const onSubmitHandler = handleSubmit(data => {
    onSubmit?.(data)
  })

  const inputEyeIcon = showPassword ? <Icon srcIcon={crossedEye} /> : <Icon srcIcon={eye} />

  return (
    <Card className={s.logInCard} aria-label={'login form'}>
      <Typography className={s.title} variant={'h1'} color={'light'}>
        Sign In
      </Typography>
      <form onSubmit={onSubmitHandler} className={s.form}>
        <ControlledInput
          aria-label={'enter your email'}
          name={'email'}
          control={control}
          label={'Email'}
          placeholder={'Enter your email'}
          errorMessage={errors.email?.message}
        />
        <ControlledInput
          aria-label={'enter your password'}
          type={showPassword ? 'text' : 'password'}
          name={'password'}
          placeholder={'Enter your password'}
          control={control}
          label={'Password'}
          rightSideIcon={inputEyeIcon}
          callBack={setShowPassword}
          callBackValue={showPassword}
          errorMessage={errors.password?.message}
        />
        <div className={s.checkBox}>
          <ControlledCheckbox
            aria-label={'remember me'}
            control={control}
            label={'Remember Me'}
            name={'rememberMe'}
          />
        </div>
        <Typography
          htmlTag={Link}
          to={'/recover-password'}
          aria-label={'if you forgot password - follow this link'}
          variant={'body2'}
          className={s.forgotTypography}
        >
          Forgot Password?
        </Typography>
        <Button aria-label={'login button'} type="submit" fullWidth={true} className={s.button}>
          <Typography variant={'subtitle2'}>Sign In</Typography>
        </Button>
        <Typography className={s.question} variant={'body2'}>
          Don&apos;t have an account?
        </Typography>

        <Button
          type={'button'}
          as={Link}
          to={'/registration'}
          aria-label={'registration link'}
          variant={'link'}
        >
          <Typography className={s.signUpText} variant={'subtitle2'}>
            Sign up
          </Typography>
        </Button>
      </form>
    </Card>
  )
}
