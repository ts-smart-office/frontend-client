import { FC } from 'react'
import {
	CalendarDaysIcon,
	NewspaperIcon,
	PresentationChartLineIcon,
} from '@heroicons/react/24/outline'
import FeatureCard from './FeatureCard'

const FeaturesSection: FC = () => {
	return (
		<div className='w-full flex flex-col justify-center items-center font-urbanist pt-16 lg:pt-32 gap-10'>
			<h1 className='text-3xl sm:text-[40px] leading-snug font-semibold max-w-[560px] text-center'>
				Elevating Your Experience with Our Websites{' '}
				<span className='text-greenBrand'>Key Features</span>
			</h1>
			<div className='w-full grid grid-cols-12 gap-4 lg:gap-8'>
				<div className='col-span-12 lg:col-span-4 p-12 rounded-xl border border-borderMuted bg-blue-50'>
					<FeatureCard
						icon={<CalendarDaysIcon className='w-20 h-20 text-greenBrand' />}
						title='Effortless Reservation'
						desc='Seamless booking an intuitive interface and calendar integration.'
					/>
				</div>
				<div className='col-span-12 lg:col-span-4 p-12 rounded-xl border border-borderMuted bg-blue-50'>
					<FeatureCard
						icon={
							<PresentationChartLineIcon className='w-20 h-20 text-greenBrand' />
						}
						title='Real-time Availability'
						desc='Seamless booking an intuitive interface and calendar integration.'
					/>
				</div>
				<div className='col-span-12 lg:col-span-4 p-12 rounded-xl border border-borderMuted bg-blue-50'>
					<FeatureCard
						icon={<NewspaperIcon className='w-20 h-20 text-greenBrand' />}
						title='News Hub for Updates'
						desc='Seamless booking an intuitive interface and calendar integration.'
					/>
				</div>
			</div>
		</div>
	)
}

export default FeaturesSection
