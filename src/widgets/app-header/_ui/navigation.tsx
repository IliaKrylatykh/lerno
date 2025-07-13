'use client'

import { Link, usePathname } from '@/shared/i18n/navigation'
import { Button } from '@/shared/ui'
import { useTranslations } from 'next-intl'

const navItems = [
	{ href: '/kindergartens', label: 'kindergartens' },
	{ href: '/schools', label: 'schools' },
]

export const Navigation = () => {
	const t = useTranslations('Common')
	const pathname = usePathname()

	const buttonBaseClasses =
		'flex h-full items-center justify-center rounded-none border-b-4 text-white hover:bg-gray-800 hover:text-white py-4'

	const isActive = (path: string) => pathname.startsWith(path)

	return (
		<nav className='h-full flex flex-row'>
			{navItems.map(item => (
				<Link href={item.href} key={item.href} className='h-full flex'>
					<Button
						variant='ghost'
						className={`${buttonBaseClasses} ${
							isActive(item.href) ? 'border-red-700' : 'border-transparent'
						}`}
						aria-current={isActive(item.href) ? 'page' : undefined}
					>
						{t(item.label)}
					</Button>
				</Link>
			))}
		</nav>
	)
}
