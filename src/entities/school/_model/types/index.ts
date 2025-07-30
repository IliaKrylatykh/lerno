import { z } from 'zod'
import { schoolListItemSchema, schoolListSchema, schoolSchema } from './schema'

export type SchoolListItem = z.infer<typeof schoolListItemSchema>
export type SchoolList = z.infer<typeof schoolListSchema>
export type School = z.infer<typeof schoolSchema>
