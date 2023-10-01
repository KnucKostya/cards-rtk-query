import { z } from 'zod'

import { createNewPasswordSchema, emailSchema } from '@/schemes'

export type ForgotPasswordFields = z.infer<typeof emailSchema>

export type CreateNewPasswordFields = z.infer<typeof createNewPasswordSchema>

export type RadioGroupOptions = {
  label: string
  value: string
}
