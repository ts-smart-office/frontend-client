import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { FC } from 'react'

const PriceSummary: FC = () => {
	return (
		<div className='w-full flex flex-col gap-11'>
			<div className='flex flex-col gap-10'>
				<div className='flex flex-col'>
					<div className='flex justify-between'>
						<div className='flex flex-col'>
							<p className='text-xl font-semibold'>Reservation per person</p>
							<p className='text-greyMuted flex gap-2'>
								This price for a person
								<ExclamationCircleIcon className='w-6 h-6' />
							</p>
						</div>
						<p className='text-xl font-semibold'>Rp. 0</p>
					</div>
					<div className='flex justify-between mb-8'>
						<p className='text-xl font-semibold'>Reservation subtotal</p>
						<p className='text-xl font-semibold'>Rp. 0</p>
					</div>
					<div className='flex justify-between'>
						<div className='flex flex-col'>
							<p className='text-xl font-semibold'>Additional Food</p>
							<p className='text-greyMuted flex gap-2'>
								This price for a person
								<ExclamationCircleIcon className='w-6 h-6' />
							</p>
						</div>
						<p className='text-xl font-semibold'>Rp. 0</p>
					</div>
					<div className='flex justify-between'>
						<p className='text-xl font-semibold'>Additional food subtotal</p>
						<p className='text-xl font-semibold'>Rp. 0</p>
					</div>
				</div>
				<div className='flex justify-between'>
					<p className='text-3xl font-semibold'>Total payment</p>
					<p className='text-3xl font-semibold'>Rp. 0</p>
				</div>
			</div>
		</div>
	)
}

export default PriceSummary
