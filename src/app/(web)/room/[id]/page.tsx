import Tagging from '@/components/layouts/Tagging'
import FormReservation from '@/components/room-page/FormReservation'
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
				<div className='w-full grid grid-cols-4 sm:grid-cols-12 gap-8 pt-12'>
					<div className='col-span-4 sm:col-span-7 xl:col-span-8'>
						<Tagging label='New' text='Modern building' />
						<RoomImages />
						<RoomDetails />
					</div>
					<div className='col-span-4 sm:col-span-5 xl:col-span-4'>
						<div className='w-full p-6 rounded-xl bg-white'>
							<div className='flex flex-col gap-8'>
								<h1 className='text-xl lg:text-2xl xl:text-3xl font-semibold'>
									Reservation Information
								</h1>
								<FormReservation />
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}

export default RoomPage
