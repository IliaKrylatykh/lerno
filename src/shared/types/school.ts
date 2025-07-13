import { z } from 'zod'

export const schoolIdSchema = z.string()
export type SchoolId = z.infer<typeof schoolIdSchema>
