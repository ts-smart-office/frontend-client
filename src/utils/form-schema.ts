import { z } from 'zod'

export const signinSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
})

export const signupSchema = z
	.object({
		name: z.string().min(4).max(50),
		email: z.string().email(),
		company: z.string().min(4).max(50),
		phone: z.string().min(12),
		password: z.string().min(8),
		password_confirmation: z.string().min(8),
	})
	.refine(data => data.password === data.password_confirmation, {
		message: 'Password not match!',
		path: ['password_confirmation'],
	})

export const subscriptionSchema = z.object({
	email: z.string().email(),
})

export const uploadPaymentFile = z.object({
	attachment: z.any(),
})

export const cancelReservationSchema = z.object({
	reason: z.string(),
	details: z.string().optional(),
})

export const reservationSchema = z.object({
	room_id: z.number(),
	date: z.coerce.date(),
	type: z.coerce.number(),
	total_persons: z.string().refine(val => !Number.isNaN(parseInt(val, 10))),
	optional_message: z.string().optional(),
	snack: z.coerce.number().optional(),
	lunch: z.coerce.number().optional(),
})

export const reservationPodcastSchema = z.object({
	room_id: z.number(),
	date: z.coerce.date(),
	type: z.coerce.number(),
	duration_in_hours: z.coerce.number(),
	optional_message: z.string().optional(),
	start_time: z.string(),
})

export const ratingUser = z.object({
	comment: z.string().optional(),
})
