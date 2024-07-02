import { axiosInstance } from '@/lib/axios'
import { getCookie } from '@/lib/utils'

export const apiRooms = () => {
	return axiosInstance.get('/api/rooms', {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
	})
}

export const apiDetailsRoom = (id: string) => {
	return axiosInstance.get(`/api/rooms/${id}`, {
		headers: {
			accept: 'application/json',
		},
	})
}
