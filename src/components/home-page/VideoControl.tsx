import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid'
import { FC } from 'react'

type TVideoControlProps = {
	progress: any
	size?: number
	width?: number
	isPaused: any
	onPlayPause: () => void
}

const VideoControl: FC<TVideoControlProps> = ({
	progress,
	size = 48,
	width = 3,
	isPaused,
	onPlayPause,
}) => {
	const center = size / 2
	const radius = center - width
	const dashArray = 2 * Math.PI * radius
	const dashOffset = dashArray * (1 - progress)

	return (
		<div className='relative flex justify-center items-center'>
			<svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
				<circle
					cx={center}
					cy={center}
					r={radius}
					fill='transparent'
					stroke='#aaaaaa'
					strokeWidth={width}
				/>
				<circle
					cx={center}
					cy={center}
					r={radius}
					fill='transparent'
					stroke='#ffffff'
					strokeWidth={width}
					strokeDasharray={dashArray}
					strokeDashoffset={dashOffset}
					strokeLinecap='round'
				/>
			</svg>
			<div className='absolute'>
				<button
					className='group cursor-pointer flex justify-center items-center'
					onClick={onPlayPause}
				>
					<div className=' fill-white group-hover:fill-[#aaaaaa] transition-colors duration-200 ease-in-out'>
						{isPaused ? (
							<PlayIcon className='w-4 h-4 text-white' />
						) : (
							<PauseIcon className='w-4 h-4 text-white' />
						)}
					</div>
				</button>
			</div>
		</div>
	)
}

export default VideoControl
