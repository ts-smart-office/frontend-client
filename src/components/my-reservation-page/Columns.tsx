'use client'

import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
	id: string
	room: string
	reservationDate: string
	reservationType: string
	reservationTime: string
	totalPrice: number
	status: 'pending' | 'processing' | 'success' | 'failed'
}

export const columns: ColumnDef<Payment>[] = [
	{
		accessorKey: 'room',
		header: 'Room',
	},
	{
		accessorKey: 'reservationDate',
		header: 'Reservation date',
	},
	{
		accessorKey: 'reservationType',
		header: 'Reservation type',
	},
	{
		accessorKey: 'reservationTime',
		header: 'Reservation time',
	},
	{
		accessorKey: 'totalPrice',
		header: 'Total price',
	},
	{
		accessorKey: 'status',
		header: 'Status',
	},
	{
		header: 'Action',
		cell: ({ row }) => {
			return (
				<Link href='/reservation/1'>
					<EllipsisVerticalIcon className='w-6 h-6' />
				</Link>
			)
		},
	},
]
