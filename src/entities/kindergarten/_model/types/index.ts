import { z } from 'zod'
import {
	kindergartenListItemSchema,
	kindergartenListSchema,
	kindergartenSchema,
} from './schema'

export type KindergartenListItem = z.infer<typeof kindergartenListItemSchema>
export type KindergartenList = z.infer<typeof kindergartenListSchema>
export type Kindergarten = z.infer<typeof kindergartenSchema>
