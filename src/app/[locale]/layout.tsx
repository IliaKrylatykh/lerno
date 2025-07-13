import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/shared/ui'
import { getMessages } from 'next-intl/server'
import { hasLocale, Locale, NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/shared/i18n/routing'

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
})

export const metadata: Metadata = {
	title: 'Lerno',
	description: 'About education in Serbia',
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
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
