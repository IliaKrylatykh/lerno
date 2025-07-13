import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'picsum.photos',
			},
		],
	},
}

const withNextIntl = createNextIntlPlugin('./src/shared/i18n/request.ts')
export default withNextIntl(nextConfig)
