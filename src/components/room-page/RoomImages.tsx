'use client'
import { IRoomDetails } from '@/utils/types'
import Image from 'next/image'
import { FC, useState } from 'react'

type TRoomImagesProps = {
	details: IRoomDetails
}

const RoomImages: FC<TRoomImagesProps> = ({ details }) => {
	const roomImages = details.image_urls

	const [displayImage, setDisplayImage] = useState<string>(roomImages[0])

	return (
		<div className='w-full flex flex-col gap-2 md:gap-6 mt-4'>
			<div className='relative w-full h-[240px] lg:h-[320px] xl:h-[540px]'>
				<Image
					src={displayImage}
					alt='banner-1'
					fill
					className='absolute w-full h-full object-cover rounded-lg'
				/>
			</div>
			<div className='grid grid-cols-5 gap-2 md:gap-6'>
				{roomImages.map(item => (
					<div
						key={item}
						onClick={() => setDisplayImage(item)}
						className='relative col-span-1 w-full h-16 lg:h-20 xl:h-32'
					>
						<Image
							src={item}
							alt={item}
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
