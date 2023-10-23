import { z } from 'zod'

export const createAccountSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must contain at least eight characters' })
      .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter' })
      .regex(/[0-9]/, { message: 'Password must contain at least one digit' })
      .regex(/[^a-zA-Z0-9]/, { message: 'Password must contain at least one symbol' }),
    confirmPassword: z.string().min(8).optional(),
    name: z.string().min(3, { message: 'Nickname must contain at least three characters' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirm'],
  })
