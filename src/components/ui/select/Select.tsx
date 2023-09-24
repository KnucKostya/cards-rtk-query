import { forwardRef, useState } from 'react'

import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as Select from '@radix-ui/react-select'
import { SelectItemProps } from '@radix-ui/react-select'

import s from './Select.module.scss'

type SelectPropsType = {
  selectName?: string
  selectData?: string[]
  disable?: boolean
  label?: string
}

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className = '', ...props }, forwardedRef) => {
    return (
      <Select.Item className={`${s.selectItem} ${className}`} {...props} ref={forwardedRef}>
        <Select.ItemText>{children}</Select.ItemText>
      </Select.Item>
    )
  }
)

export const Selector = ({ disable, label }: SelectPropsType) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <div className={s.label}>{label}</div>
      {/*true*/}
      <Select.Root open={open} onOpenChange={setOpen} disabled={disable}>
        <Select.Trigger className={s.selectTrigger} aria-label="Food">
          <Select.Value placeholder="Select a fruit…" />
          <Select.Icon className={s.selectIcon}>
            {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className={s.selectContent} position="popper">
            <Select.ScrollUpButton className={s.selectButton}>
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <Select.Viewport className={s.selectViewPort}>
              <Select.Group className={s.selectGroup}>
                {/*{valuesForSelect.map(el => el)} */}
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}
