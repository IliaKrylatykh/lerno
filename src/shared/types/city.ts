import { z } from 'zod'

export const subareaIdSchema = z.string()
export type SubareaId = z.infer<typeof subareaIdSchema>

export const areaIdSchema = z.string()
export type AreaId = z.infer<typeof areaIdSchema>

export const cityIdSchema = z.string()
export type CityId = z.infer<typeof cityIdSchema>

export const subareaSchema = z.object({
	id: subareaIdSchema,
	name: z.string(),
})
export type Subarea = z.infer<typeof subareaSchema>
export const subareaListSchema = z.array(subareaSchema)
export type SubareaList = z.infer<typeof subareaListSchema>

export const areaSchema = z.object({
	id: areaIdSchema,
	name: z.string(),
	subareas: subareaListSchema,
})
export type Area = z.infer<typeof areaSchema>
export const areaListSchema = z.array(areaSchema)
export type AreaList = z.infer<typeof areaListSchema>

export const citySchema = z.object({
	id: cityIdSchema,
	name: z.string(),
})
export type City = z.infer<typeof citySchema>
export const cityListSchema = z.array(citySchema)
export type CityList = z.infer<typeof cityListSchema>
