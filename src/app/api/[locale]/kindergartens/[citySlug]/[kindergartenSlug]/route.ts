import { NextRequest, NextResponse } from 'next/server'
import { Locale, WorkingHours, workingHoursSchema } from '@/shared/types'
import { supabase } from '@/shared/lib/db'
import { Kindergarten } from '@/entities/kindergarten'

export async function GET(request: NextRequest): Promise<NextResponse> {
	const pathname = request.nextUrl.pathname
	const pathSegments = pathname.split('/')
	const locale = (pathSegments[2] as Locale) ?? 'sr'
	const kindergartenSlug = pathSegments[pathSegments.length - 1]

	try {
		const { data, error } = await supabase.from('kindergartens').select(`
        id,
        main_photo,
        slug,
				age_groups,
				is_private,
				working_hours,
				lat,
				lon,
				city:locations!city_id (
					slug,
					location_translations (name, lang)
				),
				area:locations!area_id (
					slug,
					location_translations (name, lang)
				),
				subarea:locations!subarea_id (
					slug,
					location_translations (name, lang)
				),
        kindergarten_contacts (
          type,
          value,
          description
        ),
        kindergarten_translations (
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

		const kindergartenData = data.find(k => k.slug === kindergartenSlug)

		if (!kindergartenData) {
			return NextResponse.json(
				{ error: 'Kindergarten not found' },
				{ status: 404 }
			)
		}

		const translation = kindergartenData.kindergarten_translations.find(
			t => t.lang === locale
		)

		if (!translation) {
			return NextResponse.json(
				{ error: 'Translation not found' },
				{ status: 404 }
			)
		}

		const workingHours: WorkingHours = workingHoursSchema.parse(
			kindergartenData.working_hours
		)

		const cityName =
			kindergartenData.city?.location_translations?.find(t => t.lang === locale)
				?.name ?? null
		const areaName =
			kindergartenData.area?.location_translations?.find(t => t.lang === locale)
				?.name ?? null
		const subareaName =
			kindergartenData.subarea?.location_translations?.find(
				t => t.lang === locale
			)?.name ?? null

		const mainPhotoPath = kindergartenData.main_photo
		const photoData = mainPhotoPath
			? supabase.storage.from('institutions').getPublicUrl(mainPhotoPath)
			: null

		const photoUrl = photoData?.data?.publicUrl ?? null

		const kindergarten: Kindergarten = {
			id: kindergartenData.id,
			mainPhoto: photoUrl,
			name: translation.name,
			slug: kindergartenData.slug,
			ageGroups: kindergartenData.age_groups,
			address: translation.address,
			description: translation.description,
			isPrivate: kindergartenData.is_private,
			workingHours,
			city: cityName,
			area: areaName,
			subarea: subareaName,
			lat: kindergartenData.lat,
			lon: kindergartenData.lon,
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
