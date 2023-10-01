import { useState } from 'react'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../../ui/button'
// import { Checkbox } from '@/components/ui/checkbox'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { ControlledInput } from '@/components/ui/controlled/controlledInput/ControlledInput.tsx'
import { Typography } from '@/components/ui/typography'
import { emailSchema } from '@/schemes'
import s from './loginForm.module.scss'

type FormValues = {
  email: string
  password: string
  rememberMe: boolean
}

export const LoginForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(emailSchema),
  })
  const [eyeType, setEyeType] = useState<boolean>(false)

  const [checked, setChecked] = useState(false)
  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <div>
      <Card className={s.container}>
        <div>
          <Typography className={s.signTypography} variant={'h1'} color={'light'}>
            Sign In
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DevTool control={control} />
            <ControlledInput className={s.input} name={'email'} control={control} label={'Email'} />
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
            <div className={s.checkBox}>
              <Checkbox
                label={'Remember Me'}
                checked={checked}
                onCheckedChange={() => setChecked(!checked)}
              />
            </div>
            <Typography variant={'caption'} className={s.forgotTypography} onClick={() => {}}>
              Forgot Password?
            </Typography>
            <Button type="submit" fullWidth={true} className={s.button}>
              Sign In
            </Button>
            <div className={s.signUpContainer}>
              <div className={s.question}>{`Don't have an account?`}</div>
              {/*<NavLink to="/register" className={s.registerLink}>*/}
              {/*</NavLink>*/}

              <Button variant={'link'}>
                <Typography className={s.registerLink} variant={'subtitle2'}>
                  Sign up
                </Typography>
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}
