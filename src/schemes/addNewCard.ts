import { z } from 'zod'

export const newCardSchema = z.object({
  Question: z.string().min(1),
  Answer: z.string().min(1),
  selectCardFormat: z.string(),
  // answerImg
})
