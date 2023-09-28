import { z } from 'zod'

import { createNewPasswordSchema, forgotPasswordSchema } from '@/schemes'

export type ForgotPasswordFields = z.infer<typeof forgotPasswordSchema>

export type CreateNewPasswordFields = z.infer<typeof createNewPasswordSchema>

export type RadioGroupOptions = {
  label: string
  value: string
}
