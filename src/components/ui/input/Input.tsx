import { ComponentPropsWithoutRef } from 'react'

import s from './Input.module.scss'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

type AdditionalTypeToInput = {
  leftSideIcon?: JSX.Element
  rightSideIcon?: JSX.Element
  error?: string
  label: string
}

type InputPropsType = ComponentPropsWithoutRef<'input'> & AdditionalTypeToInput

export const Input = (props: InputPropsType) => {
  let { label, error, leftSideIcon, rightSideIcon, disabled, value, onChange } = props

  return (
    <div>
      <div className={s.label}>{label}</div>
      <div className={leftSideIcon ? s.inputIcon : s.defaultInputWithoutIcon}>
        {leftSideIcon && <span className={s.searchIcon}>{leftSideIcon}</span>}
        <input
          type="text"
          placeholder={'Input'}
          disabled={disabled}
          value={value}
          onChange={onChange}
          className={error ? s.errorInput : s.input}
        />
        {rightSideIcon && <span className={s.rightSideIcon}>{rightSideIcon}</span>}
        {error !== '' && <div className={s.error}>{error}</div>}
      </div>
    </div>
  )
}
