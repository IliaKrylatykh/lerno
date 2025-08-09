'use client'

import {
	Badge,
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/shared/ui'
import { useTranslations } from 'next-intl'
import { FC } from 'react'

interface Props {
	isPrivate: boolean | null
}

export const KindergartenListCardLabels: FC<Props> = ({ isPrivate }) => {
	const t = useTranslations('kindergartens')

	return (
		<div className='flex gap-2'>
			<HoverCard>
				<HoverCardTrigger asChild>
					<Badge variant={'outline'}>
						{isPrivate ? t('private') : t('public')}
					</Badge>
				</HoverCardTrigger>
				<HoverCardContent className='w-fit'>
					{isPrivate ? t('privateKindergarten') : t('publicKindergarten')}
				</HoverCardContent>
			</HoverCard>
		</div>
	)
}
