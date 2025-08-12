import { z } from 'zod'

const timeRangeSchema = z.object({
	from: z
		.string()
		.regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format HH:mm'),
	to: z
		.string()
		.regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format HH:mm'),
})

const dayScheduleSchema = timeRangeSchema.nullable()

export const workingHoursSchema = z.object({
	mon: dayScheduleSchema,
	tue: dayScheduleSchema,
	wed: dayScheduleSchema,
	thu: dayScheduleSchema,
	fri: dayScheduleSchema,
	sat: dayScheduleSchema,
	sun: dayScheduleSchema,
})

export type WorkingHours = z.infer<typeof workingHoursSchema>
