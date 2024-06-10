'use client'
import { FC, useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ratingUser } from '@/utils/form-schema'
import { apiReviewReservation } from '@/api/reservationApi'
import { useToast } from '../ui/use-toast'

type TRatingUserProps = {
	idReservation: string
}

const RatingUser: FC<TRatingUserProps> = ({ idReservation }) => {
	const { toast } = useToast()
	const [ratingValue, setRatingValue] = useState(0)

	const handleRating = (rate: number) => {
		setRatingValue(rate)
	}

	const form = useForm<z.infer<typeof ratingUser>>({
		resolver: zodResolver(ratingUser),
	})

	async function onSubmit(data: z.infer<typeof ratingUser>) {
		const bodyRating = {
			rating: ratingValue,
			comment: data.comment,
		}

		console.log(bodyRating)
		await apiReviewReservation(idReservation!, bodyRating)
			.then(res => {
				toast({
					description: res.data.message,
				})
				location.reload()
			})
			.catch(error => {
				if (error.response) {
					toast({
						description: error.response.data.message,
					})
				}
			})
	}

	return (
		<div className='w-full flex flex-col items-center gap-4'>
			<Rating
				SVGclassName={'inline-block'}
				onClick={handleRating}
				size={50}
				transition
				allowFraction
			/>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='w-full flex flex-col gap-6'
				>
					<FormField
						control={form.control}
						name='comment'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										disabled={ratingValue <= 0}
										placeholder='Cool'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type='submit'
						disabled={ratingValue <= 0}
						className='w-fit self-end bg-greenBrand px-8 h-fit text-base hover:bg-opacity-80 hover:bg-greenBrand'
					>
						Submit review
					</Button>
				</form>
			</Form>
		</div>
	)
}

export default RatingUser
