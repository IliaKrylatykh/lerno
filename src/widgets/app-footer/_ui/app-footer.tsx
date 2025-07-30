import { cn, Container } from '@/shared/ui'
import { FC } from 'react'
import { FooterText } from './text'

interface Props {
	isMainPage?: boolean
	className?: string
}

export const AppFooter: FC<Props> = ({ isMainPage, className }) => {
	if (isMainPage) return null

	return (
		<footer
			className={cn('w-full bg-gray-900 mt-10 text-white text-sm', className)}
		>
			<Container className='flex flex-col gap-4 py-6'>
				<p>2025 Lerno</p>

				<FooterText />

				{/* <div className="flex flex-wrap gap-x-4 gap-y-2">
          <Link
            href="/privacy-policy"
            className="underline hover:text-gray-300"
            target="_blank"
          >
            Политика конфиденциальности
          </Link>
          <span>·</span>
          <Link
            href="/terms-of-service"
            className="underline hover:text-gray-300"
            target="_blank"
          >
            Пользовательское соглашение
          </Link>
          <span>·</span>
          <a
            href="mailto:contact@edufinder.rs"
            className="underline hover:text-gray-300"
          >
            Связаться с нами
          </a>
        </div> */}
			</Container>
		</footer>
	)
}
