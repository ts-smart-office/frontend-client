'use client'
import { FC, useEffect, useState } from 'react'
import NewsCard from './NewsCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { apiPosts } from '@/api/postApi'

const NewsSection: FC = () => {
	const [posts, setPosts] = useState<any[]>([])

	const fetchPosts = async () => {
		await apiPosts()
			.then(res => setPosts(res.data.data))
			.catch(error => {
				if (error.response) {
					console.log(error.response)
				}
			})
	}

	useEffect(() => {
		fetchPosts()
	}, [])

	if (posts.length <= 0) {
		return
	}

	return (
		<div className='w-full flex flex-col justify-center items-center font-urbanist py-16 lg:py-32 gap-10'>
			<h1 className='text-3xl sm:text-[40px] leading-tight font-semibold text-center'>
				Latest News from Tiga Serangkai
			</h1>
			<div className='w-full grid grid-cols-12 gap-4 lg:gap-8'>
				{posts.map(post => (
					<NewsCard
						newsType={post.category}
						newsTitle={post.title}
						newsImage={post.image}
						newsId={post.id}
					/>
				))}
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
