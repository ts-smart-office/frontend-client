'use client'
import { FC, useEffect, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { reservationSchema } from '@/utils/form-schema'
import { format, isSameDay } from 'date-fns'
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
	reservedDates: string[]
	details: IRoomDetails
}

const FormReservation: FC<TFormReservationProps> = ({
	details,
	reservedDates,
}) => {
	const { toast } = useToast()
	const router = useRouter()
	const form = useForm<z.infer<typeof reservationSchema>>({
		resolver: zodResolver(reservationSchema),
		defaultValues: {
			room_id: details.id,
		},
	})

	const onSubmit = async (values: z.infer<typeof reservationSchema>) => {
		const bodyReservation: BodyReservation = {
			room_id: details.id,
			date: moment(values.date).format('YYYY-MM-DD'),
			type: values.type,
			total_persons: parseInt(values.total_persons),
			optional_message: values.optional_message,
			foods: null as Array<number> | null,
		}

		if (values.snack && values.lunch) {
			bodyReservation.foods = [values.snack, values.lunch]
		} else if (values.snack) {
			bodyReservation.foods = [values.snack]
		} else if (values.lunch) {
			bodyReservation.foods = [values.lunch]
		} else {
			delete bodyReservation.foods
		}

		await apiCreateReservation(bodyReservation)
			.then(res => {
				toast({
					description: res.data.message,
				})
				console.log(res)
				return router.push(`/myreservation/${res.data.data.id}`)
			})
			.catch(error => {
				if (error.response) {
					toast({
						description: error.response.data.message,
					})
				}
			})
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
								Reservation date
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
													<span>Pick a date</span>
												)}
												<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className='w-auto p-0' align='start'>
										<Calendar
											mode='single'
											selected={field.value}
											onSelect={field.onChange}
											disabled={date =>
												date < new Date() ||
												reservedDates.some(reservedDate =>
													isSameDay(date, new Date(reservedDate))
												)
											}
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
								Person
							</FormLabel>
							<FormControl>
								<Input
									placeholder='Number of guests'
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
								Reservation type
							</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={field.value}
									className='flex flex-col'
								>
									<FormItem className='flex items-center space-x-3'>
										<FormControl>
											<RadioGroupItem value={details.prices[0].type} />
										</FormControl>
										<FormLabel className='font-normal text-base lg:text-lg'>
											<p className='font-semibold mb-2'>
												{details.prices[0].type === 'podcastRecording'
													? 'Recording'
													: details.prices[0].type}{' '}
												({rupiahCurrency.format(details.prices[0].price)}/
												{details.prices[0].type === 'podcastRecording'
													? 'Hour'
													: 'Person'}
												)
											</p>
											{details.prices[0].type === 'halfday' && (
												<p>Start at 08.00 AM - 12.00 PM</p>
											)}
										</FormLabel>
									</FormItem>
									<FormItem className='flex items-center space-x-3'>
										<FormControl>
											<RadioGroupItem value={details.prices[1].type} />
										</FormControl>
										<FormLabel className='font-normal text-base lg:text-lg flex flex-col'>
											<p className='font-semibold mb-2'>
												{details.prices[1].type === 'podcastStreaming'
													? 'Streaming'
													: details.prices[1].type}{' '}
												({rupiahCurrency.format(details.prices[1].price)}/
												{details.prices[1].type === 'podcastStreaming'
													? 'Hour'
													: 'Person'}
												)
											</p>
											{details.prices[1].type === 'fullday' && (
												<p>Start at 08.00 AM - 16.00 PM</p>
											)}
										</FormLabel>
									</FormItem>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='flex flex-col'>
					<p className='text-base lg:text-lg text-greyMuted'>
						Additional foods (optional)
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
													Lunch
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

				<FormField
					control={form.control}
					name='optional_message'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-base lg:text-lg text-greyMuted'>
								Message (optional)
							</FormLabel>
							<FormControl>
								<Textarea
									placeholder='Any message?'
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
						className='bg-greenBrand rounded-full py-6 text-lg hover:bg-opacity-80 hover:bg-greenBrand'
					>
						Request reservation now
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default FormReservation
