'use client'

import { useTranslations } from 'next-intl'
import { FC } from 'react'

export const FooterText: FC = () => {
	const t = useTranslations('appFooter')

	return <p>{t('text')}</p>
}
