'use client'
import Image from 'next/image'
import { FC, useState } from 'react'
import AboutVideo from './Video'

const AboutUs: FC = () => {
	const galleries = [
		{ id: 1, image: '/library.jpg' },
		{ id: 2, image: '/cafe.jpg' },
		{ id: 3, image: '/library-02.jpg' },
		{ id: 4, image: '/gym.jpg' },
	]

	const [displayImage, setDisplayImage] = useState<string>(galleries[0].image)

	return (
		<div className='w-full flex flex-col justify-center items-center font-urbanist pt-16 lg:pt-32 gap-10'>
			<div className='flex flex-col justify-center items-center gap-4'>
				<h1 className='text-3xl sm:text-[40px] leading-tight font-semibold text-center'>
					Building Futures <br /> Tiga Serangkai{' '}
					<span className='text-greenBrand'>SMART Office</span>
				</h1>
				<p className='text-greyMuted text-lg max-w-[700px] text-center'>
					Education is the path to building a civilization. Introducing Tiga
					Serangkai SMART Office, a milestone in Tiga Serangkai journey towards
					staying relevant.
				</p>
			</div>
			<div className='w-full grid grid-cols-12 gap-4 lg:gap-8'>
				<div className='col-span-12 lg:col-span-7 flex flex-col gap-2'>
					<div className='w-fit flex items-center justify-center gap-2 font-urbanist text-base font-medium p-2 border border-greyMuted rounded-full'>
						<div className='bg-greenBrand py-1 px-3 text-white rounded-full'>
							Profile
						</div>
						<div className='text-greyMuted'>Smart Office</div>
					</div>
					<AboutVideo />
				</div>
				<div className='col-span-12 lg:col-span-5 flex flex-col gap-2'>
					<div className='w-fit flex items-center justify-center gap-2 font-urbanist text-base font-medium p-2 border border-greyMuted rounded-full'>
						<div className='bg-greenBrand py-1 px-3 text-white rounded-full'>
							Gallery
						</div>
						<div className='text-greyMuted'>Smart Office</div>
					</div>
					<div className='w-full flex flex-col gap-2 md:gap-4'>
						<div className='relative w-full h-72 md:h-[380px] rounded-2xl'>
							<Image
								src={displayImage}
								alt='banner-1'
								fill
								className='absolute w-full h-full object-cover rounded-2xl'
							/>
						</div>
						<div className='flex-1 grid grid-cols-4 gap-2 md:gap-4'>
							{galleries.map(item => (
								<div
									key={item.id}
									onClick={() => setDisplayImage(item.image)}
									className='relative col-span-1 w-full h-[64px]'
								>
									<Image
										src={item.image}
										alt={item.image}
										fill
										className='absolute w-full h-full object-cover rounded-lg'
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AboutUs
