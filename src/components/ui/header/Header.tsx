import headerLogo from '@/assets/icons/cardsLogo.png'
import unknownUser from '@/assets/icons/unknown_user.svg'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { Icon } from '@/components/ui/icon'
import { useLogOutMutation } from '@/services/auth-service'
import { useNavigate } from 'react-router-dom'
import s from './header.module.scss'

type HeaderPropsType = {
  isAuth: boolean
}

export const Header = ({ isAuth }: HeaderPropsType) => {
  const [logOut] = useLogOutMutation()
  const navigate = useNavigate()

  return (
    <header className={s.header}>
      <div className={s.container}>
        <div onClick={() => navigate('/')} className={s.iconAndNameWrapper}>
          <Icon
            srcIcon={headerLogo}
            className={s.logo}
            alt={'app_logo'}
            aria-label={'logo of application, tap to move to packs page'}
          />
          <Typography variant={'h1'}>Flashcards</Typography>
        </div>
        <label className={s.userContainer}>
          {isAuth ? (
            // add aria label
            <>
              <span className={s.userName}>user</span>
              <Icon srcIcon={unknownUser} alt={'user photo'} />
              {/*temporary button to handle log out flow*/}
              <Button onClick={() => logOut()}>
                <Typography variant={'subtitle2'}>Log Out</Typography>
              </Button>
            </>
          ) : (
            <Button onClick={() => navigate('/login')} aria-label={'login button'}>
              <Typography variant={'subtitle2'}>Sign In</Typography>
            </Button>
          )}
        </label>
      </div>
    </header>
  )
}
