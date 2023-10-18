import { z } from 'zod'

import {
  createAccountSchema,
  createNewPasswordSchema,
  forgotPasswordSchema,
  logInSchema,
  newCardSchema,
  newDeckNameSchema,
} from '@/schemes'

export type ForgotPasswordFields = z.infer<typeof forgotPasswordSchema>

export type CreateNewPasswordFields = z.infer<typeof createNewPasswordSchema>

export type NewDeckNameFields = z.infer<typeof newDeckNameSchema>

export type NewCardField = z.infer<typeof newCardSchema>

export type LogInFields = z.infer<typeof logInSchema>

export type CreateAccountFields = { confirm?: string } & z.infer<typeof createAccountSchema>

export type RadioGroupOptions = {
  label: string
  value: string
}

export enum CardsModals {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}
