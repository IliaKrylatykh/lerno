import { NextRequest, NextResponse } from 'next/server'
import { Locale } from '@/shared/types'
import { supabase } from '@/shared/lib/db'
import { Kindergarten } from '@/entities/kindergarten'

export async function GET(request: NextRequest): Promise<NextResponse> {
	const pathname = request.nextUrl.pathname
	const segments = pathname.split('/')
	const lang = (segments[2] as Locale) ?? 'en'
	const kindergartenSlug = segments[segments.length - 1]

	try {
		const { data, error } = await supabase.from('kindergartens').select(`
				id,
				main_photo,
				slugs,
				kindergarten_contacts (
					type,
					value,
					description
				),
				kindergarten_translations (
					name,
					slug,
					address,
					description,
					lang
				)
			`)

		if (error || !data) {
			console.error('[SUPABASE_FETCH_ERROR]', error.message)
			return NextResponse.json({ error: error.message }, { status: 500 })
		}

		const record = data.find(k =>
			k.kindergarten_translations?.some(
				t => t.lang === lang && t.slug === kindergartenSlug
			)
		)

		if (!record) {
			return NextResponse.json(
				{ error: 'Kindergarten not found' },
				{ status: 404 }
			)
		}

		const translation = record.kindergarten_translations.find(
			t => t.lang === lang && t.slug === kindergartenSlug
		)

		const photoPath = record.main_photo
		const photoData = photoPath
			? supabase.storage.from('institutions').getPublicUrl(photoPath)
			: null

		const photoUrl = photoData?.data?.publicUrl ?? null

		const kindergarten: Kindergarten = {
			id: record.id,
			mainPhoto: photoUrl,
			name: translation?.name ?? '',
			slug: translation?.slug ?? '',
			slugs: record.slugs ?? {},
			address: translation?.address ?? '',
			description: translation?.description ?? '',
		}

		return NextResponse.json(kindergarten)
	} catch (error) {
		console.error('[KINDERGARTEN_GET_ERROR]', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
