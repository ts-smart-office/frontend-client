import Details from '@/components/reservation-details-page/Details'
import PriceSummary from '@/components/reservation-details-page/PriceSummary'
import UploadPayment from '@/components/reservation-details-page/UploadPayment'
import LinkHome from '@/components/room-page/LinkHome'
import { FC } from 'react'

const ReservationDetails: FC = () => {
	return (
		<main className='w-full font-urbanist'>
			<section className='px-4 lg:px-20 2xl:max-w-[1600px] 2xl:mx-auto flex flex-col justify-center pt-20 lg:pt-0'>
				<LinkHome />
				<h1 className='font-semibold text-5xl'>Reservation details</h1>
				<div className='flex flex-col-reverse xl:flex-row justify-between gap-8 xl:gap-32 mt-12 mb-28'>
					<div className='w-full xl:w-1/2 flex flex-col gap-11'>
						<PriceSummary />
						<UploadPayment />
					</div>
					<Details />
				</div>
			</section>
		</main>
	)
}

export default ReservationDetails
