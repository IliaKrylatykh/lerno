import { FC } from 'react'
import { SchoolListCard } from '@/features/school'
import { cn } from '@/shared/ui/utils'
import { Skeleton } from '@/shared/ui'
import type { SchoolList as TSchoolList } from '@/entities/school'

interface Props {
	schools: TSchoolList
	isLoading?: boolean
	className?: string
}

export const SchoolList: FC<Props> = ({ schools, isLoading, className }) => {
	if (isLoading) {
		return (
			<div className={cn('flex flex-col items-center gap-4', className)}>
				{Array(6)
					.fill(0)
					.map((_, index) => (
						<Skeleton key={index} className='h-40 w-full rounded-xl' />
					))}
			</div>
		)
	}

	return (
		<div className={cn('flex flex-col items-center gap-4', className)}>
			{schools.map(school => (
				<SchoolListCard key={school.id} school={school} />
			))}
		</div>
	)
}
