import { CreateNewPasswordForm } from '@/components/auth/create-new-password-form'
import { CreateNewPasswordFields } from '@/types/common'
import { useResetPasswordMutation } from '@/services/auth-service'
import { useParams } from 'react-router-dom'

export const ResetPassword = () => {
  const [resetPassword, result] = useResetPasswordMutation()

  const { isLoading, isSuccess } = result

  const { token } = useParams()

  const requestHandler = (data: CreateNewPasswordFields) => {
    if (!token) return
    resetPassword({ token, password: data.password })
  }

  if (isLoading) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>
  }

  if (isSuccess) {
    return (
      <h1 style={{ textAlign: 'center' }}>
        Password has been changed successfully. Try to log in :)
      </h1>
    )
  }

  return <CreateNewPasswordForm onSubmit={requestHandler} />
}
