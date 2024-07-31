import Tagging from '@/components/layouts/Tagging'
import { Button } from '@/components/ui/button'
import { rupiahCurrency } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

type TRoomCardProps = {
	roomName: string
	roomPrice: any[]
	urlDetails: string
	roomBanner: string
}

const RoomCard: FC<TRoomCardProps> = ({
	roomName,
	roomPrice,
	roomBanner,
	urlDetails,
}) => {
	const halfdayOption = roomPrice.find(option =>
		option.reservation_type.name.includes('Halfday')
	)
	const nonHalfdayOption = roomPrice.find(
		option =>
			!option.reservation_type.name.includes('Halfday') &&
			!option.reservation_type.name.includes('Podcast')
	)

	const podcastOption = roomPrice.filter(option =>
		option.reservation_type.name.includes('Podcast')
	)

	return (
		<div className='col-span-12 xl:col-span-4 p-3 rounded-xl bg-white'>
			<div className='relative w-full h-60 rounded-md'>
				<div className='absolute w-fit z-10 right-2 top-2'>
					<Tagging label='5.0' text='Rating' />
				</div>
				<Image
					src={roomBanner}
					alt={roomName}
					fill
					className='absolute w-full h-full object-cover rounded-lg'
				/>
			</div>
			<div className='flex flex-col gap-6 mt-4'>
				<div className='flex flex-col gap-2 px-3'>
					<h1 className='font-semibold text-3xl md:text-4xl'>{roomName}</h1>
					<div className='flex flex-col md:flex-row md:gap-6'>
						{halfdayOption && (
							<h2 className='text-xl md:text-2xl font-semibold text-greenBrand'>
								{rupiahCurrency.format(halfdayOption.price)}
								<span className='text-xl text-greyMuted font-normal'>
									/Halfday
								</span>
							</h2>
						)}
						{nonHalfdayOption && (
							<h2 className='text-xl md:text-2xl font-semibold text-greenBrand'>
								{rupiahCurrency.format(nonHalfdayOption.price)}
								<span className='text-xl text-greyMuted font-normal'>
									/{nonHalfdayOption.reservation_type.name}
								</span>
							</h2>
						)}
						{podcastOption &&
							podcastOption.map(item => (
								<h2
									key={item.id}
									className='text-xl md:text-2xl font-semibold text-greenBrand'
								>
									{rupiahCurrency.format(item.price)}
									<span className='text-lg text-greyMuted font-normal'>
										/
										{item.reservation_type.name === 'Podcast Streaming'
											? 'Stream'
											: 'Record'}
									</span>
								</h2>
							))}
					</div>
				</div>
				<Button
					asChild
					className='bg-greenBrand font-urbanist h-14 rounded-full w-fit text-base hover:bg-opacity-80 hover:bg-greenBrand self-end'
					size={'lg'}
				>
					<Link href={`room/${urlDetails}`}>Reserve room</Link>
				</Button>
			</div>
		</div>
	)
}

export default RoomCard
