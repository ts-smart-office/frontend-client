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
import { apiReservations } from '@/api/reservationApi'

const DataTable: FC = () => {
	const [reservation, setReservation] = useState<any[]>([])
	const getReservations = async () => {
		await apiReservations()
			.then(res => {
				setReservation(res.data.data)
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

	return (
		<Table className='bg-white rounded-xl'>
			<TableHeader>
				<TableRow>
					<TableHead>Room Name</TableHead>
					<TableHead>Reservation Date</TableHead>
					<TableHead className='hidden md:table-cell'>
						Reservation Type
					</TableHead>
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
				<TableRow>
					<TableCell className='font-medium'>Meeting Room</TableCell>
					<TableCell>22 June 2024</TableCell>
					<TableCell className='hidden md:table-cell'>Full Day</TableCell>
					<TableCell className='hidden md:table-cell'>08.00 - 16.00</TableCell>
					<TableCell className='hidden md:table-cell'>Rp. 600000</TableCell>
					<TableCell>
						<Badge variant='outline'>Waiting for payment</Badge>
					</TableCell>
					<TableCell>
						<EllipsisVerticalIcon className='w-4 h-4' />
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	)
}

export default DataTable
