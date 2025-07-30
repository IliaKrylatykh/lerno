import { Locale } from '@/shared/types'
import { schoolSchema } from '../types/schema'
import { treeifyError } from 'zod'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getSchool = async (locale: Locale, slug: string) => {
	try {
		const res = await fetch(
			`${baseUrl}/api/${locale}/schools/subotica/${slug}`,
			{
				next: { revalidate: 3600 },
			}
		)

		if (!res.ok) {
			console.error(`Failed to fetch school: ${res.status} ${res.statusText}`)
			return null
		}

		const json = await res.json()

		const parsed = schoolSchema.safeParse(json)

		if (!parsed.success) {
			console.error('Validation error:', treeifyError(parsed.error))
			return null
		}

		return parsed.data
	} catch (error) {
		console.error(`Failed to fetch school: ${error}`)
		return null
	}
}
