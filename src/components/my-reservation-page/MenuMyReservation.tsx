import { FC } from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog'
import Link from 'next/link'
import RatingUser from './RatingUser'

type TMenuMyReservationProps = {
	link: string
	status: string
}

const MenuMyReservation: FC<TMenuMyReservationProps> = ({ link, status }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='h-8 w-8 p-0'>
					<span className='sr-only'>Open menu</span>
					<EllipsisVerticalIcon className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuItem asChild>
					<Link href={`/myreservation/${link}`}>Details</Link>
				</DropdownMenuItem>
				{status === 'approved' && (
					<>
						<DropdownMenuSeparator />
						<Dialog>
							<DialogTrigger className='w-full'>
								<DropdownMenuItem onSelect={e => e.preventDefault()}>
									Review
								</DropdownMenuItem>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Review</DialogTitle>
									<DialogDescription>
										Share your experience for this reservation
									</DialogDescription>
								</DialogHeader>
								<RatingUser idReservation={link} />
							</DialogContent>
						</Dialog>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default MenuMyReservation
