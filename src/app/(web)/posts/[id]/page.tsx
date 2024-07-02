'use client'
import { apiDetailPost } from '@/api/postApi'
import LinkHome from '@/components/room-page/LinkHome'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const page = ({ params }: { params: { id: string } }) => {
	const [detailPost, setDetailPost] = useState<any | null>(null)

	const fetchDetailPost = async () => {
		await apiDetailPost(params.id)
			.then(res => setDetailPost(res.data.data))
			.catch(error => {
				if (error.response) {
					console.log(error.response)
				}
			})
	}

	useEffect(() => {
		fetchDetailPost()
	}, [])

	return (
		<main className='w-full font-urbanist'>
			<section className='px-4 lg:px-20 2xl:max-w-[1440px] 2xl:mx-auto flex flex-col justify-center'>
				<LinkHome />
				<h1 className='font-semibold text-5xl'>{detailPost?.title}</h1>
				<div className='relative h-32 md:h-[460px] rounded-lg md:mt-9'>
					<Image
						src={detailPost?.image}
						alt='banner-1'
						fill
						className='absolute w-full h-full object-cover rounded-lg'
					/>
				</div>
				<div
					className='ProseMirror whitespace-pre-line mt-10'
					style={{ whiteSpace: 'pre-line' }}
					dangerouslySetInnerHTML={{ __html: detailPost?.description }}
				/>
			</section>
		</main>
	)
}

export default page
