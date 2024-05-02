import Tagging from '@/components/layouts/Tagging'
import LinkHome from '@/components/room-page/LinkHome'
import RoomDetails from '@/components/room-page/RoomDetails'
import RoomImages from '@/components/room-page/RoomImages'
import RoomName from '@/components/room-page/RoomName'
import { FC } from 'react'

const RoomPage: FC = () => {
	return (
		<main className='w-full font-urbanist'>
			<section className='px-4 lg:px-20 2xl:max-w-[1600px] 2xl:mx-auto flex flex-col justify-center'>
				<LinkHome />
				<RoomName />
				<div className='w-full grid grid-cols-12 gap-8 pt-12'>
					<div className='col-span-8'>
						<Tagging label='New' text='Modern building' />
						<RoomImages />
						<RoomDetails />
					</div>
					<div className='col-span-4'>Form</div>
				</div>
			</section>
		</main>
	)
}

export default RoomPage
