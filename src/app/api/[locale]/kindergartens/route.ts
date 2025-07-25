import { NextRequest, NextResponse } from 'next/server'
import { KindergartenList } from '@/entities/kindergarten'
import { Locale } from '@/shared/types'
import { supabase } from '@/shared/lib/db'

export async function GET(request: NextRequest): Promise<NextResponse> {
	const pathname = request.nextUrl.pathname
	const segments = pathname.split('/')
	const lang = (segments[2] as Locale) ?? 'en'

	try {
		const { data, error } = await supabase.from('kindergartens').select(`
				id,
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

		if (error) {
			console.error('[SUPABASE_FETCH_ERROR]', error.message)
			return NextResponse.json({ error: error.message }, { status: 500 })
		}

		const kindergartens: KindergartenList = (data ?? []).map(k => {
			const translation = k.kindergarten_translations?.find(
				t => t.lang === lang
			)

			return {
				id: k.id,
				name: translation?.name ?? '',
				slug: translation?.slug ?? '',
				description: translation?.description ?? '',
				address: translation?.address ?? '',
				thumbnail: '',
			}
		})

		return NextResponse.json(kindergartens)
	} catch (error) {
		console.error('[KINDERGARTENS_GET_ERROR]', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
