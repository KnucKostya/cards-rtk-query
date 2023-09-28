import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as Label from '@radix-ui/react-label'

import s from './Checkbox.module.scss'

import { CheckedIcon } from '@/components/ui/checkbox'
import { Typography } from '@/components/ui/typography'

export type CheckboxProps = {
  label?: string
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox = forwardRef<ElementRef<typeof CheckboxRadix.Root>, CheckboxProps>(
  (props, ref) => {
    const { checked, disabled, label, onChange, onCheckedChange, ...rest } = props

    return (
      <Label.Root className={s.label}>
        <Typography variant={'body2'} className={!disabled ? s.textColor : s.disabledTextColor}>
          {label}
        </Typography>
        <div className={s.checkboxWrapper}>
          <CheckboxRadix.Root
            ref={ref}
            className={s.root}
            checked={checked}
            disabled={disabled}
            onCheckedChange={onCheckedChange}
            {...rest}
          >
            <CheckboxRadix.Indicator className={s.indicator}>
              {checked && <CheckedIcon />}
            </CheckboxRadix.Indicator>
          </CheckboxRadix.Root>
        </div>
      </Label.Root>
    )
  }
)
