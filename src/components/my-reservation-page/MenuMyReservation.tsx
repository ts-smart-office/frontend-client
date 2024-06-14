import { FC } from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

type TMenuMyReservationProps = {
	link: string
}

const MenuMyReservation: FC<TMenuMyReservationProps> = ({ link }) => {
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
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default MenuMyReservation
