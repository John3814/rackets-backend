import { number, z } from 'zod'

export const createRacketSchema = z.object(
  {
    name: z.string().min(1).max(20),
    price: z.number().positive(),
    description: z.string().min(5).max(100),
    imageUrl: z.string().nonoptional(),
    stock: z.number().min(0)
  }
)
