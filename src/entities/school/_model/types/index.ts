import { z } from 'zod'
import { schoolListItemSchema, schoolListSchema } from './schema'

export type SchoolListItem = z.infer<typeof schoolListItemSchema>
export type SchoolList = z.infer<typeof schoolListSchema>
