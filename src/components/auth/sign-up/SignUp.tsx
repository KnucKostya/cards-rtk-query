import { useState } from 'react'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledInput } from '@/components/ui/controlled/controlledInput'
import { Typography } from '@/components/ui/typography'
import { createAccountSchema } from '@/schemes/createAccountSchema.ts'
import s from './signUp.module.scss'

export const SignUp = () => {
  const [eyeType, setEyeType] = useState<boolean>(false)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(createAccountSchema),
  })

  type FormValues = {
    email: string
    password: string
    confirmPassword: string
    confirm?: string
  }

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <Card className={s.container}>
      <div>
        <Typography variant={'h1'} color={'light'} className={s.signTypography}>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DevTool control={control} />
          <ControlledInput name={'email'} control={control} label={'Email'} className={s.input} />
          <Typography variant={'body2'} className={s.error}>
            {errors?.email?.message}
          </Typography>
          <ControlledInput
            className={s.input}
            type={eyeType ? 'text' : 'password'}
            name={'password'}
            control={control}
            label={'Password'}
            rightSideIcon={
              eyeType ? (
                <FontAwesomeIcon icon={faEye} onClick={() => setEyeType(!eyeType)} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} onClick={() => setEyeType(!eyeType)} />
              )
            }
          />
          <Typography variant={'body2'} className={s.error}>
            {errors?.password?.message}
          </Typography>
          <ControlledInput
            className={s.input}
            type={eyeType ? 'text' : 'password'}
            name={'confirmPassword'}
            placeholder={'confirm password'}
            control={control}
            label={'Confirm password'}
            rightSideIcon={
              eyeType ? (
                <FontAwesomeIcon icon={faEye} onClick={() => setEyeType(!eyeType)} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} onClick={() => setEyeType(!eyeType)} />
              )
            }
          />
          <Typography variant={'body2'} className={s.error}>
            {errors?.confirm?.message}
          </Typography>
          <Button type="submit" fullWidth={true} className={s.button}>
            Sign Up
          </Button>
          <div className={s.signInContainer}>
            <div className={s.question}>Already have an account?</div>
            {/*<NavLink to="/register" className={s.registerLink}>*/}
            {/*</NavLink>*/}

            <Button variant={'link'}>
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
