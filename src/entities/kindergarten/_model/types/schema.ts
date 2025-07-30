import { kindergartenIdSchema } from '@/shared/types'
import z from 'zod'

export const kindergartenListItemSchema = z.object({
	id: kindergartenIdSchema,
	name: z.string(),
	slug: z.string(),
	address: z.string(),
	description: z.string(),
	mainPhoto: z.string().nullable(),
})

export const kindergartenListSchema = z.array(kindergartenListItemSchema)

export const kindergartenSchema = z.object({
	id: kindergartenIdSchema,
	name: z.string(),
	slug: z.string(),
	address: z.string(),
	description: z.string(),
	mainPhoto: z.string().nullable(),
})
