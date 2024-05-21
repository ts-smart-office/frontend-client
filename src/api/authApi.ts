import { axiosInstance } from '@/lib/axios'
import { getCookie } from '@/lib/utils'
import { signinSchema, signupSchema } from '@/utils/form-schema'
import { z } from 'zod'

export const apiCsrfToken = async () => {
	await axiosInstance.get('/sanctum/csrf-cookie')
}

export const apiLogin = (data: z.infer<typeof signinSchema>) => {
	return axiosInstance.post('/api/session', data, {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
	})
}

export const apiRegister = (data: z.infer<typeof signupSchema>) => {
	return axiosInstance.post('/api/users', data, {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
	})
}

export const apiLogout = () => {
	return axiosInstance.delete('/api/session', {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
	})
}
