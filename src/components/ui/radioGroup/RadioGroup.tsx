import { ComponentPropsWithoutRef } from 'react'

import { Label } from '@radix-ui/react-label'
import * as Radio from '@radix-ui/react-radio-group'

import s from './RadioGroup.module.scss'

import { Typography } from '@/components/ui/typography'

type Options = {
  label: string
  value: string
}

type Props = {
  options: Options[]
}

export const RadioGroup = (
  props: Props & Omit<ComponentPropsWithoutRef<typeof Radio.Root>, keyof Props>
) => {
  const { disabled, className, options, onValueChange, ...rest } = props

  return (
    <Radio.Root
      onValueChange={onValueChange}
      defaultValue={'none'}
      className={s.root}
      disabled={disabled}
      {...rest}
    >
      {options.map((item, index) => (
        <Label key={index} className={s.label}>
          <Typography variant={'body2'} className={!disabled ? s.textColor : s.disabledTextColor}>
            {item.label}
          </Typography>
          <div className={s.radioItemWrapper}>
            <Radio.Item value={item.value} className={s.item}>
              <Radio.Indicator className={s.indicator} />
            </Radio.Item>
          </div>
        </Label>
      ))}
    </Radio.Root>
  )
}
