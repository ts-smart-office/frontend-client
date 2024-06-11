import React, { useState, useEffect } from 'react'

type TCountdownTimerProps = {
	expiredTime: string
}

const CountdownTimer = ({ expiredTime }: TCountdownTimerProps) => {
	const [countdown, setCountdown] = useState<string | null>(null)

	useEffect(() => {
		const targetDate = new Date(expiredTime).getTime()
		const interval = setInterval(() => {
			const now = new Date().getTime()
			const distance = targetDate - now

			// Calculate remaining days, hours, minutes, and seconds
			const days = Math.floor(distance / (1000 * 60 * 60 * 24))
			const hours = Math.floor(
				(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			)
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
			const seconds = Math.floor((distance % (1000 * 60)) / 1000)

			// Update the countdown state
			setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`)

			// Check if the countdown is finished
			if (distance < 0) {
				clearInterval(interval)
				setCountdown('Reservation time has expired')
			}
		}, 1000)

		return () => {
			clearInterval(interval)
		}
	}, [])

	return (
		<div className='flex justify-between text-darkColor text-lg font-semibold'>
			<h2>Please upload the proof of payment before:</h2>
			<p>{countdown}</p>
		</div>
	)
}

export default CountdownTimer
