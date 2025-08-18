import { getAreaList, getCityList } from '@/entities/city'
import { getKindergartenList } from '@/entities/kindergarten'
import { Locale } from '@/shared/types/language'
import { Container } from '@/shared/ui'
import { KindergartenList } from '@/widgets/kindergarten-list'

export default async function KindergartensPage({
	params,
}: {
	params: Promise<{
		locale: Locale
	}>
}) {
	const resolvedParams = await params
	const locale = resolvedParams.locale

	const kindergartens = await getKindergartenList(locale)

	const cities = await getCityList(locale)

	// only Subotica for test
	const areas = await getAreaList(locale, cities[0].id)

	console.log(areas)

	return (
		<Container className='mt-4 flex'>
			<div className='flex-grow ml-4'>
				<KindergartenList kindergartens={kindergartens} />
			</div>
		</Container>
	)
}
