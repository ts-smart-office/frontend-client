import { FC } from 'react'
import NewsCard from './NewsCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const NewsSection: FC = () => {
	return (
		<div className='w-full flex flex-col justify-center items-center font-urbanist py-16 lg:py-32 gap-10'>
			<h1 className='text-3xl sm:text-[40px] leading-tight font-semibold text-center'>
				Latest News from Tiga Serangkai
			</h1>
			<div className='w-full grid grid-cols-12 gap-4 lg:gap-8'>
				<NewsCard
					newsType='Berita'
					newsTitle='Bimtek wujud kolaborasi pemda kabupaten jepara'
				/>
				<NewsCard
					newsType='Berita'
					newsTitle='Bimtek wujud kolaborasi pemda kabupaten jepara'
				/>
				<NewsCard
					newsType='Berita'
					newsTitle='Bimtek wujud kolaborasi pemda kabupaten jepara'
				/>
				<NewsCard
					newsType='Berita'
					newsTitle='Bimtek wujud kolaborasi pemda kabupaten jepara'
				/>
			</div>
			<Button
				asChild
				variant={'outline'}
				className='border-dark rounded-full hover:bg-greenBrand hover:border-greenBrand font-semibold hover:text-[#f9f9f9] transition-all duration-300 text-base h-14'
				size={'lg'}
			>
				<Link href={'/news'}>View all news</Link>
			</Button>
		</div>
	)
}

export default NewsSection
