import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { Input, InputPropsType } from '@/components/ui/input'
import { ChangeEvent, useState } from 'react'
import { Icon } from '@/components/ui/icon'
import s from './ControlledInput.module.scss'

type ControlledInputPropsType<T extends FieldValues> = UseControllerProps<T> &
  Omit<InputPropsType, 'onChange' | 'value'>

export const ControlledInput = <T extends FieldValues>({
  name,
  control,
  type,
  ...inputProps
}: ControlledInputPropsType<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  })

  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      const imageUrl = URL.createObjectURL(file)

      setSelectedImage(imageUrl)

      onChange(file)
    }
  }

  if (type === 'file') {
    return (
      <>
        {selectedImage && (
          <Icon className={s.imagePreview} srcIcon={selectedImage} alt={'image preview'} />
        )}
        <Input type={type} onChange={uploadHandler} name={name} {...inputProps} />
      </>
    )
  }

  return <Input type={type} value={value} onChange={onChange} name={name} {...inputProps} />
}
