import {
	Badge,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Container,
} from '@/shared/ui'
import Image from 'next/image'

export default async function KindergartenPage({
	params,
}: {
	params: Promise<{
		citySlug: string
		kindergartenSlug: string
		kindergartenId: string
	}>
}) {
	const resolvedParams = await params
	console.log(resolvedParams)
	return (
		<Container className='mt-4 flex justify-center'>
			<div className='max-w-4xl mx-auto p-6 space-y-6'>
				<Card className='shadow-xl'>
					<CardHeader>
						<CardTitle className='text-2xl'>Детский сад Солнышко</CardTitle>
						<div className='mt-2 flex flex-wrap items-center gap-2'>
							<Badge variant='outline'>от 2 до 6 лет</Badge>
							<Badge variant='outline'>Частный</Badge>
							<Badge variant='outline'>Суботица</Badge>
							<Badge variant='default'>⭐ 4.7</Badge>
						</div>
					</CardHeader>
					<CardContent>
						<p className='text-muted-foreground'>
							Детский сад Солнышко предлагает безопасную и развивающую среду для
							ваших детей. Программа обучения включает творчество, иностранные
							языки и физическую активность.
						</p>
					</CardContent>
				</Card>

				{/* Галерея */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					{['/img1.jpg', '/img2.jpg', '/img3.jpg'].map((src, i) => (
						<Card key={i} className='overflow-hidden rounded-2xl'>
							<Image
								src={src}
								alt={`Фото ${i + 1}`}
								width={400}
								height={300}
								className='object-cover w-full h-60'
							/>
						</Card>
					))}
				</div>

				{/* Контактная информация */}
				<Card>
					<CardHeader>
						<CardTitle>Контакты</CardTitle>
					</CardHeader>
					<CardContent className='space-y-2 text-sm text-muted-foreground'>
						<div>📍 Адрес: ул. Цветочная 12, Суботица</div>
						<div>📞 Телефон: +381 24 123 456</div>
						<div>📧 Email: solnce@kindergarten.rs</div>
						<div>
							🌐 Сайт:{' '}
							<a href='https://solnce.rs' className='underline text-blue-600'>
								solnce.rs
							</a>
						</div>
					</CardContent>
				</Card>

				{/* Призыв к действию */}
				<div className='flex justify-end'>
					<Button>Оставить заявку</Button>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Дополнительная информация</CardTitle>
					</CardHeader>
					<CardContent className='text-sm text-muted-foreground space-y-1'>
						<div>🕘 Режим работы: 7:00 – 17:00</div>
						<div>🍽️ Питание: 4-разовое</div>
						<div>🧒 Группы: младшая, средняя, подготовительная</div>
						<div>💬 Языки: сербский, английский</div>
					</CardContent>
				</Card>
			</div>
		</Container>
	)
}
