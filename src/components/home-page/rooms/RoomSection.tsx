import { FC } from 'react'
import RoomCard from './RoomCard'
import { listRooms } from '@/utils/constants'

const RoomSection: FC = () => {
	return (
		<div className='w-full 2xl:max-w-[1600px] 2xl:mx-auto flex flex-col justify-center items-center font-urbanist gap-10 py-12 lg:py-32 lg:px-20'>
			<div className='flex flex-col justify-center items-center gap-4 max-md:px-4'>
				<h1 className='text-3xl sm:text-[40px] leading-tight font-semibold text-center'>
					Explore Our Smart Rooms
				</h1>
				<p className='text-greyMuted text-lg max-w-[700px] text-center'>
					Smart Spaces Unveiled: Elevating Your Meeting Experience with Tiga
					Serangkai
				</p>
			</div>
			<div className='w-full grid grid-cols-12 gap-4 lg:gap-8 max-md:px-4'>
				{listRooms.map((item, idx) => (
					<RoomCard
						key={idx}
						roomName={item.name}
						roomLocation={item.location}
						roomPrice={item.price}
						podcast={item.isPodcast}
						urlDetails={item.urlDetails}
					/>
				))}
			</div>
		</div>
	)
}

export default RoomSection
