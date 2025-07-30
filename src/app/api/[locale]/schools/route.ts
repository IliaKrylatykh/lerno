import { NextRequest, NextResponse } from 'next/server'
import { SchoolList } from '@/entities/school'
import { Locale } from '@/shared/types'
import { supabase } from '@/shared/lib/db'

export async function GET(request: NextRequest): Promise<NextResponse> {
	const pathname = request.nextUrl.pathname
	const pathSegments = pathname.split('/')
	const locale = (pathSegments[2] as Locale) ?? 'sr'

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

		if (error) {
			console.error('[SUPABASE_FETCH_ERROR]', error.message)
			return NextResponse.json({ error: error.message }, { status: 500 })
		}

		const schools: SchoolList = data.reduce<SchoolList>((acc, schoolData) => {
			const translation = schoolData.school_translations.find(
				t => t.lang === locale
			)

			if (!translation) {
				console.warn(
					`[MISSING_TRANSLATION] School ID=${schoolData.id} slug=${schoolData.slug} missing locale: ${locale}`
				)
				return acc
			}

			const mainPhotoPath = schoolData.main_photo
			const photoData = mainPhotoPath
				? supabase.storage.from('institutions').getPublicUrl(mainPhotoPath)
				: null

			const photoUrl = photoData?.data?.publicUrl ?? null

			acc.push({
				id: schoolData.id,
				mainPhoto: photoUrl,
				name: translation.name,
				slug: schoolData.slug,
				description: translation.description,
				address: translation.address,
			})

			return acc
		}, [])

		return NextResponse.json(schools)
	} catch (error) {
		console.error('[SCHOOLS_GET_ERROR]', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
