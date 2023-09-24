import { Input } from '@/components/ui/input'

export function App() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: '100px',
        width: '100vh',
        height: '100vh',
      }}
    >
      <Input label={'Input'} />
    </div>
  )
}
