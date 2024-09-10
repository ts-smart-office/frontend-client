import { FC } from 'react'
import { Separator } from '../ui/separator'
import { navMenu } from '@/utils/constants'
import Link from 'next/link'
import { Facebook, Instagram } from 'lucide-react'

const Footer: FC = () => {
	return (
		<div className='w-full flex flex-col font-urbanist pt-20'>
			<div className='w-full flex flex-col max-md:gap-8 md:flex-row justify-between pb-7'>
				<h1 className='font-semibold text-2xl md:text-4xl'>
					Tiga Serangkai <br /> SMART Office
				</h1>
				<div className='flex gap-8 max-md:justify-between md:gap-32'>
					<div className='flex flex-col gap-2'>
						<p className='font-semibold text-xl mb-2'>Menu</p>
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
					<div className='flex flex-col gap-2'>
						<p className='font-semibold text-xl mb-2'>Useful Links</p>
						<Link
							href='/term-of-use'
							className='font-medium transition-colors duration-300 hover:text-green-brand'
						>
							Term
						</Link>
						<Link
							href='/privacy-policy'
							className='font-medium transition-colors duration-300 hover:text-green-brand'
						>
							Privacy
						</Link>
					</div>
					<div className='flex flex-col gap-2'>
						<p className='font-semibold text-xl mb-2'>Komunitas Kami</p>
						<div className='flex gap-4'>
							<Instagram />
							<Facebook />
						</div>
					</div>
				</div>
			</div>
			<Separator className='bg-darkColor' />
			<p className='text-lg py-4 text-greyMuted'>
				Copyright © 2024. All rights reserved
			</p>
		</div>
	)
}

export default Footer
