'use client'
import { FC, useEffect, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { reservationSchema } from '@/utils/form-schema'
import { format, isSameDay, isWeekend } from 'date-fns'
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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn, rupiahCurrency } from '@/lib/utils'
import { CalendarIcon } from '@heroicons/react/24/outline'
import { Calendar } from '../ui/calendar'
import { RadioGroupItem, RadioGroup } from '../ui/radio-group'
import { Textarea } from '../ui/textarea'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../ui/accordion'
import { apiCreateReservation, apiFoods } from '@/api/reservationApi'
import { useToast } from '../ui/use-toast'
import {
	BodyReservation,
	IRoomDetails,
	LunchCategory,
	SnackCategory,
} from '@/utils/types'
import { useRouter } from 'next/navigation'
import moment from 'moment'

type TFormReservationProps = {
	reservedDates: {
		date: string
		start_time: string
		end_time: string
	}[]
	details: IRoomDetails
	userRole: string
}

const FormReservation: FC<TFormReservationProps> = ({
	details,
	reservedDates,
	userRole,
}) => {
	const { toast } = useToast()
	const router = useRouter()
	const form = useForm<z.infer<typeof reservationSchema>>({
		resolver: zodResolver(reservationSchema),
		defaultValues: {
			room_id: details.id,
		},
	})
	const [loadBtn, setLoadBtn] = useState<boolean>(false)
	const [selectedDate, setSelectedDate] = useState<Date | undefined>()

	const onSubmit = async (values: z.infer<typeof reservationSchema>) => {
		const bodyReservation: BodyReservation = {
			room_id: details.id,
			date: moment(values.date).format('YYYY-MM-DD'),
			option_id: values.type,
			total_persons: parseInt(values.total_persons),
			optional_message: values.optional_message,
			food_ids: null as Array<number> | null,
		}

		if (values.snack && values.lunch) {
			bodyReservation.food_ids = [values.snack, values.lunch]
		} else if (values.snack) {
			bodyReservation.food_ids = [values.snack]
		} else if (values.lunch) {
			bodyReservation.food_ids = [values.lunch]
		} else {
			delete bodyReservation.food_ids
		}

		setLoadBtn(true)

		await apiCreateReservation(bodyReservation)
			.then(res => {
				toast({
					description: res.data.message,
				})
				return router.push(`/myreservation/${res.data.data.id}`)
			})
			.catch(error => {
				if (error.response) {
					toast({
						description: error.response.data.message,
					})
				}
			})
			.finally(() => setLoadBtn(false))
	}

	const [snack, setSnack] = useState<SnackCategory[]>([])
	const [lunch, setLunch] = useState<LunchCategory[]>([])

	const allFoods = async () => {
		await apiFoods()
			.then(res => {
				setSnack(res.data.data.snack)
				setLunch(res.data.data.lunch)
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response)
				}
			})
	}

	useEffect(() => {
		allFoods()
	}, [])

	const selectedDatesFull: Date[] = []
	for (const reservedDate of reservedDates) {
		if (
			reservedDate.start_time === '08:00' &&
			reservedDate.end_time === '17:00'
		) {
			selectedDatesFull.push(new Date(reservedDate.date))
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-3'
			>
				<FormField
					control={form.control}
					name='date'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel className='text-base lg:text-lg text-greyMuted'>
								Tanggal Reservasi
							</FormLabel>
							<FormControl>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={'outline'}
												className={cn(
													'w-full text-left font-normal text-base lg:text-lg lg:py-6 px-4 rounded-full border border-greyMuted',
													!field.value && 'text-muted-foreground'
												)}
											>
												{field.value ? (
													format(field.value, 'PPP')
												) : (
													<span>Pilih tanggal</span>
												)}
												<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className='w-auto p-0' align='start'>
										<Calendar
											mode='single'
											selected={field.value}
											onSelect={date => {
												field.onChange(date)
												setSelectedDate(date)
											}}
											disabled={date =>
												date < new Date() ||
												isWeekend(date) ||
												reservedDates.some(reservedDate => {
													const reservedDateTime = new Date(reservedDate.date)
													return (
														isSameDay(date, reservedDateTime) &&
														reservedDate.start_time === '08:00' &&
														reservedDate.end_time === '17:00'
													)
												})
											}
											modifiers={{ selectedDatesFull: selectedDatesFull }}
											modifiersClassNames={{
												selectedDatesFull:
													'bg-rose-700 text opacity-100 text-white',
											}}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='total_persons'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-base lg:text-lg text-greyMuted'>
								Tamu
							</FormLabel>
							<FormControl>
								<Input
									placeholder='Jumlah tamu yang akan datang'
									type='number'
									{...field}
									className='border border-greyMuted text-base lg:text-lg lg:py-6 px-4 rounded-full'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='type'
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel className='text-base lg:text-lg text-greyMuted'>
								Tipe Reservasi
							</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={field?.value?.toString()}
									className='flex flex-col'
								>
									{details.reservation_options.map(item => (
										<FormItem
											key={item.id}
											className='flex items-center space-x-3'
										>
											<FormControl>
												<RadioGroupItem
													value={item.id.toString()}
													className='mt-2'
													disabled={
														selectedDate
															? reservedDates.some(
																	reservedDate =>
																		isSameDay(
																			new Date(selectedDate),
																			new Date(reservedDate.date)
																		) &&
																		item.reservation_type.start_time <=
																			reservedDate.end_time &&
																		item.reservation_type.end_time >=
																			reservedDate.start_time
															  )
															: true
													}
												/>
											</FormControl>
											<FormLabel className='font-normal text-base lg:text-lg flex flex-col'>
												<p className='font-semibold'>
													{item.reservation_type.name} -{' '}
													{rupiahCurrency.format(item.price)}/
													{item.pricing_unit}
												</p>
												{!item.reservation_type.name.includes('Podcast') && (
													<p>
														Start at {item.reservation_type.start_time} -{' '}
														{item.reservation_type.end_time}
													</p>
												)}
											</FormLabel>
										</FormItem>
									))}
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{(userRole === 'External User' ||
					!userRole ||
					(Array.isArray(userRole) && !userRole.includes('Internal'))) && (
					<div className='flex flex-col'>
						<p className='text-base lg:text-lg text-greyMuted'>
							Tambahan Makanan (optional)
						</p>
						<FormField
							control={form.control}
							name='snack'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Accordion type='single' collapsible>
											<AccordionItem value='item-1'>
												<AccordionTrigger className='py-2 text-base lg:text-lg hover:no-underline'>
													<div className='flex w-full justify-between items-center'>
														Snack
														<Button
															type='button'
															variant='ghost'
															onClick={() => form.reset()}
														>
															Reset
														</Button>
													</div>
												</AccordionTrigger>
												<AccordionContent className='flex flex-col gap-2'>
													<RadioGroup
														onValueChange={field.onChange}
														className='flex flex-col space-y-1'
														value={field.value?.toString()}
													>
														{snack?.map(item => (
															<FormItem
																key={item.id}
																className='flex space-x-3 space-y-0'
															>
																<FormControl className='mt-1.5'>
																	<RadioGroupItem value={item.id.toString()} />
																</FormControl>
																<FormLabel className='flex flex-col font-normal text-base lg:text-lg'>
																	<p className='font-semibold'>
																		{item.name} (
																		{rupiahCurrency.format(item.price)}/person)
																	</p>
																	<ul className='flex gap-1 flex-wrap'>
																		{item.items.map(item => (
																			<li key={item.id}>{item.name}, </li>
																		))}
																	</ul>
																</FormLabel>
															</FormItem>
														))}
													</RadioGroup>
												</AccordionContent>
											</AccordionItem>
										</Accordion>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='lunch'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Accordion type='single' collapsible>
											<AccordionItem value='item-1'>
												<AccordionTrigger className='py-2 text-base lg:text-lg hover:no-underline'>
													<div className='flex w-full justify-between items-center'>
														Makan Berat
														<Button
															type='button'
															variant='ghost'
															onClick={() => form.reset()}
														>
															Reset
														</Button>
													</div>
												</AccordionTrigger>
												<AccordionContent>
													<RadioGroup
														onValueChange={field.onChange}
														className='flex flex-col space-y-1'
														value={field.value?.toString()}
													>
														{lunch?.map(item => (
															<FormItem
																key={item.id}
																className='flex space-x-3 space-y-0'
															>
																<FormControl className='mt-1.5'>
																	<RadioGroupItem value={item.id.toString()} />
																</FormControl>
																<FormLabel className='flex flex-col font-normal text-base lg:text-lg'>
																	<p className='font-semibold'>
																		{item.name} (
																		{rupiahCurrency.format(item.price)}/person)
																	</p>
																	<ul className='flex gap-1 flex-wrap'>
																		{item.items.map(item => (
																			<li key={item.id}>{item.name}, </li>
																		))}
																	</ul>
																</FormLabel>
															</FormItem>
														))}
													</RadioGroup>
												</AccordionContent>
											</AccordionItem>
										</Accordion>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				)}

				<FormField
					control={form.control}
					name='optional_message'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-base lg:text-lg text-greyMuted'>
								Pesan Anda (optional)
							</FormLabel>
							<FormControl>
								<Textarea
									placeholder='Tuliskan pesan anda'
									className='border border-greyMuted rounded-xl text-base lg:text-lg px-4 resize-none'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='flex justify-end mt-4 md:mt-6'>
					<Button
						type='submit'
						disabled={loadBtn}
						className={`bg-greenBrand rounded-full py-6 text-lg hover:bg-opacity-80 hover:bg-greenBrand ${
							loadBtn ? 'opacity-50 cursor-not-allowed' : ''
						}`}
					>
						{loadBtn ? 'Memesan...' : 'Pesan sekarang'}
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default FormReservation
