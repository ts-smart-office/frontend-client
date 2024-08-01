import { FC } from 'react'
import { Button } from '../../ui/button'
import FormSubscription from './FormSubscription'

const SubscriptionSection: FC = () => {
	return (
		<div className='w-full 2xl:max-w-[1600px] 2xl:mx-auto flex flex-col justify-center items-center font-urbanist gap-6 lg:gap-10 py-12 lg:py-32 lg:px-20'>
			<div className='flex flex-col justify-center items-center max-sm:gap-2'>
				<h1 className='text-3xl md:text-6xl leading-tight font-semibold text-center'>
					Berlangganan buletin kami
				</h1>
				<p className='text-greyMuted text-base w-full md:text-lg text-center mt-4'>
					Dapatkan informasi terbaru dan penawaran eksklusif dengan berlangganan
					buletin kami.
				</p>
			</div>
			<FormSubscription />
		</div>
	)
}

export default SubscriptionSection
