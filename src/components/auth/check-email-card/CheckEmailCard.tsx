import s from './CheckEmailCard.module.scss'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import letter from '@/images/check_email.svg'

export const CheckEmailCard = () => {
  return (
    <Card className={s.emailCard}>
      <Typography className={s.title} variant={'large'}>
        Check Email
      </Typography>
      <img src={letter} alt={'letter'} />
      <Typography className={s.subtitle} variant={'body2'}>
        We’ve sent an Email with instructions to example@mail.com
      </Typography>
      <Button className={s.button} variant={'primary'} fullWidth={true}>
        <Typography variant={'body2'}>Back to Sign In</Typography>
      </Button>
    </Card>
  )
}
