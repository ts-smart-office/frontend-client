import { axiosInstance } from '@/lib/axios'
import { getCookie } from '@/lib/utils'

export const apiCreateReservation = async (data: any) => {
	return axiosInstance.post('/api/reservations', data, {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
	})
}

export const apiFoods = () => {
	return axiosInstance.get('/api/foods', {
		headers: {
			accept: 'application/json',
		},
	})
}

export const apiReservations = () => {
	return axiosInstance.get('/api/reservations', {
		headers: {
			accept: 'application/json',
		},
	})
}

export const apiDetailsReservation = (id: string) => {
	return axiosInstance.get(`/api/reservations/${id}`, {
		headers: {
			accept: 'application/json',
		},
	})
}

export const apiUploadPayment = (id: string, data: any) => {
	console.log(data)
	return axiosInstance.post(`/api/reservations/${id}`, data, {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
	})
}
