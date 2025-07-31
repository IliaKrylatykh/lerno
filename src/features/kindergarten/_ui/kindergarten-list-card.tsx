import { KindergartenListItem } from '@/entities/kindergarten'
import { Link } from '@/shared/i18n/navigation'
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui'
import { cn } from '@/shared/ui'
import Image from 'next/image'
import { FC } from 'react'
import { KindergartenListCardCharacteristics } from './kindergarten-list-card-characteristics'

interface Props {
	kindergarten: KindergartenListItem
	className?: string
}

export const KindergartenListCard: FC<Props> = ({
	kindergarten,
	className,
}) => {
	return (
		<Link
			href={`kindergartens/subotica/${kindergarten.slug}`}
			className={cn('flex flex-col gap-2 w-full', className)}
		>
			<Card className='flex flex-row flex-grow py-0 rounded-br-lg rounded-tr-lg hover:shadow-xl transition-shadow duration-300 ease-in-out'>
				<div className='flex justify-center rounded-bl-lg rounded-tl-lg relative w-40 h-40 bg-slate-400'>
					{kindergarten.mainPhoto ? (
						<Image
							src={kindergarten.mainPhoto}
							alt='kindergarten logo'
							fill
							className='object-cover rounded-bl-lg rounded-tl-lg'
							sizes='160px'
						/>
					) : (
						<Image
							src={'/svg/no-image.svg'}
							alt='no-image-icon'
							width={80}
							height={80}
						/>
					)}
				</div>
				<div className='flex flex-grow flex-col mt-4 justify-between'>
					<CardHeader>
						<CardTitle className='flex justify-between gap-2'>
							{kindergarten.name}
						</CardTitle>
						<CardDescription>{kindergarten.address}</CardDescription>
					</CardHeader>
				</div>
				<KindergartenListCardCharacteristics
					ageGroups={kindergarten.ageGroups}
				/>
			</Card>
		</Link>
	)
}
