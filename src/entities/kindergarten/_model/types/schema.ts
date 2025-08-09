import { kindergartenIdSchema } from '@/shared/types'
import z from 'zod'

export const kindergartenListItemSchema = z.object({
	id: kindergartenIdSchema,
	name: z.string(),
	slug: z.string(),
	ageGroups: z.array(z.number()).nullable(),
	address: z.string().nullable(),
	description: z.string().nullable(),
	mainPhoto: z.string().nullable(),
	isPrivate: z.boolean().nullable(),
	city: z.string().nullable(),
	area: z.string().nullable(),
	subarea: z.string().nullable(),
})

export const kindergartenListSchema = z.array(kindergartenListItemSchema)

export const kindergartenSchema = z.object({
	id: kindergartenIdSchema,
	name: z.string(),
	slug: z.string(),
	ageGroups: z.array(z.number()).nullable(),
	address: z.string().nullable(),
	description: z.string().nullable(),
	mainPhoto: z.string().nullable(),
	isPrivate: z.boolean().nullable(),
})
