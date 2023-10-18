import { Typography } from '@/components/ui/typography'
import { DropDownMenu } from '@/components/ui/dropDownMenu'
import { Button } from '@/components/ui/button'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { ElementRef, useRef, useState } from 'react'
import editIcon from '@/assets/icons/edit_icon.svg'
import { Icon } from '@/components/ui/icon'
import deleteIcon from '@/assets/icons/delete_icon.svg'
import playIcon from '@/assets/icons/play_icon.svg'
import s from '@/components/ui/dropDownMenu/DropDownMenu.stories.module.scss'
import styles from './packOptions.module.scss'

export const PackOptions = () => {
  const buttonRef = useRef<ElementRef<'button'>>(null)
  const [isShow, setIsShow] = useState<boolean>(false)

  const openMenu = () => setIsShow(true)
  const onOpenChange = (open: boolean) => {
    setIsShow(open)
  }

  return (
    <span>
      <Button onClick={openMenu} className={s.button} ref={buttonRef}>
        <DotsVerticalIcon style={{ cursor: 'pointer' }} />
      </Button>
      <DropDownMenu
        open={isShow}
        onOpenChange={onOpenChange}
        className={s.content}
        container={buttonRef.current}
        sideOffset={20}
      >
        <div className={styles.container}>
          <Typography style={{ marginTop: '12px' }}>
            Learn
            {<Icon className={s.icon} srcIcon={playIcon} />}
            <div className={styles.line}></div>
          </Typography>
          <Typography style={{ marginTop: '12px' }}>
            Edit
            {
              <Icon
                // onClick={() => openModalHandler(DeckModals.UPDATE)} - callback from props
                className={s.icon}
                srcIcon={editIcon}
              />
            }
            <div className={styles.line}></div>
          </Typography>
          <Typography style={{ marginTop: '12px', marginBottom: '12px' }}>
            <span>Delete</span>
            {
              <Icon
                // onClick={() => onIconClick(DeckModals.DELETE, item)}
                className={s.icon}
                srcIcon={deleteIcon}
              />
            }
          </Typography>
        </div>
      </DropDownMenu>
    </span>
  )
}
