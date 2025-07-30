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
		'flex h-full items-center justify-center rounded-none border-b-4 text-white hover:bg-gray-800 hover:text-white py-4 cursor-pointer'

	const isActive = (path: string) =>
		pathname === path || pathname.startsWith(`${path}/`)

	return (
		<nav className='h-full flex flex-row'>
			{navItems.map(item => {
				const active = isActive(item.href)
				const button = (
					<Button
						key={item.href}
						variant='ghost'
						className={`${buttonBaseClasses} ${
							active ? 'border-red-700' : 'border-transparent'
						}`}
						aria-current={active ? 'page' : undefined}
					>
						{t(item.label)}
					</Button>
				)

				return active ? (
					<div key={item.href} className='h-full flex'>
						{button}
					</div>
				) : (
					<Link key={item.href} href={item.href} className='h-full flex'>
						{button}
					</Link>
				)
			})}
		</nav>
	)
}
