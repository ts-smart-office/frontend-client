import { FC } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Tagging from '../layouts/Tagging'

const HeroSection: FC = () => {
	return (
		<div className='w-full flex flex-col justify-center gap-10 sm:gap-14'>
			<div className='w-full flex flex-col lg:flex-row lg:justify-between lg:items-end pt-24 lg:py-6 gap-4'>
				<h1 className='text-4xl leading-snug md:text-6xl md:leading-snug lg:text-[44px] lg:leading-[64px] xl:text-6xl xl:leading-snug font-semibold font-urbanist'>
					Digital Workspace, <br />
					Enhanced <span className='text-greenBrand'>Productivity</span>
				</h1>
				<div className='flex flex-col max-w-96 gap-4 xl:gap-11'>
					<p className='font-questrial text-base text-muted-foreground'>
						Enhance team collaboration with our rooms anytime and anywhere for
						efficient communication.
					</p>
					<Button
						className='bg-greenBrand font-urbanist h-14 rounded-full w-2/3 text-base hover:bg-opacity-80 hover:bg-greenBrand'
						size={'lg'}
					>
						Reserve room now
					</Button>
				</div>
			</div>
			<div className='flex flex-col gap-2'>
				<Tagging label='New' text='Modern buildings' />
				<div className='w-full grid grid-cols-12 gap-3 lg:gap-6'>
					<div className='col-span-5 xl:col-span-3'>
						<div className='relative w-full h-40 md:h-[360px] rounded-2xl'>
							<Image
								src='/banner-2.jpg'
								alt='banner-1'
								fill
								className='absolute w-full h-full object-cover rounded-2xl'
							/>
						</div>
					</div>
					<div className='xl:col-span-4 col-span-7'>
						<div className='relative w-full h-40 md:h-[360px] rounded-2xl'>
							<Image
								src='/banner-3.jpg'
								alt='banner-1'
								fill
								className='absolute w-full h-full object-cover rounded-2xl'
							/>
						</div>
					</div>
					<div className='xl:col-span-5 col-span-12'>
						<div className='relative w-full h-60 md:h-[360px] rounded-2xl'>
							<Image
								src='/banner-1.jpg'
								alt='banner-1'
								fill
								className='absolute w-full h-full object-cover rounded-2xl'
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HeroSection
