import { NextRequest, NextResponse } from 'next/server'
import { KindergartenList } from '@/entities/kindergarten'
import { Locale } from '@/shared/types'
import { supabase } from '@/shared/lib/db'

export async function GET(request: NextRequest): Promise<NextResponse> {
	const pathname = request.nextUrl.pathname
	const pathSegments = pathname.split('/')
	const locale = (pathSegments[2] as Locale) ?? 'sr'

	try {
		const { data, error } = await supabase.from('kindergartens').select(`
				id,
				main_photo,
				slug,
				age_groups,
				is_private,
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

		if (error) {
			console.error('[SUPABASE_FETCH_ERROR]', error.message)
			return NextResponse.json({ error: error.message }, { status: 500 })
		}

		const kindergartens: KindergartenList = data.reduce<KindergartenList>(
			(acc, kindergartenData) => {
				const translation = kindergartenData.kindergarten_translations.find(
					t => t.lang === locale
				)

				if (!translation) {
					console.warn(
						`[MISSING_TRANSLATION] Kindergarten ID=${kindergartenData.id} slug=${kindergartenData.slug} missing locale: ${locale}`
					)
					return acc
				}

				const mainPhotoPath = kindergartenData.main_photo
				const photoData = mainPhotoPath
					? supabase.storage.from('institutions').getPublicUrl(mainPhotoPath)
					: null

				const photoUrl = photoData?.data?.publicUrl ?? null

				acc.push({
					id: kindergartenData.id,
					mainPhoto: photoUrl,
					name: translation.name,
					slug: kindergartenData.slug,
					ageGroups: kindergartenData.age_groups,
					description: translation.description,
					address: translation.address,
					isPrivate: kindergartenData.is_private,
				})

				return acc
			},
			[]
		)

		return NextResponse.json(kindergartens)
	} catch (error) {
		console.error('[KINDERGARTENS_GET_ERROR]', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
