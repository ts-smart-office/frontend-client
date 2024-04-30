import { FC } from 'react'

type TFeatureCardProps = {
	icon: any
	title: string
	desc: string
}

const FeatureCard: FC<TFeatureCardProps> = ({ icon, title, desc }) => {
	return (
		<div className='flex flex-col'>
			{icon}
			<h2 className='font-semibold text-3xl pt-6 pb-3'>{title}</h2>
			<p className='text-base text-greyMuted'>{desc}</p>
		</div>
	)
}

export default FeatureCard
