import { kindergartenIdSchema } from '@/shared/types'
import z from 'zod'

export const kindergartenListItemSchema = z.object({
	id: kindergartenIdSchema,
	name: z.string(),
	slug: z.string(),
	address: z.string(),
	description: z.string(),
	thumbnail: z.string(),
})

export const kindergartenListSchema = z.array(kindergartenListItemSchema)
