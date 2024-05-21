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
	return userSession ? userSession : null
}

export async function deleteUser() {
	const deleteCookies = cookies()
		.getAll()
		.forEach(cookie => {
			cookies().delete(cookie.name)
		})
	return deleteCookies
}
