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
			<TableHeader>
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
			<TableBody>
				{reservation.map(item => (
					<TableRow>
						<TableCell className='font-medium'>{item.room.name}</TableCell>
						<TableCell className='hidden md:table-cell'>{item.type}</TableCell>
						<TableCell>{item.date}</TableCell>
						<TableCell className='hidden md:table-cell'>
							{item.type === 'fullday' ? '08.00 - 16.00' : '08.00 - 12.00'}
						</TableCell>
						<TableCell className='hidden md:table-cell'>
							{item.total_price}
						</TableCell>
						<TableCell>
							{item.status === 'completed' ? (
								<Badge variant='default' className='bg-greenBrand'>
									{item.status}
								</Badge>
							) : (
								<Badge variant='outline'>{item.status}</Badge>
							)}
						</TableCell>
						<TableCell>
							<EllipsisVerticalIcon className='w-4 h-4' />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}

export default DataTable
