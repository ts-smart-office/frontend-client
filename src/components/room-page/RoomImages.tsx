import Image from 'next/image'
import { FC } from 'react'

const RoomImages: FC = () => {
	return (
		<div className='w-full flex flex-col gap-6 mt-4'>
			<div className='relative w-full h-[240px] lg:h-[320px] xl:h-[540px]'>
				<Image
					src='/banner-2.jpg'
					alt='banner-1'
					fill
					className='absolute w-full h-full object-cover rounded-lg'
				/>
			</div>
			<div className='flex gap-6'>
				<div className='relative w-full h-16 lg:h-20 xl:h-32'>
					<Image
						src='/banner-2.jpg'
						alt='banner-1'
						fill
						className='absolute w-full h-full object-cover rounded-lg'
					/>
				</div>
				<div className='relative w-full h-16 lg:h-20 xl:h-32'>
					<Image
						src='/banner-2.jpg'
						alt='banner-1'
						fill
						className='absolute w-full h-full object-cover rounded-xl'
					/>
				</div>
				<div className='relative w-full h-16 lg:h-20 xl:h-32'>
					<Image
						src='/banner-2.jpg'
						alt='banner-1'
						fill
						className='absolute w-full h-full object-cover rounded-xl'
					/>
				</div>
				<div className='relative w-full h-16 lg:h-20 xl:h-32'>
					<Image
						src='/banner-2.jpg'
						alt='banner-1'
						fill
						className='absolute w-full h-full object-cover rounded-lg'
					/>
				</div>
			</div>
		</div>
	)
}

export default RoomImages
