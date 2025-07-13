import { FC } from 'react'
import { KindergartenListCard } from '@/features/kindergarten'
import { cn } from '@/shared/ui/utils'
import { Skeleton } from '@/shared/ui'
import type { KindergartenList as TKindergartenList } from '@/entities/kindergarten'

interface Props {
	kindergartens: TKindergartenList
	isLoading?: boolean
	className?: string
}

export const KindergartenList: FC<Props> = ({
	kindergartens,
	isLoading,
	className,
}) => {
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
			{kindergartens.map(kindergarten => (
				<KindergartenListCard
					key={kindergarten.id}
					kindergarten={kindergarten}
				/>
			))}
		</div>
	)
}
