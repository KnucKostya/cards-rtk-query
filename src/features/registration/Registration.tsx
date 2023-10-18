import { SignUp } from '@/components/auth/sign-up/SignUp.tsx'
import { useSignUpMutation } from '@/services/auth-service'
import { CreateAccountFields } from '@/types/common'
import { Navigate } from 'react-router-dom'

export const Registration = () => {
  const [signUp, result] = useSignUpMutation()

  const { isSuccess, isLoading } = result

  const requestHandler = (data: CreateAccountFields) => {
    const { email, password } = data

    signUp({ email, password })
  }

  if (isLoading) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>
  }

  if (isSuccess) {
    return <Navigate to={'/login'} />
  }

  return <SignUp onSubmit={requestHandler} />
}
