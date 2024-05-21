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
	paymentFile: z.custom<File | null>(val => val instanceof File, 'Required'),
})

const additionalFoodSchema = z.object({
	id: z.string(),
	additional_food_id: z.string(),
	reservation_id: z.string(),
	price: z.number().positive(),
})

export const reservationSchema = z.object({
	id: z.string(),
	user_id: z.string(),
	room_id: z.string(),
	date: z.date(),
	type: z.enum(['halfday', 'fullday', 'podcastStreaming', 'podcastRecording']),
	room_price: z.number().positive(),
	total_persons: z.preprocess(
		a => parseInt(z.string().parse(a), 10),
		z.number()
	),
	total_price: z.number().positive(),
	optional_message: z.string(),
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
	status_message: z.string().optional(),
	review_id: z.string().optional(),
	additional_foods: z.array(additionalFoodSchema).optional(),
})
