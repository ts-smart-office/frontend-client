'use client'
import Image from 'next/image'
import { FC, useState } from 'react'

const RoomImages: FC = () => {
	const roomImages = [
		{
			name: 'image-1',
			imagePath: '/banner-1.jpg',
		},
		{
			name: 'image-2',
			imagePath: '/banner-2.jpg',
		},
		{
			name: 'image-3',
			imagePath: '/banner-3.jpg',
		},
		{
			name: 'image-4',
			imagePath: '/banner-1.jpg',
		},
	]

	const [displayImage, setDisplayImage] = useState<string>(
		roomImages[0].imagePath
	)

	return (
		<div className='w-full flex flex-col gap-6 mt-4'>
			<div className='relative w-full h-[240px] lg:h-[320px] xl:h-[540px]'>
				<Image
					src={displayImage}
					alt='banner-1'
					fill
					className='absolute w-full h-full object-cover rounded-lg'
				/>
			</div>
			<div className='flex gap-6'>
				{roomImages.map(item => (
					<div
						key={item.name}
						onClick={() => setDisplayImage(item.imagePath)}
						className='relative w-full h-16 lg:h-20 xl:h-32'
					>
						<Image
							src={item.imagePath}
							alt={item.name}
							fill
							className='absolute w-full h-full object-cover rounded-lg'
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default RoomImages
