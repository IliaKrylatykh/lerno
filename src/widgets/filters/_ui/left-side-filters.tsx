'use client'

import { Card, CardContent } from '@/shared/ui'
import { FC } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from '@/shared/i18n/navigation'
import { useSearchParams } from 'next/navigation'

export const LeftSideFilters: FC = () => {
	const tCommon = useTranslations('common')
	const locale = useLocale()

	const router = useRouter()
	const searchParams = useSearchParams()

	const currentType = searchParams.get('type') || ''

	const handleFilterChange = (type: string) => {
		const params = new URLSearchParams(searchParams.toString())

		if (type) {
			params.set('type', type)
		} else {
			params.delete('type')
		}

		router.push(`/kindergartens?${params.toString()}`, { scroll: false })
	}

	return (
		<Card className='w-fit mx-auto h-44'>
			<CardContent className='flex flex-col gap-4 p-4'>
				<button
					onClick={() => handleFilterChange('public')}
					style={{
						fontWeight: currentType === 'public' ? 'bold' : 'normal',
					}}
				>
					Государственный
				</button>
				<button
					onClick={() => handleFilterChange('private')}
					style={{
						fontWeight: currentType === 'private' ? 'bold' : 'normal',
					}}
				>
					Частный
				</button>
				<button
					onClick={() => handleFilterChange('')}
					style={{
						fontWeight: currentType === '' ? 'bold' : 'normal',
					}}
				>
					Все
				</button>
			</CardContent>
		</Card>
	)
}
