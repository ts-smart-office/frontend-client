import LinkHome from '@/components/room-page/LinkHome'
import { FC } from 'react'
import { Payment, columns } from '@/components/my-reservation-page/Columns'
import { DataTable } from '@/components/my-reservation-page/DataTable'

async function getData(): Promise<Payment[]> {
	return [
		{
			id: '728ed52f',
			room: 'Meeting Room',
			reservationDate: '12 january 2025',
			reservationTime: '08.00-16.00',
			reservationType: 'Fullday',
			totalPrice: 600000,
			status: 'pending',
		},
	]
}

const MyReservationPage: FC = async () => {
	const data = await getData()
	return (
		<main className='w-full font-urbanist'>
			<section className='px-4 lg:px-20 2xl:max-w-[1600px] 2xl:mx-auto flex flex-col justify-center'>
				<LinkHome />
				<h1 className='font-semibold text-5xl'>My reservation</h1>
				<div className='max-sm:hidden py-10'>
					<DataTable columns={columns} data={data} />
				</div>
				<div className='py-10'>Mobile View</div>
			</section>
		</main>
	)
}

export default MyReservationPage
