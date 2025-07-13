import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/shared/lib/db'
import { SchoolList } from '@/entities/school'
import { Locale } from '@/shared/types'

export async function GET(request: NextRequest): Promise<NextResponse> {
	const pathname = request.nextUrl.pathname
	const segments = pathname.split('/')
	const lang = (segments[2] as Locale) ?? 'en'

	try {
		const schoolsFromDb = await db.school.findMany({
			include: {
				translations: {
					where: { lang },
				},
				contacts: true,
			},
		})

		const schools: SchoolList = schoolsFromDb.map(school => {
			const translation = school.translations[0]

			return {
				id: school.id,
				name: translation?.name ?? '',
				slug: translation?.slug ?? '',
				description: translation?.description ?? '',
				address: translation?.address ?? '',
				thumbnail: '',
			}
		})

		return NextResponse.json(schools)
	} catch (error) {
		console.error('[SCHOOLS_GET_ERROR]', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
