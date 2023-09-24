import s from './header.module.scss'

import headerLogo from '@/images/cardsLogo.png'

type HeaderPropsType = {
  isAuth: boolean
}

export const Header = ({ isAuth }: HeaderPropsType) => {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <img src={headerLogo} className={s.logo} alt="app_logo" />
        <label className={s.userContainer}>
          {isAuth ? (
            <>
              <div style={{ borderBottom: '1px dashed #fff' }}>user</div>
              <img src={headerLogo} className={s.logo} alt="users_photo" />
            </>
          ) : (
            <button>Sign In</button>
          )}
        </label>
      </div>
    </header>
  )
}
