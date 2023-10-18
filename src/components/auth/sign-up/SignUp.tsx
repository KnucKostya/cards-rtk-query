import { useState } from 'react'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledInput } from '@/components/ui/controlled/controlledInput'
import { Typography } from '@/components/ui/typography'
import { createAccountSchema } from '@/schemes/createAccountSchema.ts'
import crossedEye from '@/assets/icons/eye_crossed.svg'
import eye from '@/assets/icons/eye.svg'
import { Icon } from '@/components/ui/icon'
import { CreateAccountFields } from '@/types/common'
import { Link } from 'react-router-dom'
import s from './signUp.module.scss'

type Props = {
  onSubmit: (values: CreateAccountFields) => void
}

export const SignUp = ({ onSubmit }: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateAccountFields>({
    resolver: zodResolver(createAccountSchema),
  })

  const onSubmitHandler = handleSubmit(data => {
    onSubmit(data)
  })

  const inputEyeIcon = showPassword ? <Icon srcIcon={crossedEye} /> : <Icon srcIcon={eye} />

  return (
    <Card aria-label={'registration form'} className={s.container}>
      <div>
        <Typography variant={'h1'} className={s.signTypography}>
          Sign Up
        </Typography>
        <form onSubmit={onSubmitHandler}>
          <DevTool control={control} />
          <ControlledInput
            aria-label={'enter your email'}
            name={'email'}
            control={control}
            label={'Email'}
            className={s.input}
          />
          <Typography variant={'body2'} className={s.error}>
            {errors?.email?.message}
          </Typography>
          <ControlledInput
            aria-label={'enter your password'}
            className={s.input}
            type={showPassword ? 'text' : 'password'}
            name={'password'}
            control={control}
            label={'Password'}
            callBack={setShowPassword}
            callBackValue={showPassword}
            rightSideIcon={inputEyeIcon}
          />
          <Typography variant={'body2'} className={s.error}>
            {errors?.password?.message}
          </Typography>
          <ControlledInput
            aria-label={'confirm your password'}
            className={s.input}
            type={showPassword ? 'text' : 'password'}
            name={'confirmPassword'}
            placeholder={'confirm password'}
            control={control}
            label={'Confirm password'}
            callBack={setShowPassword}
            callBackValue={showPassword}
            rightSideIcon={inputEyeIcon}
          />
          <Typography variant={'body2'} className={s.error}>
            {errors?.confirm?.message}
          </Typography>
          <Button
            aria-label={'commit registration'}
            type="submit"
            fullWidth={true}
            className={s.button}
          >
            <Typography variant={'subtitle2'}>Sign Up</Typography>
          </Button>
          <div className={s.signInContainer}>
            <Typography className={s.question} variant={'body2'}>
              Already have an account?
            </Typography>
            <Button
              as={Link}
              to={'/login'}
              type={'button'}
              aria-label={'back to login page'}
              variant={'link'}
            >
              <Typography className={s.loginLink} variant={'subtitle2'}>
                Sign In
              </Typography>
            </Button>
          </div>
        </form>
      </div>
    </Card>
  )
}
