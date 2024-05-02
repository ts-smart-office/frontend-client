import { FC } from 'react'
import { facilities } from '@/utils/constants'
import { Badge } from '../ui/badge'

const RoomDetails: FC = () => {
	return (
		<>
			<div className='flex flex-col gap-4 mt-10'>
				<h2 className='font-semibold text-4xl'>About</h2>
				<p className='text-base text-greyMuted'>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum non odit
					expedita quos recusandae laboriosam magni. Rerum doloribus laboriosam,
					nostrum obcaecati corrupti dolorem aliquid amet earum molestias,
					quidem asperiores maiores libero optio, ipsam veniam placeat quisquam
					sunt similique. Praesentium, in?
				</p>
			</div>
			<div className='flex flex-col gap-4 mt-10'>
				<h2 className='font-semibold text-4xl'>Facilities</h2>
				<div className='flex flex-wrap gap-4'>
					{facilities.map((item, idx) => (
						<Badge
							key={idx}
							className='text-lg px-6 py-2 bg-greenBrand text-white hover:bg-greenBrand'
						>
							{item}
						</Badge>
					))}
				</div>
			</div>
		</>
	)
}

export default RoomDetails
