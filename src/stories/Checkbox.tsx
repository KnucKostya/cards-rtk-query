import { ComponentPropsWithoutRef } from 'react'

import * as CheckboxRadix from '@radix-ui/react-checkbox'

import style from './Checkbox.module.scss'

type Props = ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox = ({ checked, disabled }: Props) => {
  return (
    <div className={style.checkboxWrapper}>
      <CheckboxRadix.Root className={style.root} checked={checked} disabled={disabled}>
        <CheckboxRadix.Indicator className={style.indicator}>
          {checked && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <rect x="4" y="6" width="16" height="12" fill="black" />
              <path
                d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
                fill="white"
              />
            </svg>
          )}
        </CheckboxRadix.Indicator>
      </CheckboxRadix.Root>
    </div>
  )
}
