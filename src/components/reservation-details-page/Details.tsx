import { IDetailsReservation } from '@/utils/types'
import {
	CalendarIcon,
	DocumentTextIcon,
	UserIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { FC } from 'react'

type TDetailsProps = {
	details: IDetailsReservation | null
}

const Details: FC<TDetailsProps> = ({ details }) => {
	if (!details) {
		return null
	}

	let roomImg
	if (details.room.name === 'Amphitheatre') {
		roomImg = '/amphitheater.jpg'
	} else if (details.room.name === 'Meeting Room') {
		roomImg = '/meeting-room.jpg'
	} else if (details.room.name === 'Podcast Studio') {
		roomImg = '/studio-podcast.jpg'
	} else {
		roomImg = '/banner-2.jpg'
	}

	return (
		<div className='w-full xl:w-1/2 bg-white rounded-lg'>
			<div className='flex flex-col'>
				<div className='relative w-full h-80'>
					<Image
						src={roomImg}
						alt={roomImg}
						fill
						className='absolute w-full h-full object-cover rounded-t-lg'
					/>
				</div>
				<div className='py-4 xl:py-8 px-2 xl:px-6 flex flex-col gap-8'>
					<h1 className='text-3xl font-semibold'>{details.room.name}</h1>
					<div className='flex flex-col gap-5'>
						<div className='w-full flex justify-between items-center'>
							<div className='flex items-center gap-3'>
								<CalendarIcon className='w-8 h-8 stroke-1' />
								<p className='text-base lg:text-xl'>Reservation date</p>
							</div>
							<p className='text-base lg:text-xl text-greyMuted'>
								{details.date}
							</p>
						</div>
						<div className='w-full flex justify-between items-center'>
							<div className='flex items-center gap-3'>
								<DocumentTextIcon className='w-8 h-8 stroke-1' />
								<p className='text-base lg:text-xl'>Reservation type</p>
							</div>
							<p className='capitalize text-base lg:text-xl text-greyMuted'>
								{details.type_name}
							</p>
						</div>
						{details.room.name === 'Podcast Studio' ? null : (
							<div className='w-full flex justify-between items-center'>
								<div className='flex items-center gap-3'>
									<UserIcon className='w-8 h-8 stroke-1' />
									<p className='text-base lg:text-xl'>Total persons</p>
								</div>
								<p className='text-base lg:text-xl text-greyMuted'>
									{details.total_persons} Persons
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Details
