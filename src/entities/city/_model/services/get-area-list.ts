import { areaListSchema, Locale } from '@/shared/types'
import { treeifyError } from 'zod'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getAreaList = async (locale: Locale) => {
	try {
		const res = await fetch(`${baseUrl}/api/${locale}/cities/subotica`, {
			next: { revalidate: 3600 },
		})

		if (!res.ok) {
			console.error(
				`Failed to fetch area list for city Subotica: ${res.status} ${res.statusText}`
			)
			return []
		}

		const json = await res.json()

		const parsed = areaListSchema.safeParse(json.areas ?? [])

		if (!parsed.success) {
			console.error('Validation error:', treeifyError(parsed.error))
			return []
		}

		return parsed.data
	} catch (error) {
		console.error(`Failed to fetch area list for city Subotica: ${error}`)
		return []
	}
}
