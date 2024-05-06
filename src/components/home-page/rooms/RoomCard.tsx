import Tagging from '@/components/layouts/Tagging'
import { Button } from '@/components/ui/button'
import { MapPinIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

type TRoomCardProps = {
	roomName: string
	roomLocation: string
	roomPrice: number[]
	podcast?: boolean
	urlDetails: string
}

const RoomCard: FC<TRoomCardProps> = ({
	roomLocation,
	roomName,
	roomPrice,
	podcast,
	urlDetails,
}) => {
	return (
		<div className='col-span-12 xl:col-span-4 p-3 rounded-xl bg-white'>
			<div className='relative w-full h-60 rounded-md'>
				<div className='absolute w-fit z-10 right-2 top-2'>
					<Tagging label='5.0' text='Rating' />
				</div>
				<Image
					src='/banner-2.jpg'
					alt='banner-1'
					fill
					className='absolute w-full h-full object-cover rounded-lg'
				/>
			</div>
			<div className='flex flex-col gap-6 mt-4'>
				<div className='flex flex-col gap-2 px-3'>
					<h1 className='font-semibold text-4xl'>{roomName}</h1>
					<div className='flex gap-1 items-center text-greyMuted'>
						<MapPinIcon className='w-8 h-8' />
						{roomLocation}
					</div>
					<div className='flex gap-6'>
						<h2 className='text-3xl font-semibold text-greenBrand'>
							{roomPrice[0]}K
							<span className='text-xl text-greyMuted font-normal'>
								/{podcast ? 'recording' : 'halfday'}
							</span>
						</h2>
						<h2 className='text-3xl font-semibold text-greenBrand'>
							{roomPrice[1]}K
							<span className='text-xl text-greyMuted font-normal'>
								/{podcast ? 'streaming' : 'fullday'}
							</span>
						</h2>
					</div>
				</div>
				<Button
					asChild
					className='bg-greenBrand font-urbanist h-14 rounded-full w-fit text-base hover:bg-opacity-80 hover:bg-greenBrand self-end'
					size={'lg'}
				>
					<Link href={`${urlDetails}`}>Reserve room</Link>
				</Button>
			</div>
		</div>
	)
}

export default RoomCard
