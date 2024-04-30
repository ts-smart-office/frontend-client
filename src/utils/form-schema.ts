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
