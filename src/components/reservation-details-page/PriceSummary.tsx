import { rupiahCurrency } from '@/lib/utils'
import { IDetailsReservation, UserSession } from '@/utils/types'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { FC } from 'react'
import CountdownTimer from './CountdownUpload'

type TPriceSummaryProps = {
	details: IDetailsReservation | null
	user: UserSession
}

const PriceSummary: FC<TPriceSummaryProps> = ({ details, user }) => {
	if (!details) {
		return null
	}

	const lunchFoods = details.foods.find(food => food.category === 'lunch')
	const snackFoods = details.foods.find(food => food.category === 'snack')
	const lunchPrice = lunchFoods ? rupiahCurrency.format(lunchFoods.price) : '0'
	const snackPrice = snackFoods ? rupiahCurrency.format(snackFoods.price) : '0'
	const reservationPrice = rupiahCurrency.format(details.price)

	const reservationTotal = rupiahCurrency.format(
		details.price * details.total_persons
	)
	const reservationTotalPodcast = rupiahCurrency.format(
		Number(details.total_price)
	)
	const foodTotal = rupiahCurrency.format(
		(lunchFoods ? lunchFoods.price * details.total_persons : 0) +
			(snackFoods ? snackFoods.price * details.total_persons : 0)
	)

	return (
		<div className='w-full flex flex-col gap-11'>
			<div className='flex flex-col gap-10'>
				<div className='flex flex-col'>
					<div className='flex justify-between'>
						<div className='flex flex-col'>
							<p className='text-xl font-semibold'>
								{!details.room.name.includes('Podcast')
									? 'Reservation per person'
									: 'Reservation per hours'}
							</p>
							<p className='text-greyMuted flex gap-2'>
								This price for{' '}
								{!details.room.name.includes('Podcast')
									? 'a person'
									: 'an hour'}
								<ExclamationCircleIcon className='w-6 h-6' />
							</p>
						</div>
						<p className='text-xl font-semibold'>{reservationPrice}</p>
					</div>
					{!details.room.name.includes('Podcast') && (
						<div className='flex justify-between mb-8'>
							<p className='text-xl font-semibold'>Reservation subtotal</p>
							<p className='text-xl font-semibold'>{reservationTotal}</p>
						</div>
					)}
					{!details.room.name.includes('Podcast') && (
						<>
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
								<p className='text-xl font-semibold'>
									Additional food subtotal
								</p>
								<p className='text-xl font-semibold'>{foodTotal}</p>
							</div>
						</>
					)}
				</div>
				<div className='flex flex-col gap-4'>
					{user.role.name.includes('Internal') && (
						<div className='flex flex-col gap-2'>
							<div className='flex justify-between'>
								<p className='text-xl font-semibold'>
									Room discount internal member
								</p>
								<p className='text-xl font-semibold text-rose-500'>
									100%({rupiahCurrency.format(details.room_discount)})
								</p>
							</div>
							<div className='flex justify-between'>
								<p className='text-xl font-semibold'>
									Food discount internal member
								</p>
								<p className='text-xl font-semibold text-rose-500'>
									100%({rupiahCurrency.format(details.food_discount)})
								</p>
							</div>
						</div>
					)}
					<div className='flex justify-between'>
						<p className='text-3xl font-semibold'>Total payment</p>
						{!details.room.name.includes('Podcast') ? (
							<p className='text-3xl font-semibold'>
								{rupiahCurrency.format(details.total_price)}
							</p>
						) : (
							<p className='text-3xl font-semibold'>
								{reservationTotalPodcast}
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default PriceSummary
