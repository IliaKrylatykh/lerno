'use client'

import { Locale } from '@/shared/types/language'
import { useLocale } from 'next-intl'
import { useQuery } from '@tanstack/react-query'
import { getSchoolList } from '../services/get-school-list'

export const useGetSchoolList = () => {
	const locale = useLocale()

	const query = useQuery({
		queryKey: ['languages', locale],
		queryFn: () => getSchoolList(locale as Locale),
	})

	return query
}
