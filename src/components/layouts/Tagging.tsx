import { FC } from 'react'

type TTaggingProps = {
	label: string
	text: string
}

const Tagging: FC<TTaggingProps> = ({ label, text }) => {
	return (
		<div className='w-fit flex items-center justify-center gap-2 font-urbanist text-base font-medium p-2 border bg-white rounded-full'>
			<div className='bg-greenBrand py-1 px-3 text-white rounded-full'>
				{label}
			</div>
			<div className='text-greenBrand'>{text}</div>
		</div>
	)
}

export default Tagging
