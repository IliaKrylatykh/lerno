import { NextRequest, NextResponse } from 'next/server'
import { Locale } from '@/shared/types'
import { supabase } from '@/shared/lib/db'
import { School } from '@/entities/school'

export async function GET(request: NextRequest): Promise<NextResponse> {
	const pathname = request.nextUrl.pathname
	const pathSegments = pathname.split('/')
	const locale = (pathSegments[2] as Locale) ?? 'sr'
	const schoolSlug = pathSegments[pathSegments.length - 1]

	try {
		const { data, error } = await supabase.from('schools').select(`
        id,
        main_photo,
        slug,
        school_contacts (
          type,
          value,
          description
        ),
        school_translations (
          name,
          address,
          description,
          lang
        )
      `)

		if (error || !data) {
			console.error('[SUPABASE_FETCH_ERROR]', error?.message)
			return NextResponse.json(
				{ error: error?.message || 'Unknown error' },
				{ status: 500 }
			)
		}

		const schoolData = data.find(s => s.slug === schoolSlug)

		if (!schoolData) {
			return NextResponse.json({ error: 'School not found' }, { status: 404 })
		}

		const translation = schoolData.school_translations.find(
			t => t.lang === locale
		)

		if (!translation) {
			return NextResponse.json(
				{ error: 'Translation not found' },
				{ status: 404 }
			)
		}

		const mainPhotoPath = schoolData.main_photo
		const photoData = mainPhotoPath
			? supabase.storage.from('institutions').getPublicUrl(mainPhotoPath)
			: null

		const photoUrl = photoData?.data?.publicUrl ?? null

		const school: School = {
			id: schoolData.id,
			mainPhoto: photoUrl,
			name: translation.name,
			slug: schoolData.slug,
			address: translation.address,
			description: translation.description,
		}

		return NextResponse.json(school)
	} catch (error) {
		console.error('[SCHOOL_GET_ERROR]', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
