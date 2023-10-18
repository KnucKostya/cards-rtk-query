import { LoginForm } from '@/components/auth/login-form'
import { useLogInMutation, useMeQuery } from '@/services/auth-service'
import { Navigate } from 'react-router-dom'

export const Login = () => {
  const { isError, isLoading } = useMeQuery()
  const [logIn] = useLogInMutation()

  if (isLoading) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>
  }
  const isAuthorized = !isError

  if (isAuthorized) {
    return <Navigate to={'/'} replace={true} />
  }

  return <LoginForm onSubmit={logIn} />
}
