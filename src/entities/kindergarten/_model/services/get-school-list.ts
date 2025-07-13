import { Locale } from '@/shared/types'
import { kindergartenListSchema } from '../types/schema'
import { treeifyError } from 'zod'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getKindergartenList = async (locale: Locale) => {
	try {
		const res = await fetch(`${baseUrl}/api/${locale}/kindergartens`, {
			next: { revalidate: 3600 },
		})

		if (!res.ok) {
			console.error(
				`Failed to fetch kindergarten list: ${res.status} ${res.statusText}`
			)
			return []
		}

		const json = await res.json()

		const parsed = kindergartenListSchema.safeParse(json)

		if (!parsed.success) {
			console.error('Validation error:', treeifyError(parsed.error))
			return []
		}

		return parsed.data
	} catch (error) {
		console.error(`Failed to fetch kindergarten list: ${error}`)
		return []
	}
}
