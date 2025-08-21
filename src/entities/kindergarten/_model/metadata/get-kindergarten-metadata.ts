import type { Locale } from '@/shared/types'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { getKindergarten } from '../services/get-kindergarten'

export async function getKindergartenMetadata(
	locale: Locale,
	citySlug: string,
	kindergartenSlug: string
): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: 'kindergartens' })
	const kindergarten = await getKindergarten(locale, kindergartenSlug)

	if (!kindergarten) {
		return {
			title: t('seo.notFoundTitle'),
			description: t('seo.notFoundDescription'),
		}
	}

	const title = `${kindergarten.name} – ${t('seo.kindergartenIn')} ${
		kindergarten.city
	}`
	const description =
		kindergarten.description?.slice(0, 160) || t('seo.defaultDescription')

	return {
		title,
		description,
		openGraph: { title, description },
		twitter: { card: 'summary', title, description },
	}
}
