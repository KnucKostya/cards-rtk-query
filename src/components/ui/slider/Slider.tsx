import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as SliderRadix from '@radix-ui/react-slider'
import { clsx } from 'clsx'

import s from './Slider.module.scss'

import { Typography } from '@/components/ui/typography'

type Props = ComponentPropsWithoutRef<typeof SliderRadix.Root>

export const Slider = forwardRef<ElementRef<typeof SliderRadix.Root>, Props>((props, ref) => {
  const { min, max, onValueChange, value, className, ...rest } = props

  const value1 = value?.length ? value[0] : min
  const value2 = value?.length ? value[1] : max

  const finalClassName = clsx(s.root, className && className)

  return (
    <div className={s.sliderWrapper}>
      <div className={s.rectangle}>
        <Typography variant={'body1'} className={s.textColor}>
          {value1}
        </Typography>
      </div>
      <SliderRadix.Root
        ref={ref}
        max={max}
        min={min}
        className={finalClassName}
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
})
