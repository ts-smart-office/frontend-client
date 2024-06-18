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
	role: {
		id: number
		name: string
	}
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

// export interface BodyReservation {
// 	room_id: number
// 	date: string
// 	type: string
// 	total_persons: number
// 	optional_message?: string
// 	foods?: Array<number> | null
// }

export interface BodyReservation {
	room_id: number
	date: string
	option_id: number
	total_persons: number
	optional_message?: string
	food_ids?: Array<number> | null
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
	type_name: string
	total_persons: number
	total_price: number
	room_price: number
	room_discount: number
	food_discount: number
	price: number
	optional_message: string | null
	status: string
	status_message: string | null
	proof_of_payment_url: string | null
	created_at: string
	updated_at: string
	expires_at: string
	user: User
	room: Room
	foods: Food[]
}

interface IFacilities {
	id: number
	name: string
}

interface ReservationOption {
	id: number
	reservation_type: ReservationType
	price: number
	pricing_unit: string
}

interface ReservationType {
	id: number
	name: string
	start_time: string
	end_time: string
}

export interface IRoomDetails {
	id: number
	name: string
	max_capacity: number
	description: string
	reservation_lead_time: number
	facilities: IFacilities[]
	reservation_options: ReservationOption[]
	image_urls: string[]
	reserved_dates: {
		date: string
		start_time: string
		end_time: string
	}[]
	reviews: string[]
}

export interface IReservationsByUser {
	created_at: string
	date: string
	duration_in_hours: number | null
	id: string
	optional_message: string | null
	proof_of_payment_url: string
	room: {
		created_at: string
		deleted_at: string | null
		description: string
		id: number
		max_capacity: number
		name: string
		reservation_lead_time: number
		updated_at: string
	}
	room_price: number
	status: string
	start_time: string
	end_time: string
	review: {
		id: string
		rating: number
		comment: string
		tags: string[]
	} | null
	status_message: string | null
	total_persons: number
	total_price: number
	type_name: string
	updated_at: string
}
