'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { handleUser } from '@/lib/actions'
import { useEffect } from 'react'

const GoogleCallbackPage = () => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const user = searchParams.get('user')

	useEffect(() => {
		if (user) {
			handleUser(JSON.parse(user))
			router.push('/')
		}
	}, [router])

	return (
		<div>
			<p>Logging you in...</p>
		</div>
	)
}

export default GoogleCallbackPage
