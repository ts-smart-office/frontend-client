import { axiosInstance } from '@/lib/axios'
import { getCookie } from '@/lib/utils'

export const fetchToken = async () => {
	await axiosInstance.get('/sanctum/csrf-cookie')
}

export const loginUser = async (data: any) => {
	return axiosInstance.post('/api/session', data, {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
	})
}

export const logoutUser = async () => {
	return axiosInstance.delete('/api/session', {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
	})
}
