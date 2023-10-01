import { forwardRef, useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as Select from '@radix-ui/react-select'
import { SelectItemProps } from '@radix-ui/react-select'
import { clsx } from 'clsx'
import s from './Select.module.scss'

export type SelectPropsType = {
  selectName?: string
  selectData?: string[]
  disable?: boolean
  label?: string
  setSelectedValue: (value: string) => void
  value?: string
  triggerClassName?: string
  contentClassName?: string
  name?: string
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

export const Selector = ({
  setSelectedValue,
  disable,
  label,
  selectData,
  value,
  triggerClassName,
  contentClassName,
}: SelectPropsType) => {
  const [open, setOpen] = useState(false)

  const finalTriggerClassName = clsx(s.selectTrigger, triggerClassName && triggerClassName)

  const finalContentClassName = clsx(s.selectContent, contentClassName && contentClassName)

  return (
    <div>
      <div className={s.label}>{label}</div>
      <Select.Root
        open={open}
        onOpenChange={setOpen}
        disabled={disable}
        onValueChange={(value: string) => setSelectedValue(value)}
        value={value}
      >
        <Select.Trigger className={finalTriggerClassName} aria-label="Select a value">
          <Select.Value placeholder="Select a value…" />
          <Select.Icon className={s.selectIcon}>
            {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className={finalContentClassName} position="popper">
            <Select.ScrollUpButton className={s.selectButton}>
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <Select.Viewport className={s.selectViewPort}>
              <Select.Group className={s.selectGroup}>
                {selectData?.map((el, index) => {
                  return (
                    <SelectItem key={index} value={el}>
                      {el}
                    </SelectItem>
                  )
                })}
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}
