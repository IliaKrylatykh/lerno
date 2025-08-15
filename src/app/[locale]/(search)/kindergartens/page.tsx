import { getKindergartenList } from '@/entities/kindergarten'
import { Locale } from '@/shared/types/language'
import { Container } from '@/shared/ui'
import { LeftSideFilters } from '@/widgets/filters/_ui/left-side-filters'
import { KindergartenList } from '@/widgets/kindergarten-list'

export default async function KindergartensPage({
	params,
	searchParams,
}: {
	params: Promise<{ locale: Locale }>
	searchParams: { type?: string }
}) {
	const { locale } = await params
	const type = searchParams.type || ''

	const kindergartens = await getKindergartenList(locale, { type })

	return (
		<Container className='mt-4 flex'>
			<LeftSideFilters />
			<div className='flex-grow ml-4'>
				<KindergartenList kindergartens={kindergartens} />
			</div>
		</Container>
	)
}
