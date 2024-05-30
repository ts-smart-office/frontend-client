import { rupiahCurrency } from '@/lib/utils'
import { IDetailsReservation } from '@/utils/types'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { FC } from 'react'

type TPriceSummaryProps = {
	details: IDetailsReservation | null
}

const PriceSummary: FC<TPriceSummaryProps> = ({ details }) => {
	if (!details) {
		return null
	}

	const lunchFoods = details.foods.find(food => food.category === 'lunch')
	const snackFoods = details.foods.find(food => food.category === 'snack')
	const lunchPrice = lunchFoods ? rupiahCurrency.format(lunchFoods.price) : '0'
	const snackPrice = snackFoods ? rupiahCurrency.format(snackFoods.price) : '0'
	const reservationPrice = rupiahCurrency.format(details.room_price)

	const reservationTotal = rupiahCurrency.format(
		details.room_price * details.total_persons
	)
	const foodTotal = rupiahCurrency.format(
		(lunchFoods ? lunchFoods.price * details.total_persons : 0) +
			(snackFoods ? snackFoods.price * details.total_persons : 0)
	)
	const totalPayment = rupiahCurrency.format(
		details.room_price * details.total_persons +
			(lunchFoods ? lunchFoods.price * details.total_persons : 0) +
			(snackFoods ? snackFoods.price * details.total_persons : 0)
	)

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
						<p className='text-xl font-semibold'>{reservationPrice}</p>
					</div>
					<div className='flex justify-between mb-8'>
						<p className='text-xl font-semibold'>Reservation subtotal</p>
						<p className='text-xl font-semibold'>{reservationTotal}</p>
					</div>
					<div className='flex justify-between'>
						<div className='flex flex-col'>
							<p className='text-xl font-semibold'>Additional Food Lunch</p>
							<p className='text-greyMuted flex gap-2'>
								This price for a person
								<ExclamationCircleIcon className='w-6 h-6' />
							</p>
						</div>
						<p className='text-xl font-semibold'>{lunchPrice}</p>
					</div>
					<div className='flex justify-between'>
						<div className='flex flex-col'>
							<p className='text-xl font-semibold'>Additional Food Snack</p>
							<p className='text-greyMuted flex gap-2'>
								This price for a person
								<ExclamationCircleIcon className='w-6 h-6' />
							</p>
						</div>
						<p className='text-xl font-semibold'>{snackPrice}</p>
					</div>
					<div className='flex justify-between'>
						<p className='text-xl font-semibold'>Additional food subtotal</p>
						<p className='text-xl font-semibold'>{foodTotal}</p>
					</div>
				</div>
				<div className='flex justify-between'>
					<p className='text-3xl font-semibold'>Total payment</p>
					<p className='text-3xl font-semibold'>{totalPayment}</p>
				</div>
			</div>
		</div>
	)
}

export default PriceSummary
