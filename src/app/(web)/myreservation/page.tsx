import DataTable from '@/components/my-reservation-page/DataTable'
import LinkHome from '@/components/room-page/LinkHome'
import { getUser } from '@/lib/actions'
import { redirect } from 'next/navigation'

const MyReservationPage = async () => {
	const userSession = await getUser()
	if (!userSession) {
		return redirect('/signin')
	}

	return (
		<main className='w-full font-urbanist'>
			<section className='px-4 lg:px-20 2xl:max-w-[1600px] 2xl:mx-auto flex flex-col justify-center'>
				<LinkHome />
				<h1 className='font-semibold text-5xl'>My reservation</h1>
				<div className='py-10'>
					<DataTable />
				</div>
			</section>
		</main>
	)
}

export default MyReservationPage
