import { cityListSchema, Locale } from '@/shared/types'
import { treeifyError } from 'zod'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getCityList = async (locale: Locale) => {
	try {
		const res = await fetch(`${baseUrl}/api/${locale}/cities`, {
			next: { revalidate: 3600 },
		})

		if (!res.ok) {
			console.error(
				`Failed to fetch city list: ${res.status} ${res.statusText}`
			)
			return []
		}

		const json = await res.json()
		const parsed = cityListSchema.safeParse(json)

		if (!parsed.success) {
			console.error('Validation error:', treeifyError(parsed.error))
			return []
		}

		return parsed.data
	} catch (error) {
		console.error(`Failed to fetch city list: ${error}`)
		return []
	}
}
