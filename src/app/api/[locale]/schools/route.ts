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
				main_photo,
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

		const schools: SchoolList = (data ?? []).map(s => {
			const translation = s.school_translations?.find(t => t.lang === lang)

			const photoPath = s.main_photo
			const photoData = photoPath
				? supabase.storage.from('institutions').getPublicUrl(photoPath)
				: null

			const photoUrl = photoData?.data?.publicUrl ?? null

			return {
				id: s.id,
				mainPhoto: photoUrl,
				name: translation?.name ?? '',
				slug: translation?.slug ?? '',
				description: translation?.description ?? '',
				address: translation?.address ?? '',
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
