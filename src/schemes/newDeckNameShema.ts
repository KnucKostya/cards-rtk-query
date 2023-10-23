import { z } from 'zod'

export const newDeckNameSchema = z.object({
  name: z.string().min(1, { message: 'Deck name must contain at least one character' }),
  isPrivate: z.boolean(),
  cover: z.any().optional(),
})
