import { DevTool } from '@hookform/devtools'
import { useForm } from 'react-hook-form'

import { Button } from '../../ui/button'

// import { Checkbox } from '@/components/ui/checkbox'

import { Card } from '@/components/ui/card'
import { ControlledInput } from '@/components/ui/controlled/controlledInput/ControlledInput.tsx'
import { Typography } from '@/components/ui/typography'

type FormValues = {
  email: string
  password: string
  rememberMe: boolean
}

export const LoginForm = () => {
  const { handleSubmit, control } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <div>
      <Card>
        <div>
          <Typography variant={'h1'} color={'light'}>
            Sign In
          </Typography>
          {/*<Typography htmlTag={p}><div>Sign In</div><Typography/>*/}
          <form onSubmit={handleSubmit(onSubmit)}>
            <DevTool control={control} />
            <ControlledInput name={'email'} control={control} />
            <ControlledInput name={'password'} control={control} />
            {/*<Checkbox label={'checkBox'} />*/}
            <Button type="submit" fullWidth={true}>
              Submit
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
