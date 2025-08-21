import Image from 'next/image'
import {
	getKindergarten,
	getKindergartenMetadata,
} from '@/entities/kindergarten'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/shared/types'
import {
	Badge,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Container,
} from '@/shared/ui'
import { KindergartenMap } from '@/features/kindergarten/client'

type Params = {
	locale: Locale
	citySlug: string
	kindergartenSlug: string
}

// export async function generateMetadata({ params }: { params: Params }) {
// 	return getKindergartenMetadata(
// 		params.locale,
// 		params.citySlug,
// 		params.kindergartenSlug
// 	)
// }

export default async function KindergartenPage({
	params,
}: {
	params: Promise<Params>
}) {
	const { locale, kindergartenSlug } = await params
	const tCommon = await getTranslations('common')
	const t = await getTranslations('kindergartens')

	const kindergarten = await getKindergarten(locale, kindergartenSlug)

	if (!kindergarten) {
		return (
			<div className='text-center mt-10 text-red-600'>
				{t('kindergartenPage.notFoundOrFetchError')}
			</div>
		)
	}

	const ageRange = kindergarten.ageGroups?.length
		? `${kindergarten.ageGroups[0]} - ${kindergarten.ageGroups.at(
				-1
		  )} ${tCommon('years')}`
		: null

	const monday = kindergarten.workingHours?.mon
	const mondayHours = monday ? `${monday.from} – ${monday.to}` : null

	return (
		<Container className='mt-6 flex justify-center'>
			<div className='w-full max-w-5xl mx-auto p-4 md:p-6 space-y-6'>
				<Card className='shadow-xl'>
					<CardHeader>
						<CardTitle className='text-3xl font-bold'>
							{kindergarten.name}
						</CardTitle>
						<div className='mt-2 flex flex-wrap items-center gap-2'>
							{ageRange && (
								<Badge variant='outline'>
									{tCommon('ages')}: {ageRange}
								</Badge>
							)}
							<Badge variant='secondary'>
								{kindergarten.isPrivate
									? t('privateKindergarten')
									: t('publicKindergarten')}
							</Badge>
						</div>
					</CardHeader>
					<CardContent>
						<p className='text-muted-foreground leading-relaxed text-base'>
							{kindergarten.description}
						</p>
					</CardContent>
				</Card>

				<div className='flex gap-6'>
					<Card className='flex flex-1'>
						<CardHeader>
							<CardTitle className='text-xl'>
								{t('kindergartenPage.basicInformation')}
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-2 text-sm sm:text-base'>
							{ageRange && (
								<div>
									{tCommon('ages')}:{' '}
									<span className='font-medium text-slate-800'>{ageRange}</span>
								</div>
							)}
							{mondayHours && (
								<div>
									{tCommon('workingHours')}:{' '}
									<span className='font-medium text-slate-800'>
										{mondayHours}
									</span>
								</div>
							)}
							<div>
								{t('kindergartenPage.kindergartenType')}:{' '}
								<span className='font-medium text-slate-800'>
									{kindergarten.isPrivate ? t('private') : t('public')}
								</span>
							</div>
						</CardContent>
					</Card>
					<Card className='flex flex-1'>
						<CardHeader>
							<CardTitle className='text-xl'>
								{tCommon('workingHours')}
							</CardTitle>
						</CardHeader>
						<CardContent className='flex flex-col gap-y-2 max-w-sm text-sm sm:text-base'>
							{Object.entries(kindergarten.workingHours).map(([day, hours]) => (
								<div key={day} className='flex items-center justify-between'>
									<span className='capitalize'>{day}</span>
									<span className='font-medium text-slate-800'>
										{hours ? `${hours.from} – ${hours.to}` : '-'}
									</span>
								</div>
							))}
						</CardContent>
					</Card>
				</div>

				{kindergarten.mainPhoto && (
					<Card className='overflow-hidden rounded-2xl'>
						<Image
							src={kindergarten.mainPhoto}
							alt={`Фото ${kindergarten.name}`}
							width={1200}
							height={600}
							className='object-cover w-full h-auto'
							priority
						/>
					</Card>
				)}

				<Card>
					<CardHeader>
						<CardTitle className='text-xl'>
							{t('kindergartenPage.contacts')}
						</CardTitle>
					</CardHeader>
					<CardContent className='grid gap-2 text-muted-foreground text-sm sm:text-base'>
						<div>
							📍 {kindergarten.address}, {kindergarten.city}
						</div>
						{kindergarten.area && (
							<div>
								🏙️ {t('kindergartenPage.district')}: {kindergarten.area}
							</div>
						)}
						{kindergarten &&
							kindergarten.lat &&
							kindergarten.lon &&
							kindergarten.address && (
								<KindergartenMap
									lat={kindergarten.lat}
									lon={kindergarten.lon}
									name={kindergarten.name}
									address={kindergarten.address}
								/>
							)}
					</CardContent>
				</Card>
			</div>
		</Container>
	)
}
