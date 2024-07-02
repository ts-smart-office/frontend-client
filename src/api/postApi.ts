import { axiosInstance } from '@/lib/axios'

export const apiPosts = () => {
	return axiosInstance.get('/api/posts', {
		headers: {
			accept: 'application/json',
		},
	})
}

export const apiDetailPost = (id: string) => {
	return axiosInstance.get(`/api/posts/${id}`, {
		headers: {
			accept: 'application/json',
		},
	})
}
