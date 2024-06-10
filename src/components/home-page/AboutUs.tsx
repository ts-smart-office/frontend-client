import Image from 'next/image'
import { FC } from 'react'
import Tagging from '../layouts/Tagging'
import AboutVideo from './Video'

const AboutUs: FC = () => {
	return (
		<div className='w-full flex flex-col justify-center items-center font-urbanist pt-16 lg:pt-32 gap-10'>
			<div className='flex flex-col justify-center items-center gap-4'>
				<h1 className='text-3xl sm:text-[40px] leading-tight font-semibold text-center'>
					Building Futures <br /> Tiga Serangkai{' '}
					<span className='text-greenBrand'>SMART Office</span>
				</h1>
				<p className='text-greyMuted text-lg max-w-[700px] text-center'>
					Education is the path to building a civilization. Introducing Tiga
					Serangkai SMART Office, a milestone in Tiga Serangkai's journey
					towards staying relevant.
				</p>
			</div>
			<div className='w-full grid grid-cols-12 gap-4 lg:gap-8'>
				<div className='col-span-12 lg:col-span-5 flex flex-col gap-2'>
					<Tagging label='100+' text='Successfully Reservation' />
					<div className='relative w-full h-72 md:h-[460px] rounded-2xl'>
						<Image
							src='/banner-2.jpg'
							alt='banner-1'
							fill
							className='absolute w-full h-full object-cover rounded-2xl'
						/>
					</div>
				</div>
				<div className='col-span-12 lg:col-span-7 flex flex-col gap-2'>
					<Tagging label='5.00' text='Customer Satisfaction Rate' />
					{/* <div className='relative w-full h-72 md:h-[460px] rounded-2xl'>
						<Image
							src='/banner-2.jpg'
							alt='banner-1'
							fill
							className='absolute w-full h-full object-cover rounded-2xl'
						/>
					</div> */}
					<AboutVideo />
				</div>
			</div>
		</div>
	)
}

export default AboutUs
