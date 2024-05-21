'use client'
import { FC } from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { apiLogout } from '@/api/authApi'
import { deleteUser } from '@/lib/actions'
import { useToast } from '@/components/ui/use-toast'

type TDropdownUserProps = {
	userSession: string
}

const DropdownUser: FC<TDropdownUserProps> = ({ userSession }) => {
	const { toast } = useToast()
	const userLogout = async () => {
		const res = await apiLogout()
		if (res) {
			toast({
				description: 'Logout success',
			})
		}
		await deleteUser()
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='outline'
					size='icon'
					className='overflow-hidden rounded-full w-fit px-4'
				>
					{userSession}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Link href='/myreservation'>My reservations</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<Button variant='ghost' className='w-full' onClick={userLogout} asChild>
					<DropdownMenuItem>Logout</DropdownMenuItem>
				</Button>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default DropdownUser
