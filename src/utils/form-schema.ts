import { z } from 'zod'

export const signinSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
})

export const signupSchema = z.object({
	fullname: z.string().min(4).max(50),
	company: z.string().min(4).max(50),
	email: z.string().email(),
	phone: z.string().min(12),
	password: z.string().min(8),
})

export const subscriptionSchema = z.object({
	email: z.string().email(),
})

const additionalFoodSchema = z.object({
	id: z.string().uuid(),
	additional_food_id: z.number().nullable(),
	reservation_id: z.string().length(13),
	price: z.number().positive(),
})

export const reservationSchema = z.object({
	// id: z.string(),
	// user_id: z.string().uuid(),
	// room_id: z.number(),
	date: z.date(),
	type: z.enum(['halfday', 'fullday', 'podcastStreaming', 'podcastRecording']),
	room_price: z.number().positive(),
	total_persons: z.number().positive(),
	total_price: z.number().positive(),
	optional_message: z.string().nullable(),
	status: z
		.enum([
			'waitingForPayment',
			'paid',
			'approved',
			'expired',
			'canceledByUser',
			'declined',
		])
		.default('waitingForPayment'),
	status_message: z.string().nullable(),
	review_id: z.string().uuid().nullable(),
	additional_foods: z.array(additionalFoodSchema).optional(),
})
