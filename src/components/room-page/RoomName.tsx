import { MapPinIcon } from '@heroicons/react/24/outline'
import { FC } from 'react'

const RoomName: FC = () => {
	return (
		<div className='flex flex-col gap-2 pt-10'>
			<h1 className='font-semibold text-5xl'>Room Name</h1>
			<p className='text-greyMuted flex items-center gap-2 text-xl'>
				<MapPinIcon className='w-8 h-8' />
				Room Location
			</p>
		</div>
	)
}

export default RoomName
