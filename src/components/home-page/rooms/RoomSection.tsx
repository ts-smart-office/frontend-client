'use client'
import { FC, useEffect, useState } from 'react'
import RoomCard from './RoomCard'
import { apiRooms } from '@/api/roomApi'
import Spinner from '@/components/ui/spinner'

const RoomSection: FC = () => {
	const [rooms, setRooms] = useState<any[]>([])

	const fetchRooms = async () => {
		await apiRooms()
			.then(res => setRooms(res.data.data))
			.catch(error => {
				if (error.response) {
					console.log(error.response)
				}
			})
	}

	useEffect(() => {
		fetchRooms()
	}, [])

	return (
		<div className='w-full 2xl:max-w-[1600px] 2xl:mx-auto flex flex-col justify-center items-center font-urbanist gap-10 py-12 lg:py-32 lg:px-20'>
			<div className='flex flex-col justify-center items-center gap-4 max-md:px-4'>
				<h1 className='text-3xl sm:text-[40px] leading-tight font-semibold text-center'>
					Explore Our Rooms
				</h1>
				<p className='text-greyMuted text-lg max-w-[700px] text-center'>
					Elevating Your Meeting Experience with Tiga Serangkai
				</p>
			</div>
			{rooms.length <= 0 ? (
				<Spinner />
			) : (
				<div className='w-full grid grid-cols-12 gap-4 lg:gap-8 max-md:px-4'>
					{rooms.map((item, idx) => (
						<RoomCard
							key={idx}
							roomBanner={item.image_urls[0]}
							roomName={item.name}
							roomPrice={item.reservation_options}
							urlDetails={item.id}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default RoomSection
