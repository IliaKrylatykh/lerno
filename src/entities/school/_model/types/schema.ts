import { schoolIdSchema } from '@/shared/types'
import z from 'zod'

export const schoolListItemSchema = z.object({
	id: schoolIdSchema,
	name: z.string(),
	slug: z.string(),
	address: z.string(),
	description: z.string(),
	thumbnail: z.string(),
})

export const schoolListSchema = z.array(schoolListItemSchema)
