import { Locale } from '@/shared/types'
import { kindergartenSchema } from '../types/schema'
import { treeifyError } from 'zod'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getKindergarten = async (locale: Locale, slug: string) => {
	try {
		console.log(
			'Fetching kindergarten:',
			`${baseUrl}/api/${locale}/kindergartens/subotica/${slug}`
		)

		const res = await fetch(
			`${baseUrl}/api/${locale}/kindergartens/subotica/${slug}`,
			{
				next: { revalidate: 3600 },
			}
		)

		if (!res.ok) {
			console.error(
				`Failed to fetch kindergarten: ${res.status} ${res.statusText}`
			)
			return null
		}

		const json = await res.json()

		const parsed = kindergartenSchema.safeParse(json)

		if (!parsed.success) {
			console.error('Validation error:', treeifyError(parsed.error))
			return null
		}

		return parsed.data
	} catch (error) {
		console.error(`Failed to fetch kindergarten: ${error}`)
		return null
	}
}
