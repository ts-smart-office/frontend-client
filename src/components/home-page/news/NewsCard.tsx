import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

type TNewsCardProps = {
	newsType: string
	newsTitle: string
	newsImage: string
	newsId: string
}

const NewsCard: FC<TNewsCardProps> = ({
	newsType,
	newsTitle,
	newsImage,
	newsId,
}) => {
	return (
		<Link
			href={`/posts/${newsId}`}
			className='col-span-6 xl:col-span-3 rounded-lg shadow-sm'
		>
			<div className='relative h-32 md:h-40 rounded-lg'>
				<Image
					src={newsImage}
					alt='banner-1'
					fill
					className='absolute w-full h-full object-cover rounded-t-lg'
				/>
			</div>
			<div className='flex flex-col px-3 pt-2 pb-4 bg-white rounded-lg'>
				<p className='capitalize text-base underline underline-offset-4 decoration-greenBrand'>
					{newsType}
				</p>
				<h1 className='text-lg font-semibold line-clamp-2'>{newsTitle}</h1>
			</div>
		</Link>
	)
}

export default NewsCard
