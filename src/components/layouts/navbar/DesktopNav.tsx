import { Button } from '@/components/ui/button'
import { navMenu } from '@/utils/constants'
import Link from 'next/link'
import { FC } from 'react'

const DesktopNav: FC = () => {
	return (
		<div className='hidden 2xl:max-w-[1600px] 2xl:mx-auto py-8 px-20 lg:block animate-in fade-in zoom-in'>
			<div className='flex justify-between items-center'>
				<div>
					<Link
						href={'/'}
						className='text-3xl font-semibold tracking-normal text-dark'
					>
						SmartOffice.
					</Link>
				</div>
				<div className='flex gap-[20px] xl:gap-[50px] text-[16px] items-center select-none'>
					{navMenu.map((item, idx) => (
						<Link
							href={item.href}
							key={idx}
							className='font-medium transition-colors duration-300 hover:text-green-brand'
						>
							{item.label}
						</Link>
					))}
				</div>
				<Button
					asChild
					variant={'outline'}
					className='border-dark rounded-full hover:bg-greenBrand hover:border-greenBrand font-semibold hover:text-[#f9f9f9] transition-all duration-300 text-base h-14'
					size={'lg'}
				>
					<Link href={'/auth/signin'}>Sign In / Sign Up</Link>
				</Button>
			</div>
		</div>
	)
}

export default DesktopNav
