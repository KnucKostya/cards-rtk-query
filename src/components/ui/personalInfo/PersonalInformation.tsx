import { useRef, useState } from 'react'
import { faArrowRightFromBracket, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'
import cardsLogo from '@/assets/icons/cardsLogo.png'
import s from './personalInfo.module.scss'

export const PersonalInformation = () => {
  const [edit, setEdit] = useState(false)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
    setEdit(!edit)
  }

  const editIconHandler = () => {
    console.log('handler')
  }

  return (
    <Card className={s.container} aria-label={'profile information'}>
      <Typography variant={'h1'} className={s.typoInfo}>
        Personal Information
      </Typography>
      <div>
        <img className={s.userPhoto} src={cardsLogo} alt="user-photo" />
        <span className={s.editLogo}>
          <FontAwesomeIcon
            aria-label={'click to edit your profile photo'}
            icon={faPenToSquare}
            onClick={editIconHandler}
            style={{ cursor: 'pointer' }}
          />
        </span>
      </div>
      {edit ? (
        <Input
          aria-label={'double click and rename your profile name'}
          className={s.input}
          name={'Nick name'}
          autoFocus={true}
          onBlur={() => setEdit(false)}
        />
      ) : (
        <div className={s.nameEmailBlock} onDoubleClick={handleButtonClick}>
          <label>
            name
            <span className={s.editIcon}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </span>
          </label>
          <Typography className={s.email}>email@gmail.com</Typography>
        </div>
      )}

      {edit ? (
        <Button
          aria-label={'save changes'}
          className={s.button}
          variant={'primary'}
          fullWidth={true}
        >
          <>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </>
          <Typography variant={'subtitle2'}>Save Changes</Typography>
        </Button>
      ) : (
        <Button aria-label={'logout'} className={s.button} variant={'secondary'} fullWidth={true}>
          <>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </>
          {/*<NavLink to='logout'>*/}
          <Typography variant={'subtitle2'}>Logout</Typography>
          {/*</NavLink>*/}
        </Button>
      )}
    </Card>
  )
}
