import { FC } from 'react'
import { Badge } from '../ui/badge'

type TRoomDetails = {
	details: any
}

const RoomDetails: FC<TRoomDetails> = ({ details }) => {
	if (!details) {
		return null
	}

	return (
		<>
			<div className='flex flex-col gap-4 mt-10'>
				<h2 className='font-semibold text-4xl'>About</h2>
				<p className='text-base text-greyMuted'>{details.description}</p>
			</div>
			<div className='flex flex-col gap-4 mt-10'>
				<h2 className='font-semibold text-4xl'>Facilities</h2>
				<div className='flex flex-wrap gap-2 sm:gap-4'>
					{details.facilities.map((item: any, idx: number) => (
						<Badge
							key={idx}
							className='text-base md:text-lg px-4 md:px-6 py-2 bg-greenBrand text-white hover:bg-greenBrand'
						>
							{item.name}
						</Badge>
					))}
				</div>
			</div>
		</>
	)
}

export default RoomDetails
