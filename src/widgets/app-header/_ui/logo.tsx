import { Link } from '@/shared/i18n/navigation'

export const Logo = () => {
	return (
		<Link className='flex items-center text-white py-4' href='/'>
			<span className='font-bold'>Lerno</span>
		</Link>
	)
}
