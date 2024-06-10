'use client'
import { useEffect, useRef, useState } from 'react'
import VideoControl from './VideoControl'

const AboutVideo = () => {
	const [videoProgress, setVideoProgress] = useState(0)
	const [videoDuration, setVideoDuration] = useState(0)
	const [isPaused, setIsPaused] = useState(false)
	const videoRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		const video = videoRef.current
		if (video) {
			setVideoDuration(video.duration)
		}
	}, [])

	useEffect(() => {
		if (isPaused) return
		const currentTime = videoRef.current?.currentTime
		if (videoDuration != null && currentTime != null) {
			let loadingTimeout = setTimeout(() => {
				if (videoProgress == currentTime / videoDuration) {
					setVideoProgress(prev => prev + 0.000001)
				} else {
					setVideoProgress(currentTime / videoDuration)
				}
			}, 10)

			return () => {
				clearTimeout(loadingTimeout)
			}
		}
	}, [videoProgress, videoDuration, isPaused])

	const togglePlayPause = () => {
		const video = videoRef.current
		if (video) {
			setIsPaused(!video.paused)
			video.paused ? video.play() : video.pause()
		}
	}

	return (
		<div className='relative h-72 md:h-[460px] rounded-2xl overflow-hidden'>
			<div className='absolute top-4 right-4 z-10'>
				<VideoControl
					progress={videoProgress}
					isPaused={isPaused}
					onPlayPause={togglePlayPause}
				/>
			</div>
			<video
				className='w-full h-full absolute top-0 left-0 object-cover rounded-2xl'
				ref={videoRef}
				loop
				muted
				autoPlay
			>
				<source src='/video.mp4' className='rounded-2xl' />
			</video>
		</div>
	)
}

export default AboutVideo
