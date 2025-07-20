'use client'

import { Link, usePathname } from '@/shared/i18n/navigation'

export const Logo = () => {
	const pathname = usePathname()
	const isHome = pathname === '/'

	const content = <span className='font-bold'>Lerno</span>

	return isHome ? (
		<div className='flex items-center text-white py-4'>{content}</div>
	) : (
		<Link className='flex items-center text-white py-4' href='/'>
			{content}
		</Link>
	)
}
