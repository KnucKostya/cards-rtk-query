import { ComponentPropsWithoutRef } from 'react'

import * as SliderRadix from '@radix-ui/react-slider'

import s from './Slider.module.scss'

import { Typography } from '@/components/ui/typography'

type Props = {}

export const Slider = (
  props: Props & Omit<ComponentPropsWithoutRef<typeof SliderRadix.Root>, keyof Props>
) => {
  const { min, max, onValueChange, value, ...rest } = props

  const value1 = value?.length ? value[0] : min
  const value2 = value?.length ? value[1] : max

  return (
    <div className={s.sliderWrapper}>
      <div className={s.rectangle}>
        <Typography variant={'body1'} className={s.textColor}>
          {value1}
        </Typography>
      </div>
      <SliderRadix.Root
        max={max}
        min={min}
        className={s.root}
        value={value}
        onValueChange={onValueChange}
        {...rest}
      >
        <SliderRadix.Track className={s.track}>
          <SliderRadix.Range className={s.range} />
        </SliderRadix.Track>
        <SliderRadix.Thumb className={s.thumb} />
        <SliderRadix.Thumb className={s.thumb} />
      </SliderRadix.Root>
      <div className={s.rectangle}>
        <Typography variant={'body1'} className={s.textColor}>
          {value2}
        </Typography>
      </div>
    </div>
  )
}
