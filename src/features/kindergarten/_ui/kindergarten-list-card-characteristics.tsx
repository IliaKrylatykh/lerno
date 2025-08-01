'use client'

import { getAgesRangeFromArray } from '@/shared/helpers'
import { CardDescription } from '@/shared/ui'
import { useTranslations } from 'next-intl'
import { FC, useMemo } from 'react'

interface Props {
	ageGroups: number[] | null
}

export const KindergartenListCardCharacteristics: FC<Props> = ({
	ageGroups,
}) => {
	const t = useTranslations('common')

	const ageRangeText = useMemo(() => {
		if (!ageGroups || ageGroups.length === 0) return ''
		return getAgesRangeFromArray(ageGroups)
	}, [ageGroups])

	if (!ageGroups || ageGroups.length === 0) return null

	return (
		<CardDescription className='w-50 border-l-1 p-4 font-semibold'>
			{t('ages')}: <p className='text-slate-800 text-lg'>{ageRangeText}</p>
		</CardDescription>
	)
}
