import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/shared/lib/db'
import { AreaList, SubareaList, Locale, Database } from '@/shared/types'

type TranslationRow =
	Database['public']['Tables']['location_translations']['Row']
type LocationRow = Database['public']['Tables']['locations']['Row']

type LocationWithTranslations = LocationRow & {
	location_translations: TranslationRow[]
	areas?: (LocationRow & {
		location_translations: TranslationRow[]
		subareas?: (LocationRow & { location_translations: TranslationRow[] })[]
	})[]
}

export async function GET(request: NextRequest): Promise<NextResponse> {
	const pathname = request.nextUrl.pathname
	const pathSegments = pathname.split('/')
	const locale = (pathSegments[2] as Locale) ?? 'sr'
	const citySlug = (pathSegments[4] as string) ?? 'subotica'

	try {
		const { data, error } = await supabase
			.from('locations')
			.select(
				`
        id,
        slug,
        location_translations(name, lang),
        areas:locations!parent_id (
          id,
          slug,
          location_translations(name, lang),
          subareas:locations!parent_id (
            id,
            slug,
            location_translations(name, lang)
          )
        )
      `
			)
			.eq('slug', citySlug)
			.eq('type', 'city')
			.single()

		if (error || !data) {
			console.error('[SUPABASE_FETCH_ERROR]', error?.message)
			return NextResponse.json(
				{ error: error?.message || 'Not found' },
				{ status: 404 }
			)
		}

		const city: LocationWithTranslations =
			data as unknown as LocationWithTranslations

		const areas: AreaList = (city.areas ?? []).map(area => {
			const areaName =
				area.location_translations?.find(t => t.lang === locale)?.name ?? ''
			const subareas: SubareaList = (area.subareas ?? []).map(subarea => {
				const subareaName =
					subarea.location_translations?.find(t => t.lang === locale)?.name ??
					''
				return { id: subarea.id, slug: subarea.slug, name: subareaName }
			})
			return { id: area.id, slug: area.slug, name: areaName, subareas }
		})

		return NextResponse.json({
			id: city.id,
			slug: city.slug,
			name:
				city.location_translations?.find(t => t.lang === locale)?.name ?? '',
			areas,
		})
	} catch (err) {
		console.error('[CITY_GET_ERROR]', err)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
