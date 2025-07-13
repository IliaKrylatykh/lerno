import { AppFooter } from '@/widgets/app-footer'
import { AppHeader } from '@/widgets/app-header'

export default async function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='flex flex-col min-h-screen'>
			<AppHeader />
			<main className='flex-grow'>{children}</main>
			<AppFooter />
		</div>
	)
}
