import Image from 'next/image'
import { getKindergarten } from '@/entities/kindergarten'
import { Locale } from '@/shared/types'
import {
	Badge,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Container,
} from '@/shared/ui'

export default async function KindergartenPage({
	params,
}: {
	params: {
		locale: Locale
		citySlug: string
		kindergartenSlug: string
	}
}) {
	const { locale, kindergartenSlug } = params

	const kindergarten = await getKindergarten(locale, kindergartenSlug)

	console.log(kindergarten)

	if (!kindergarten) {
		return (
			<div className='text-center mt-10 text-red-600'>
				Детский сад не найден или произошла ошибка загрузки.
			</div>
		)
	}

	const ageRange =
		kindergarten.ageGroups && kindergarten.ageGroups.length > 0
			? `${kindergarten.ageGroups[0]}–${kindergarten.ageGroups.at(-1)} лет`
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
							{ageRange && <Badge variant='outline'>Возраст: {ageRange}</Badge>}
							{kindergarten.isPrivate && (
								<Badge variant='secondary'>Частный садик</Badge>
							)}
						</div>
					</CardHeader>
					<CardContent>
						<p className='text-muted-foreground leading-relaxed text-base'>
							{kindergarten.description}
						</p>
					</CardContent>
				</Card>

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
						<CardTitle className='text-xl'>Основное</CardTitle>
					</CardHeader>
					<CardContent className='space-y-2 text-sm sm:text-base'>
						{ageRange && (
							<div>
								Возрастные группы:{' '}
								<span className='font-medium text-slate-800'>{ageRange}</span>
							</div>
						)}
						{mondayHours && (
							<div>
								Часы работы (пн):{' '}
								<span className='font-medium text-slate-800'>
									{mondayHours}
								</span>
							</div>
						)}
						<div>
							Статус:{' '}
							<span className='font-medium text-slate-800'>
								{kindergarten.isPrivate ? 'Частный' : 'Государственный'}
							</span>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className='text-xl'>Контакты</CardTitle>
					</CardHeader>
					<CardContent className='grid gap-2 text-muted-foreground text-sm sm:text-base'>
						<div>
							📍 {kindergarten.address}, {kindergarten.city}
						</div>
						{kindergarten.area && <div>🏙️ Район: {kindergarten.area}</div>}
						<div>
							🌍 Координаты: {kindergarten.lat}, {kindergarten.lon}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className='text-xl'>Режим работы</CardTitle>
					</CardHeader>
					<CardContent className='flex flex-col gap-y-2 max-w-sm text-sm sm:text-base'>
						{Object.entries(kindergarten.workingHours).map(([day, hours]) => (
							<div key={day} className='flex items-center justify-between'>
								<span className='capitalize'>{day}</span>
								<span className='font-medium text-slate-800'>
									{hours ? `${hours.from} – ${hours.to}` : 'Выходной'}
								</span>
							</div>
						))}
					</CardContent>
				</Card>
			</div>
		</Container>
	)
}
