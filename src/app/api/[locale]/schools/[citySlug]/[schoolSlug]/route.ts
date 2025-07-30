import { NextRequest, NextResponse } from 'next/server'
import { Locale } from '@/shared/types'
import { supabase } from '@/shared/lib/db'
import { School } from '@/entities/school'

export async function GET(request: NextRequest): Promise<NextResponse> {
	const pathname = request.nextUrl.pathname
	const segments = pathname.split('/')
	const lang = (segments[2] as Locale) ?? 'en'
	const schoolSlug = segments[segments.length - 1]

	try {
		const { data, error } = await supabase.from('schools').select(`
        id,
        main_photo,
        slugs,
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

		if (error || !data) {
			console.error('[SUPABASE_FETCH_ERROR]', error?.message)
			return NextResponse.json(
				{ error: error?.message || 'Unknown error' },
				{ status: 500 }
			)
		}

		const record = data.find(k => k.slugs?.[lang] === schoolSlug)

		if (!record) {
			return NextResponse.json({ error: 'School not found' }, { status: 404 })
		}

		const translation = record.school_translations.find(t => t.lang === lang)

		const photoPath = record.main_photo
		const photoData = photoPath
			? supabase.storage.from('institutions').getPublicUrl(photoPath)
			: null

		const photoUrl = photoData?.data?.publicUrl ?? null

		const school: School = {
			id: record.id,
			mainPhoto: photoUrl,
			name: translation?.name ?? '',
			slug: record.slugs?.[lang] ?? '',
			slugs: record.slugs ?? {},
			address: translation?.address ?? '',
			description: translation?.description ?? '',
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
