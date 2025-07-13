import { z } from 'zod'

export const kindergartenIdSchema = z.string()
export type KindergartenId = z.infer<typeof kindergartenIdSchema>
