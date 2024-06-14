import { FC, useEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ratingUser } from '@/utils/form-schema'
import { apiReviewReservation } from '@/api/reservationApi'
import { useToast } from '../ui/use-toast'
import { Checkbox } from '@headlessui/react'

type Segment = {
	name: string
}

type TRatingUserProps = {
	idReservation: string
	currentRating: number
}

const segmentsGood: Segment[] = [
	{ name: 'Sangat Bersih' },
	{ name: 'Fasilitas Lengkap' },
	{ name: 'Pelayanan sangat baik' },
]

const segmentsMid: Segment[] = [
	{ name: 'Cukup Bersih' },
	{ name: 'Fasilitas Cukup' },
	{ name: 'Pelayanan Cukup' },
]

const segmentsLow: Segment[] = [
	{ name: 'Kurang Bersih' },
	{ name: 'Fasilitas Kurang' },
	{ name: 'Pelayanan Kurang' },
]

const RatingUser: FC<TRatingUserProps> = ({ idReservation, currentRating }) => {
	const { toast } = useToast()
	const [ratingValue, setRatingValue] = useState<number>(currentRating)
	const [selectedItems, setSelectedItems] = useState<Segment[]>([])
	const [selectedSegment, setSelectedSegment] = useState<Segment[]>([])

	const handleCheckboxChange = (item: Segment) => {
		if (selectedItems.includes(item)) {
			setSelectedItems(
				selectedItems.filter(selectedItem => selectedItem !== item)
			)
		} else {
			setSelectedItems([...selectedItems, item])
		}
	}

	const handleRating = (rate: number) => {
		setRatingValue(rate)
	}

	useEffect(() => {
		if (ratingValue >= 1 && ratingValue <= 2) {
			setSelectedSegment(segmentsLow)
		} else if (ratingValue >= 3 && ratingValue <= 4) {
			setSelectedSegment(segmentsMid)
		} else if (ratingValue === 5) {
			setSelectedSegment(segmentsGood)
		} else {
			setSelectedSegment([])
		}
	}, [ratingValue])

	const form = useForm<z.infer<typeof ratingUser>>({
		resolver: zodResolver(ratingUser),
	})

	async function onSubmit(data: z.infer<typeof ratingUser>) {
		const bodyRating = {
			rating: ratingValue,
			comment: data.comment,
			tags: selectedItems.map(item => item.name),
		}

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
				initialValue={ratingValue}
				onClick={handleRating}
				size={50}
				transition
			/>
			<div className='w-full flex gap-2'>
				{selectedSegment.map(item => (
					<Checkbox
						key={item.name}
						checked={selectedItems.includes(item)}
						onChange={() => handleCheckboxChange(item)}
						className={`flex items-center p-2 rounded-lg cursor-pointer ${
							selectedItems.includes(item)
								? 'bg-greenBrand text-white'
								: 'bg-greenBrand/10'
						}`}
					>
						<span className='font-semibold'>{item.name}</span>
					</Checkbox>
				))}
			</div>
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