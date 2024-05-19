'use server'
import { cookies } from 'next/headers'

export const handleUser = async (user: any) => {
	cookies().set('session_user', user, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 1,
		path: '/',
	})
}

export async function getUser() {
	const userSession = cookies().get('session_user')?.value
	return userSession ? JSON.parse(userSession) : null
}
