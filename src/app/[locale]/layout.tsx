import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/shared/ui'
import { getMessages, getTranslations } from 'next-intl/server'
import { hasLocale, Locale, NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/shared/i18n/routing'
import NextTopLoader from 'nextjs-toploader'

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
})

export async function generateMetadata({
	params,
}: {
	params: { locale: Locale }
}): Promise<Metadata> {
	const { locale } = params

	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}

	const t = await getTranslations({ locale, namespace: 'common' })

	return {
		title: t('seo.title'),
		description: t('seo.description'),
		openGraph: {
			title: t('seo.title'),
			description: t('seo.description'),
			images: ['https://lerno.rs/og-preview.png'],
			locale,
			url: `https://lerno.rs/${locale}`,
			siteName: 'Lerno',
		},
	}
}

export default async function RootLayout(
	props: Readonly<{
		children: React.ReactNode
		params: Promise<{ locale: Locale }>
	}>
) {
	const params = await props.params

	const { children } = props

	const { locale } = await params
	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}

	const messages = await getMessages({ locale })

	return (
		<html lang={locale}>
			<body
				className={cn(
					'min-h-screen flex flex-col bg-blue-50 font-sans antialiased',
					fontSans.variable
				)}
			>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<NextTopLoader showSpinner={false} />
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
