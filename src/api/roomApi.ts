import { axiosInstance } from '@/lib/axios'

export const apiRooms = () => {
	return axiosInstance.get('/api/rooms', {
		headers: {
			accept: 'application/json',
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
