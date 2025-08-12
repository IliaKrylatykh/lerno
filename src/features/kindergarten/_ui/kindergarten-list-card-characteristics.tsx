'use client'

import { getAgesRangeFromArray } from '@/shared/helpers'
import { WorkingHours } from '@/shared/types'
import { CardDescription } from '@/shared/ui'
import { useTranslations } from 'next-intl'
import { FC, useMemo } from 'react'

interface Props {
	ageGroups: number[] | null
	workingHours: WorkingHours | null
}

export const KindergartenListCardCharacteristics: FC<Props> = ({
	ageGroups,
	workingHours,
}) => {
	const t = useTranslations('common')

	const ageRangeText = useMemo(() => {
		if (!ageGroups || ageGroups.length === 0) return ''
		return getAgesRangeFromArray(ageGroups)
	}, [ageGroups])

	const mondayHoursText = useMemo(() => {
		const monday = workingHours?.mon
		if (!monday) return null
		return `${monday.from} - ${monday.to}`
	}, [workingHours])

	if ((!ageGroups || ageGroups.length === 0) && !mondayHoursText) return null

	return (
		<CardDescription className='w-50 border-l-1 p-4 font-semibold'>
			{ageGroups && ageGroups.length > 0 && (
				<div>
					{t('ages')}: <p className='text-slate-800 text-lg'>{ageRangeText}</p>
				</div>
			)}
			{workingHours && mondayHoursText && (
				<div>
					{t('workingHours')}:{' '}
					<p className='text-slate-800 text-lg'>{mondayHoursText}</p>
				</div>
			)}
		</CardDescription>
	)
}
