import Image from 'next/image'
import { FC } from 'react'

type TNewsCardProps = {
	newsType: string
	newsTitle: string
}

const NewsCard: FC<TNewsCardProps> = ({ newsType, newsTitle }) => {
	return (
		<div className='col-span-6 xl:col-span-3 rounded-lg shadow-sm'>
			<div className='relative h-40 rounded-lg'>
				<Image
					src='/banner-2.jpg'
					alt='banner-1'
					fill
					className='absolute w-full h-full object-cover rounded-t-lg'
				/>
			</div>
			<div className='flex flex-col px-3 pt-2 pb-4 bg-white rounded-lg'>
				<p className='text-base underline underline-offset-4 decoration-greenBrand'>
					{newsType}
				</p>
				<h1 className='text-lg font-semibold'>{newsTitle}</h1>
			</div>
		</div>
	)
}

export default NewsCard
