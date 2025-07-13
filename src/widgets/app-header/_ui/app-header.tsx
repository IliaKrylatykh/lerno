import { Container } from '@/shared/ui'
import { FC } from 'react'
import { Logo } from './logo'
import { Actions } from './actions'
import { Navigation } from './navigation'

interface Props {
	isMainPage?: boolean
	className?: string
}

export const AppHeader: FC<Props> = ({ isMainPage }) => {
	return (
		<header className='w-full border-b bg-gray-900'>
			<Container className='flex items-center justify-between'>
				<Logo />
				{!isMainPage && <Navigation />}
				<Actions isMainPage={isMainPage} />
			</Container>
		</header>
	)
}
