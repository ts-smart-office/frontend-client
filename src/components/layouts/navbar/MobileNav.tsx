'use client'

import Link from 'next/link'
import { FC, useState } from 'react'
import { MenuIcon, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { navMenu } from '@/utils/constants'
import { useToast } from '@/components/ui/use-toast'
import { apiLogout } from '@/api/authApi'
import { deleteUser } from '@/lib/actions'

type TMobileNav = {
	userSession: any
}

const MobileNav: FC<TMobileNav> = ({ userSession }) => {
	const [menu, setMenu] = useState(false)
	const toggleMenu = () => {
		setMenu(!menu)
	}

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
		<div
			className={`block lg:hidden shadow-sm fixed top-0 w-full z-[999] bg-white py-4 animate-in fade-in zoom-in ${
				menu ? 'bg-primary py-2' : ''
			} `}
		>
			<div className='flex justify-between mx-[10px]'>
				<div className='flex gap-[50px] text-[16px] items-center select-none'>
					<Link
						href={'/'}
						className='text-dark font-semibold text-[20px] md:text-2xl leading-[120%] tracking-normal'
					>
						SmartOffice.
					</Link>
				</div>
				<div className='flex items-center gap-[40px]'>
					{menu ? (
						<X
							className='text-black cursor-pointer animate-in fade-in zoom-in'
							onClick={toggleMenu}
						/>
					) : (
						<div onClick={toggleMenu} className='cursor-pointer'>
							<MenuIcon />
						</div>
					)}
				</div>
			</div>
			{menu ? (
				<div className='my-8 select-none animate-in slide-in-from-right'>
					<div className='flex flex-col gap-8 mx-4 mt-8'>
						{navMenu.map((item, idx) => (
							<Link href={item.href} key={idx} className='font-medium'>
								{item.label}
							</Link>
						))}

						{userSession ? (
							<>
								<Link href='/myreservation'>My reservation</Link>
								<Button
									onClick={userLogout}
									className='bg-rose-400 hover:bg-rose-400/80'
								>
									Logout
								</Button>
							</>
						) : (
							<div className='flex'>
								<Button
									asChild
									variant={'outline'}
									className='border-dark rounded-full hover:bg-green-brand hover:border-green-brand font-semibold hover:text-[#f9f9f9] transition-all duration-300 text-base h-14'
									size={'lg'}
								>
									<Link href={'/auth/signin'}>Sign In / Sign Up</Link>
								</Button>
							</div>
						)}
					</div>
				</div>
			) : (
				<div></div>
			)}
		</div>
	)
}

export default MobileNav
