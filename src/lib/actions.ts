'use server'
import { UserSession } from '@/utils/types'
import { cookies } from 'next/headers'

export const handleUser = async (user: UserSession) => {
	const { id, name, email, role } = user
	const sessionUser = { id, name, email, role }

	cookies().set('session_user', JSON.stringify(sessionUser), {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		// maxAge: 60,
		maxAge: 60 * 60 * 24 * 1,
		path: '/',
	})
}

export async function getUser(): Promise<UserSession | undefined> {
	const userSession = cookies().get('session_user')?.value
	return userSession ? JSON.parse(userSession) : undefined
}

export async function deleteUser() {
	const deleteCookies = cookies()
		.getAll()
		.forEach(cookie => {
			cookies().delete(cookie.name)
		})
	return deleteCookies
}
