'use client'
import { FC, useEffect, useState } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../ui/table'
import { Badge } from '../ui/badge'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { apiReservationsUser } from '@/api/reservationApi'
import { IReservationsByUser } from '@/utils/types'
import Spinner from '../ui/spinner'
import { rupiahCurrency } from '@/lib/utils'
import MenuMyReservation from './MenuMyReservation'

type TDataTableProps = {
	userId: string
}

const DataTable: FC<TDataTableProps> = ({ userId }) => {
	const [reservation, setReservation] = useState<IReservationsByUser[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const getReservations = async () => {
		await apiReservationsUser(userId)
			.then(res => {
				setReservation(res.data.data)
				setIsLoading(false)
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response)
				}
			})
	}

	useEffect(() => {
		getReservations()
	}, [])

	console.log(reservation)

	if (isLoading) {
		return (
			<main className='w-full font-urbanist'>
				<section className='h-full px-4 lg:px-20 2xl:max-w-[1600px] 2xl:mx-auto flex flex-col justify-center items-center'>
					<Spinner />
				</section>
			</main>
		)
	}

	if (reservation.length <= 0) {
		return (
			<main className='w-full font-urbanist h-[50vh]'>
				<section className='h-full px-4 lg:px-0 2xl:max-w-[1600px] 2xl:mx-auto flex flex-col'>
					Reservation empty
				</section>
			</main>
		)
	}

	return (
		<Table className='bg-white rounded-xl'>
			<TableHeader className='text-base'>
				<TableRow>
					<TableHead>Room Name</TableHead>
					<TableHead className='hidden md:table-cell'>
						Reservation Type
					</TableHead>
					<TableHead>Reservation Date</TableHead>
					<TableHead className='hidden md:table-cell'>
						Reservation Time
					</TableHead>
					<TableHead className='hidden md:table-cell'>Total Price</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>
						<span className='sr-only'>Actions</span>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className='text-base'>
				{reservation.map(item => (
					<TableRow>
						<TableCell className='font-medium'>{item.room.name}</TableCell>
						<TableCell className='hidden md:table-cell'>
							{item.type_name}
						</TableCell>
						<TableCell>{item.date}</TableCell>
						<TableCell className='hidden md:table-cell'>
							{item.start_time} - {item.end_time}
						</TableCell>
						<TableCell className='hidden md:table-cell'>
							{rupiahCurrency.format(item.total_price)}
						</TableCell>
						<TableCell>
							{item.status === 'completed' || item.status === 'approved' ? (
								<Badge
									variant='default'
									className='bg-greenBrand hover:bg-greenBrand'
								>
									{item.status}
								</Badge>
							) : (
								<Badge variant='outline'>{item.status}</Badge>
							)}
						</TableCell>
						<TableCell>
							<MenuMyReservation link={item.id} status={item.status} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}

export default DataTable
