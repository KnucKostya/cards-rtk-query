import { useForm } from 'react-hook-form'

import { ControlledInput } from '@/components/ui/controlled/controlledInput'

export function App() {
  const { control } = useForm()

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vh',
        height: '100vh',
      }}
    >
      <ControlledInput name={'Input'} control={control} />
    </div>
  )
}
