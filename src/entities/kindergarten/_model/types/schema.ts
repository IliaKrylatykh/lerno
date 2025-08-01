import { kindergartenIdSchema } from '@/shared/types'
import z from 'zod'

export const kindergartenListItemSchema = z.object({
	id: kindergartenIdSchema,
	name: z.string(),
	slug: z.string(),
	ageGroups: z.array(z.number()).nullable(),
	address: z.string(),
	description: z.string().nullable(),
	mainPhoto: z.string().nullable(),
	isPrivate: z.boolean(),
})

export const kindergartenListSchema = z.array(kindergartenListItemSchema)

export const kindergartenSchema = z.object({
	id: kindergartenIdSchema,
	name: z.string(),
	slug: z.string(),
	ageGroups: z.array(z.number()).nullable(),
	address: z.string(),
	description: z.string().nullable(),
	mainPhoto: z.string().nullable(),
	isPrivate: z.boolean(),
})
