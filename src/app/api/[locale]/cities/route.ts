import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/shared/lib/db'
import { CityList, Locale } from '@/shared/types'

export async function GET(request: NextRequest): Promise<NextResponse> {
	const pathname = request.nextUrl.pathname
	const pathSegments = pathname.split('/')
	const locale = (pathSegments[2] as Locale) ?? 'sr'

	try {
		const { data, error } = await supabase
			.from('locations')
			.select('id, slug, location_translations(name, lang)')
			.eq('type', 'city')

		if (error) {
			console.error('[SUPABASE_FETCH_ERROR]', error.message)
			return NextResponse.json({ error: error.message }, { status: 500 })
		}

		const cities: CityList = data.map(city => {
			const cityName =
				city.location_translations?.find(t => t.lang === locale)?.name ?? ''
			return {
				id: city.id,
				slug: city.slug,
				name: cityName,
			}
		})

		return NextResponse.json(cities)
	} catch (err) {
		console.error('[CITIES_GET_ERROR]', err)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
