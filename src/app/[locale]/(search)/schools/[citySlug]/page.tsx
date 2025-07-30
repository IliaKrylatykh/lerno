import { getSchoolList } from '@/entities/school'
import { Locale } from '@/shared/types/language'
import { Container } from '@/shared/ui'
import { SchoolList } from '@/widgets/school-list'

export default async function SchoolsPage({
	params,
}: {
	params: Promise<{
		locale: Locale
	}>
}) {
	const resolvedParams = await params
	const locale = resolvedParams.locale

	const schools = await getSchoolList(locale)

	return (
		<Container className='mt-4 flex'>
			<div className='flex-grow ml-4'>
				<SchoolList schools={schools} />
			</div>
		</Container>
	)
}
