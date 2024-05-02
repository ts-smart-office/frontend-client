import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { FC } from 'react'

const LinkHome: FC = () => {
	return (
		<Link
			href={'/'}
			className='flex items-center gap-2 font-urbanist text-darkColor font-semibold py-5'
		>
			<ArrowLeftCircleIcon className='w-8 h-8 stroke-1' />
			Back to homepage
		</Link>
	)
}

export default LinkHome
