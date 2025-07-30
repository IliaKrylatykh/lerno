'use client'

import { useTranslations } from 'next-intl'
import { FC } from 'react'

export const FooterText: FC = () => {
	const t = useTranslations('AppFooter')

	return <p>{t('text')}</p>
}
