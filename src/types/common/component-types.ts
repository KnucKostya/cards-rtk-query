import { z } from 'zod'

import {
  createAccountSchema,
  createNewPasswordSchema,
  forgotPasswordSchema,
  logInSchema,
} from '@/schemes'

export type ForgotPasswordFields = z.infer<typeof forgotPasswordSchema>

export type CreateNewPasswordFields = z.infer<typeof createNewPasswordSchema>

export type LogInFields = z.infer<typeof logInSchema>

export type CreateAccountFields = { confirm?: string } & z.infer<typeof createAccountSchema>

export type RadioGroupOptions = {
  label: string
  value: string
}
