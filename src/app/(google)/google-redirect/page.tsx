'use client'
import React, { Suspense } from 'react'
import GoogleCallbackPage from './googleCallback'

const GooglePage = () => {
	return (
		<Suspense>
			<GoogleCallbackPage />
		</Suspense>
	)
}

export default GooglePage
