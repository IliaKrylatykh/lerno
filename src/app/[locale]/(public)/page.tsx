import { Container } from '@/shared/ui'
import { MainPageFilters } from '@/widgets/filters/client'
import { useTranslations } from 'next-intl'

export default function HomePage() {
	const t = useTranslations('home')

	return (
		<Container className='mt-4 flex flex-col items-center'>
			<h1 className='font-semibold text-2xl mb-8 text-center'>{t('title')}</h1>
			<div className='flex gap-8 justify-center mt-24'>
				<MainPageFilters />
			</div>
		</Container>
	)
}
