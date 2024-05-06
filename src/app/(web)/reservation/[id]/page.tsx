import Details from '@/components/reservation-details-page/Details'
import PriceSummary from '@/components/reservation-details-page/PriceSummary'
import LinkHome from '@/components/room-page/LinkHome'
import { FC } from 'react'

const ReservationDetails: FC = () => {
	return (
		<main className='w-full font-urbanist'>
			<section className='px-4 lg:px-20 2xl:max-w-[1600px] 2xl:mx-auto flex flex-col justify-center'>
				<LinkHome />
				<h1 className='font-semibold text-5xl'>Reservation details</h1>
				<div className='flex justify-between gap-32 mt-12 mb-28'>
					<PriceSummary />
					<Details />
				</div>
			</section>
		</main>
	)
}

export default ReservationDetails
