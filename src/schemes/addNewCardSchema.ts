import { z } from 'zod'

export const addNewCardSchema = z.object({
  question: z.string().min(1, { message: 'Question must contain at least one character' }),
  answer: z.string().min(1, { message: 'Answer must contain at least one character' }),
  answerImg: z.any().optional(),
  questionImg: z.any().optional(),
  questionVideo: z.any().optional(),
  answerVideo: z.any().optional(),
})
