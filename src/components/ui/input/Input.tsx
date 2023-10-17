import { ComponentPropsWithoutRef } from 'react'
import { clsx } from 'clsx'
import { Typography } from '@/components/ui/typography'
import s from './Input.module.scss'
import { toast } from 'react-toastify'

export type AdditionalTypeToInput = {
  type?: string
  leftSideIcon?: JSX.Element
  rightSideIcon?: JSX.Element
  errorMessage?: string
  label?: string
  value?: string
  name?: string
  callBack?: (value: boolean) => void
  callBackValue?: boolean
  autoFocusValue?: boolean
}

export type InputPropsType = ComponentPropsWithoutRef<'input'> & AdditionalTypeToInput

export const Input = (props: InputPropsType) => {
  let {
    type = 'text',
    name,
    label,
    errorMessage,
    leftSideIcon,
    rightSideIcon,
    disabled,
    value,
    onChange,
    className,
    callBack,
    callBackValue,
    autoFocusValue,
    ...rest
  } = props

  const showPasswordHandler = () => {
    callBack?.(!callBackValue)
  }
  const inputClassName = clsx(s.input, errorMessage && s.errorInput)

  const wrapperClassName = clsx(s.inputWrapper, className)

  console.log(value)

  if (type === 'file') {
    const uploadHandler = () => {

        console.log(value?.size)
        if (value?.size < 40000) {
          convertFileToBase64(value, (file64: string) => {
            setFile(file64)
          })
        } else {
          toast.error('File is to big, chose another file')
        }
      }
    }

    const convertFileToBase64 = (callBack: (value: string) => void) => {
      const reader = new FileReader()

      reader.onloadend = () => {
        const file64 = reader.result as string

        callBack(file64)
      }
      reader.readAsDataURL(value)
    }
  }

  return (
    <div className={wrapperClassName}>
      <Typography variant={'body2'} className={s.label}>
        {label}
      </Typography>
      <div>
        <div className={leftSideIcon ? s.inputIcon : s.defaultInputWithoutIcon}>
          {leftSideIcon && <span className={s.searchIcon}>{leftSideIcon}</span>}
          <input
            type={type}
            placeholder={name}
            disabled={disabled}
            value={value}
            onChange={onChange}
            className={inputClassName}
            autoFocus={autoFocusValue}
            {...rest}
          />
          {rightSideIcon && (
            <span className={s.rightSideIcon} onClick={showPasswordHandler}>
              {rightSideIcon}
            </span>
          )}
        </div>
        {errorMessage !== '' && (
          <div>
            <Typography variant={'body2'} className={s.error}>
              {errorMessage}
            </Typography>
          </div>
        )}
      </div>
    </div>
  )
}
