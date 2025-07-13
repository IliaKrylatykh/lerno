import { KindergartenListItem } from '@/entities/kindergarten'
import { Link } from '@/shared/i18n/navigation'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/ui'
import { cn } from '@/shared/ui'
import Image from 'next/image'
import { FC } from 'react'

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
			href={`kindergartens/${kindergarten.id}`}
			className={cn('flex flex-col gap-2 w-full', className)}
			target='_blank'
		>
			<Card className='flex flex-row flex-grow py-0 rounded-none hover:shadow-2xl'>
				<div className='flex justify-center relative w-40 h-40 bg-slate-200'>
					{kindergarten.thumbnail ? (
						<Image
							src={kindergarten.thumbnail}
							alt='kindergarten logo'
							layout='fill'
							objectFit='cover'
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
				<div className='flex flex-grow flex-col justify-between'>
					<CardHeader>
						<CardTitle className='flex justify-between gap-2'>
							{kindergarten.name}
						</CardTitle>
						<CardDescription>{kindergarten.address}</CardDescription>
					</CardHeader>

					<CardContent className='flex px-4 pb-4 justify-between'>
						{/* <div className='flex gap-1'>
							{kindergarten.languages?.map(item => (
								<Image
									key={item.id}
									src={`/flags/${item.code}.svg`}
									alt='flag'
									width={30}
									height={30}
								/>
							))}
						</div> */}
					</CardContent>
				</div>
			</Card>
		</Link>
	)
}
