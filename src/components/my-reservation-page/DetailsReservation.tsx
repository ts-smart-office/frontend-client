'use client'
import { FC, useEffect, useState } from 'react'
import Details from '@/components/reservation-details-page/Details'
import PriceSummary from '@/components/reservation-details-page/PriceSummary'
import UploadPayment from '@/components/reservation-details-page/UploadPayment'
import { apiDetailsReservation } from '@/api/reservationApi'
import { useParams } from 'next/navigation'
import { IDetailsReservation, UserSession } from '@/utils/types'
import Link from 'next/link'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'

type TDetailsReservationProps = {
	user: UserSession
}

const DetailsReservation: FC<TDetailsReservationProps> = ({ user }) => {
	const [details, setDetails] = useState<IDetailsReservation | null>(null)
	const { id } = useParams()
	const getDetails = async () => {
		await apiDetailsReservation(id.toString())
			.then(res => {
				setDetails(res.data.data)
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response)
				}
			})
	}

	useEffect(() => {
		getDetails()
	}, [])

	return (
		<section className='px-4 lg:px-20 2xl:max-w-[1600px] 2xl:mx-auto flex flex-col justify-center pt-20 lg:pt-0'>
			<Link
				href={'/myreservation'}
				className='flex items-center gap-2 font-urbanist text-darkColor font-semibold py-5'
			>
				<ArrowLeftCircleIcon className='w-8 h-8 stroke-1' />
				Back to my reservation
			</Link>
			<h1 className='font-semibold text-5xl'>Reservation details</h1>
			{!details ? (
				<div className='flex mt-12 mb-28'>Loading...</div>
			) : (
				<div className='flex flex-col-reverse xl:flex-row justify-between gap-8 xl:gap-32 mt-12 mb-28'>
					<div className='w-full xl:w-1/2 flex flex-col gap-11'>
						<PriceSummary user={user} details={details} />
						{user.role.name.includes('External') ? (
							<UploadPayment
								urlImage={details.proof_of_payment_url}
								expiredTime={details.expires_at}
								statusReservation={details.status}
							/>
						) : null}
					</div>
					<Details details={details} />
				</div>
			)}
		</section>
	)
}

export default DetailsReservation
