import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { clsx } from 'clsx'
import { Typography } from '@/components/ui/typography'
import s from './Input.module.scss'

export type AdditionalTypeToInput = {
  leftSideIcon?: JSX.Element
  rightSideIcon?: JSX.Element
  errorMessage?: string
  withoutError?: boolean
  label?: string
  name?: string
  callBack?: (value: boolean) => void
  callBackValue?: boolean
}

export type InputPropsType = ComponentPropsWithoutRef<'input'> & AdditionalTypeToInput

export const Input = forwardRef<HTMLInputElement, InputPropsType>((props, ref) => {
  const {
    name,
    label,
    errorMessage,
    leftSideIcon,
    rightSideIcon,
    disabled,
    className,
    callBack,
    callBackValue,
    withoutError,
    ...rest
  } = props

  const showPasswordHandler = () => {
    callBack?.(!callBackValue)
  }

  const inputClassName = clsx(s.input, errorMessage && s.errorInput)

  const wrapperClassName = clsx(s.inputWrapper, className)

  return (
    <div className={wrapperClassName}>
      <Typography variant={'body2'} className={s.label}>
        {label}
      </Typography>
      <div>
        <div className={leftSideIcon ? s.inputIcon : s.defaultInputWithoutIcon}>
          {leftSideIcon && <span className={s.searchIcon}>{leftSideIcon}</span>}
          <input type="text" disabled={disabled} className={inputClassName} ref={ref} {...rest} />
          {rightSideIcon && (
            <span className={s.rightSideIcon} onClick={showPasswordHandler}>
              {rightSideIcon}
            </span>
          )}
        </div>
        {!withoutError && (
          <div className={s.errorPlace}>
            <Typography className={s.error} variant={'caption'}>
              {errorMessage}
            </Typography>
          </div>
        )}
      </div>
    </div>
  )
})
