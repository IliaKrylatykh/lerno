import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './shared/i18n/routing'

const validCitySlugs = ['subotica']

const appMiddleware = (request: NextRequest) => {
	const { pathname } = request.nextUrl

	const match = pathname.match(
		/^\/(en|ru|sr)\/(kindergartens|schools)\/([^\/?#]+)/
	)

	if (match) {
		const [, locale, section, citySlug] = match

		const isValid = validCitySlugs.includes(citySlug)

		if (!isValid) {
			const url = request.nextUrl.clone()
			url.pathname = `/${locale}/${section}`
			return NextResponse.redirect(url)
		}
	}

	return createMiddleware(routing)(request)
}

export default appMiddleware

export const config = {
	matcher: ['/', '/(en|sr|ru)/:path*'],
}
