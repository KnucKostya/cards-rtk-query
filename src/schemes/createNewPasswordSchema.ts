import { z } from 'zod'

export const createNewPasswordSchema = z.object({
  password: z
    .string()
    .min(8)
    .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one digit' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Password must contain at least one symbol' }),
})
