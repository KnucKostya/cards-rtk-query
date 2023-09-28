import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { Input, InputPropsType } from '@/components/ui/input'

type ControlledInputPropsType<T extends FieldValues> = UseControllerProps<T> &
  Omit<InputPropsType, 'onChange' | 'value'>

export const ControlledInput = <T extends FieldValues>({
  name,
  control,
  ...inputProps
}: ControlledInputPropsType<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  })

  return <Input value={value} onChange={onChange} name={name} {...inputProps} />
}
