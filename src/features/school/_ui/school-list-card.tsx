import { School } from '@/entities/school'
import { Link } from '@/shared/i18n/navigation'
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui'
import { cn } from '@/shared/ui'
import Image from 'next/image'
import { FC } from 'react'

interface Props {
	school: School
	className?: string
}

export const SchoolListCard: FC<Props> = ({ school, className }) => {
	return (
		<Link
			href={`schools/subotica/${school.slug}`}
			className={cn('flex flex-col gap-2 w-full', className)}
		>
			<Card className='flex flex-row flex-grow py-0 hover:shadow-xl transition-shadow duration-300 ease-in-out'>
				<div className='flex justify-center rounded-bl-xl rounded-tl-xl relative w-40 h-40 bg-slate-400'>
					{school.mainPhoto ? (
						<Image
							src={school.mainPhoto}
							alt='school logo'
							fill
							className='object-cover rounded-bl-xl rounded-tl-xl'
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
							{school.name}
						</CardTitle>
						<CardDescription>{school.address}</CardDescription>
					</CardHeader>
				</div>
			</Card>
		</Link>
	)
}
