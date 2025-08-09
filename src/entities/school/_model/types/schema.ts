import { schoolIdSchema } from '@/shared/types'
import z from 'zod'

export const schoolListItemSchema = z.object({
	id: schoolIdSchema,
	name: z.string(),
	slug: z.string().nullable(),
	address: z.string().nullable(),
	description: z.string().nullable(),
	mainPhoto: z.string().nullable(),
})

export const schoolListSchema = z.array(schoolListItemSchema)

export const schoolSchema = z.object({
	id: schoolIdSchema,
	name: z.string(),
	slug: z.string().nullable(),
	address: z.string().nullable(),
	description: z.string().nullable(),
	mainPhoto: z.string().nullable(),
})
