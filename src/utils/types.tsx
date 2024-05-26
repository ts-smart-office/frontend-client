export interface ServerResponse {
	status: number
	errorMessage: string
	success: boolean
	message: string
	result: any
}

export interface UserSession {
	id: string
	name: string
	email: string
}

interface FoodItem {
	id: number
	name: string
}

export interface SnackCategory {
	category: string
	id: number
	items: FoodItem[]
	name: string
	price: number
}

export interface LunchCategory {
	category: string
	id: number
	items: FoodItem[]
	name: string
	price: number
}

export interface BodyReservation {
	room_id: number
	date: string
	type: string
	total_persons: number
	optional_message?: string
	foods?: Array<number> | null
}

interface User {
	id: string
	name: string
	email: string
	email_verified_at: string | null
	two_factor_secret: string | null
	two_factor_recovery_codes: string | null
	created_at: string
	updated_at: string
	phone: string
	company: string
}

interface Room {
	id: number
	name: string
	max_capacity: number
	description: string
	reservation_lead_time: number
}

interface Food {
	id: string
	name: string
	category: string
	price: number
	items: FoodItem[]
}

export interface IDetailsReservation {
	id: string
	date: string
	type: string
	total_persons: number
	room_price: number
	total_price: number
	optional_message: string | null
	status: string
	status_message: string | null
	proof_of_payment_url: string | null
	created_at: string
	updated_at: string
	user: User
	room: Room
	foods: Food[]
}
