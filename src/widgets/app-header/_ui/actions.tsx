// import { CitySwitcher } from "@/features/city/server";
import { LanguageSwitcher } from '@/features/i18n/client'
import { FC } from 'react'

interface Props {
	isMainPage?: boolean
	className?: string
}

export const Actions: FC<Props> = () => {
	return (
		<div className='flex items-center gap-2'>
			<LanguageSwitcher />
		</div>
	)
}
