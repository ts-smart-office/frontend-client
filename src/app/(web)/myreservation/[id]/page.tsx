import DetailsReservation from '@/components/my-reservation-page/DetailsReservation'
import { getUser } from '@/lib/actions'
import { redirect } from 'next/navigation'

const ReservationDetails = async () => {
	const userSession = await getUser()
	if (!userSession) {
		return redirect('/signin')
	}

	return (
		<main className='w-full font-urbanist'>
			<DetailsReservation />
		</main>
	)
}

export default ReservationDetails
