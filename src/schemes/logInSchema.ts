import { z } from 'zod'

export const logInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Required' }),
  rememberMe: z.boolean(),
})
