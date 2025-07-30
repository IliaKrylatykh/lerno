import { Container, Skeleton } from '@/shared/ui'

export default function Loading() {
	return (
		<Container className='mt-4 flex'>
			<Skeleton className='w-full h-96 rounded-xl' />
		</Container>
	)
}
