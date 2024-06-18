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
import { apiReservationsUser } from '@/api/reservationApi'
import { IReservationsByUser } from '@/utils/types'
import Spinner from '../ui/spinner'
import { rupiahCurrency } from '@/lib/utils'
import MenuMyReservation from './MenuMyReservation'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog'
import RatingUser from './RatingUser'
import { Rating } from 'react-simple-star-rating'
import { BookmarkSlashIcon } from '@heroicons/react/24/outline'
import { Button } from '../ui/button'
import Link from 'next/link'

type TDataTableProps = {
	userId: string
}

const DataTable: FC<TDataTableProps> = ({ userId }) => {
	const [reservation, setReservation] = useState<IReservationsByUser[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [ratingValue, setRatingValue] = useState(0)

	const handleRating = (rate: number) => {
		setRatingValue(rate)
	}

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
			<main className='w-full font-urbanist h-[40vh]'>
				<section className='h-full px-4 lg:px-0 2xl:max-w-[1600px] 2xl:mx-auto flex flex-col'>
					<div className='mt-10 w-full flex flex-col justify-center items-center'>
						<BookmarkSlashIcon className='w-12 h-12 text-greyMuted' />
						<h1 className='text-lg font-semibold'>No reservation history</h1>
						<p>Get started by creating a new reservation.</p>
						<Button
							className='mt-6 bg-greenBrand font-urbanist h-14 rounded-full w-fit text-base hover:bg-opacity-80 hover:bg-greenBrand'
							size={'lg'}
							asChild
						>
							<Link href='/#rooms'>Reserve room now</Link>
						</Button>
					</div>
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
					<TableHead>Review</TableHead>
					<TableHead>
						<span className='sr-only'>Actions</span>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className='text-base'>
				{reservation.map(item => (
					<TableRow key={item.id}>
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
							<Dialog>
								<DialogTrigger
									disabled={
										item.review !== null || item.status === 'canceledByUser'
									}
								>
									<Rating
										SVGclassName={'inline-block'}
										size={20}
										transition
										onClick={handleRating}
										allowHover={false}
										initialValue={item.review?.rating}
									/>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Review</DialogTitle>
										<DialogDescription>
											Share your experience using our reservation
										</DialogDescription>
									</DialogHeader>
									<RatingUser
										idReservation={item.id}
										currentRating={ratingValue}
									/>
								</DialogContent>
							</Dialog>
						</TableCell>
						<TableCell>
							<MenuMyReservation link={item.id} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}

export default DataTable
