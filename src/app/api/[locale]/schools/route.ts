import { NextRequest, NextResponse } from 'next/server'
import { SchoolList } from '@/entities/school'
import { Locale } from '@/shared/types'
import { supabase } from '@/shared/lib/db'

export async function GET(request: NextRequest): Promise<NextResponse> {
	const pathname = request.nextUrl.pathname
	const segments = pathname.split('/')
	const lang = (segments[2] as Locale) ?? 'en'

	try {
		const { data, error } = await supabase.from('schools').select(`
				id,
				school_contacts (
					type,
					value,
					description
				),
				school_translations (
					name,
					slug,
					address,
					description,
					lang
				)
			`)

		if (error) {
			console.error('[SUPABASE_FETCH_ERROR]', error.message)
			return NextResponse.json({ error: error.message }, { status: 500 })
		}

		const schools: SchoolList = (data ?? []).map(school => {
			const translation = school.school_translations?.find(t => t.lang === lang)

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
