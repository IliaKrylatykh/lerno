import { z } from 'zod'
import { kindergartenListItemSchema, kindergartenListSchema } from './schema'

export type KindergartenListItem = z.infer<typeof kindergartenListItemSchema>
export type KindergartenList = z.infer<typeof kindergartenListSchema>
