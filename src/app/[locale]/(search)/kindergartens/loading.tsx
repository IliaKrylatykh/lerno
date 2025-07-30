import { Container, Skeleton } from '@/shared/ui'

export default function Loading() {
	return (
		<Container className='mt-4 flex'>
			<div className='flex-1 ml-4 flex flex-col items-center gap-4'>
				{Array(6)
					.fill(0)
					.map((_, index) => (
						<Skeleton key={index} className='h-40 w-full bg-white' />
					))}
			</div>
		</Container>
	)
}
