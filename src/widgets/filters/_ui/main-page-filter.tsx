'use client'

import { Button, Card, CardContent } from '@/shared/ui'
import { cn } from '@/shared/ui/utils'
import Image from 'next/image'
import { FC, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/shared/i18n/navigation'

export const MainPageFilters: FC = () => {
	const tCommon = useTranslations('Common')
	const locale = useLocale()

	const [selectedType, setSelectedType] = useState<'kindergartens' | 'schools'>(
		'kindergartens'
	)

	return (
		<Card className='w-fit mx-auto'>
			<CardContent className='flex flex-col gap-4 p-4'>
				<div className='flex flex-col sm:flex-row gap-2'>
					<Button
						onClick={() => setSelectedType('kindergartens')}
						variant='outline'
						className={cn(
							'flex-1 min-w-[250px] px-4 py-3 flex items-center justify-center font-semibold text-base sm:text-xl gap-2 sm:gap-4 border-2 text-black cursor-pointer',
							selectedType === 'kindergartens'
								? 'bg-blue-400 border-black hover:bg-blue-500'
								: 'bg-white border-black hover:bg-gray-200'
						)}
					>
						<Image
							src='/svg/kindergarten.svg'
							alt='kindergarten-icon'
							width={20}
							height={20}
						/>
						{tCommon('kindergartens')}
					</Button>
					<Button
						onClick={() => setSelectedType('schools')}
						variant='outline'
						className={cn(
							'flex-1 min-w-[250px] px-4 py-3 flex items-center justify-center font-semibold text-base sm:text-xl gap-2 sm:gap-4 border-2 text-black cursor-pointer',
							selectedType === 'schools'
								? 'bg-blue-400 border-black hover:bg-blue-500'
								: 'bg-white border-black hover:bg-gray-200'
						)}
					>
						<Image
							src='/svg/school.svg'
							alt='school-icon'
							width={20}
							height={20}
						/>
						{tCommon('schools')}
					</Button>
				</div>

				<Link href={`${locale}/${selectedType}`} className='w-full'>
					<Button className='w-full font-semibold text-base sm:text-xl gap-2 sm:gap-4 border-2 text-black border-black cursor-pointer bg-cyan-600 hover:bg-cyan-700'>
						{tCommon('search')}
					</Button>
				</Link>
			</CardContent>
		</Card>
	)
}
