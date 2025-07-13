import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/shared/lib/db'
import { KindergartenList } from '@/entities/kindergarten'
import { Locale } from '@/shared/types'

export async function GET(request: NextRequest): Promise<NextResponse> {
	const pathname = request.nextUrl.pathname
	const segments = pathname.split('/')
	const lang = (segments[2] as Locale) ?? 'en'

	try {
		const kindergartensFromDb = await db.kindergarten.findMany({
			include: {
				translations: {
					where: { lang },
				},
				contacts: true,
			},
		})

		const kindergartens: KindergartenList = kindergartensFromDb.map(
			kindergarten => {
				const translation = kindergarten.translations[0]

				return {
					id: kindergarten.id,
					name: translation?.name ?? '',
					slug: translation?.slug ?? '',
					description: translation?.description ?? '',
					address: translation?.address ?? '',
					thumbnail: '',
				}
			}
		)

		return NextResponse.json(kindergartens)
	} catch (error) {
		console.error('[SCHOOLS_GET_ERROR]', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
