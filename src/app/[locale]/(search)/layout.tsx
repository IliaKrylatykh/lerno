import { AppFooter } from '@/widgets/app-footer'
import { AppHeader } from '@/widgets/app-header'

export default async function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='flex flex-col'>
			<AppHeader />
			<main className='flex-grow min-h-screen'>{children}</main>
			<AppFooter />
		</div>
	)
}
