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
				<div className='flex flex-wrap gap-2 sm:gap-4'>
					{facilities.map((item, idx) => (
						<Badge
							key={idx}
							className='text-base md:text-lg px-4 md:px-6 py-2 bg-greenBrand text-white hover:bg-greenBrand'
						>
							{item}
						</Badge>
					))}
				</div>
			</div>
			<div className='py-8 xl:py-20 w-full'>
				<iframe
					className='w-full h-48 sm:h-64 xl:h-96 rounded-lg'
					src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.1930621052168!2d110.81414025471942!3d-7.5652760841120985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a1686c712bb69%3A0xac348d6259e9df4!2sPT.%20Tiga%20Serangkai%20Pustaka%20Mandiri!5e0!3m2!1sen!2sid!4v1714980730759!5m2!1sen!2sid'
					loading='lazy'
				></iframe>
			</div>
		</>
	)
}

export default RoomDetails
