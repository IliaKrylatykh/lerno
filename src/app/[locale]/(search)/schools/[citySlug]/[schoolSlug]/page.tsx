import Image from 'next/image'
import { getSchool } from '@/entities/school'
import { Locale } from '@/shared/types'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Container,
} from '@/shared/ui'

export default async function SchoolPage({
	params,
}: {
	params: Promise<{
		locale: Locale
		citySlug: string
		schoolSlug: string
	}>
}) {
	const resolvedParams = await params
	const locale = resolvedParams.locale
	const schoolSlug = resolvedParams.schoolSlug

	const school = await getSchool(locale, schoolSlug)

	console.log(school)

	if (!school) {
		return (
			<div className='text-center mt-10 text-red-600'>
				Детский сад не найден или произошла ошибка загрузки.
			</div>
		)
	}

	return (
		<Container className='mt-4 flex justify-center'>
			<div className='max-w-4xl mx-auto p-6 space-y-6'>
				<Card className='shadow-xl'>
					<CardHeader>
						<CardTitle className='text-2xl'>{school.name}</CardTitle>
						<div className='mt-2 flex flex-wrap items-center gap-2'>
							{/* <Badge variant='outline'>от 2 до 6 лет</Badge> */}
							{/* <Badge variant='outline'>Частный</Badge> */}
							{/* <Badge variant='outline'>Суботица</Badge> */}
						</div>
					</CardHeader>
					<CardContent>
						<p className='text-muted-foreground'>{school.description}</p>
					</CardContent>
				</Card>

				{school.mainPhoto && (
					<Card className='overflow-hidden rounded-2xl'>
						<Image
							src={school.mainPhoto}
							alt={`Фото ${school.name}`}
							width={800}
							height={400}
							className='object-cover w-full h-auto'
						/>
					</Card>
				)}

				<Card>
					<CardHeader>
						<CardTitle>Контакты</CardTitle>
					</CardHeader>
					<CardContent className='space-y-2 text-sm text-muted-foreground'>
						<div>📍 Адрес: {school.address}, Суботица</div>
					</CardContent>
				</Card>

				{/* <Card> 
					{/* <CardHeader>
						<CardTitle>Дополнительная информация</CardTitle>
					</CardHeader> 
					<CardContent className='text-sm text-muted-foreground space-y-1'>
						<div>🕘 Режим работы: 7:00 – 17:00</div>
						<div>🍽️ Питание: 4-разовое</div>
						<div>🧒 Группы: младшая, средняя, подготовительная</div>
						<div>💬 Языки: сербский, английский</div>
					</CardContent> 
				</Card> */}
			</div>
		</Container>
	)
}
