import { z } from 'zod'

export const addToCartSchema = z.object({
  racketId: z.number().int().positive(),
  quantity: z.number().int().positive().min(1)
})
