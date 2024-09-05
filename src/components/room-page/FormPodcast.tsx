'use client'
import { FC, useEffect, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
	reservationPodcastSchema,
	reservationSchema,
} from '@/utils/form-schema'
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
	apiCreateReservation,
	apiCustomerServicePhone,
} from '@/api/reservationApi'
import { useToast } from '../ui/use-toast'
import { IRoomDetails } from '@/utils/types'
import { useRouter } from 'next/navigation'
import moment from 'moment'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'
import { ToastAction } from '../ui/toast'

type TFormPodcastProps = {
	reservedDates: {
		date: string
		start_time: string
		end_time: string
	}[]
	details: IRoomDetails
}

const FormPodcast: FC<TFormPodcastProps> = ({ details, reservedDates }) => {
	const { toast } = useToast()
	const router = useRouter()
	const form = useForm<z.infer<typeof reservationPodcastSchema>>({
		resolver: zodResolver(reservationPodcastSchema),
		defaultValues: {
			room_id: details.id,
		},
	})
	const [loadBtn, setLoadBtn] = useState<boolean>(false)
	const [selectedDate, setSelectedDate] = useState<Date | undefined>()
	const [disabledTimes, setDisabledTimes] = useState<string[]>([])
	const [csPhone, setCsPhone] = useState<string | null>(null)

	const time = [
		{ value: '08:00' },
		{ value: '09:00' },
		{ value: '10:00' },
		{ value: '11:00' },
		{ value: '12:00' },
		{ value: '13:00' },
		{ value: '14:00' },
		{ value: '15:00' },
		{ value: '16:00' },
		{ value: '17:00' },
	]

	const fetchCustomerServicePhone = async () => {
		await apiCustomerServicePhone()
			.then(res => {
				setCsPhone(res.data.data.value)
				// console.log(res.data.data.value)
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response)
				}
			})
	}

	useEffect(() => {
		const updateDisabledTimes = () => {
			if (selectedDate) {
				const formattedSelectedDate = moment(selectedDate).format('YYYY-MM-DD')
				const disabledTimes: string[] = []

				time.forEach(item => {
					const timeValue = item.value
					const timeInRange = reservedDates.some(slot => {
						const startTime = slot.start_time
						const endTime = slot.end_time
						return (
							timeValue >= startTime &&
							timeValue < endTime &&
							isSameDay(new Date(slot.date), selectedDate)
						)
					})

					if (timeInRange) {
						disabledTimes.push(timeValue)
					}
				})

				setDisabledTimes(disabledTimes)
			}
		}

		updateDisabledTimes()
		fetchCustomerServicePhone()
	}, [selectedDate, reservedDates])

	const getAvailableTimeSlots = () => {
		const availableTime: any[] = []

		time.forEach(item => {
			const timeValue = item.value
			let timeAvailable = true

			reservedDates.forEach(slot => {
				const startTime = slot.start_time
				const endTime = slot.end_time

				if (timeValue >= startTime && timeValue < endTime) {
					timeAvailable = false
				}
			})

			if (timeAvailable) {
				availableTime.push(item.value)
			}
		})

		return availableTime
	}

	const onSubmit = async (values: z.infer<typeof reservationPodcastSchema>) => {
		const bodyReservation: any = {
			room_id: details.id,
			date: moment(values.date).format('YYYY-MM-DD'),
			option_id: values.type,
			start_time: values.start_time,
			duration_in_hours: values.duration_in_hours,
			optional_message: values.optional_message,
		}

		setLoadBtn(true)

		await apiCreateReservation(bodyReservation)
			.then(res => {
				toast({
					title: res.data.message,
				})
				return router.push(`/myreservation/${res.data.data.id}`)
			})
			.catch(error => {
				if (error.response) {
					const availableTimeSlots = getAvailableTimeSlots().join(', ')
					toast({
						title: error.response.data.message,
						description: `${
							availableTimeSlots
								? `Waktu kosong tersedia: ${availableTimeSlots}. Atau hubungi customer service kami`
								: ``
						}`,
						action: (
							<ToastAction altText='Hubungi'>
								<a
									href={`https://wa.me/+62${csPhone}`}
									target='_blank'
									rel='noopener noreferrer'
								>
									Hubungi
								</a>
							</ToastAction>
						),
					})
				}
			})
			.finally(() => {
				setLoadBtn(false)
			})
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
													<span>Pilih Tanggal</span>
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
												setSelectedDate(date)
												field.onChange(date)
											}}
											disabled={date => {
												const today = new Date()
												const nextWeek = new Date(today)
												nextWeek.setDate(nextWeek.getDate() + 7)

												today.setHours(0, 0, 0, 0)
												nextWeek.setHours(0, 0, 0, 0)
												date.setHours(0, 0, 0, 0)

												return (
													(date >= today && date <= nextWeek) || date < today
												)
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
					name='start_time'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-base lg:text-lg text-greyMuted'>
								Pilih Waktu Mulai
							</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger
										className={cn(
											'border border-greyMuted text-base lg:text-lg lg:py-6 px-4 rounded-full focus:ring-transparent',
											!field.value && 'text-muted-foreground'
										)}
									>
										<SelectValue placeholder='Select start time' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{time.map(item => (
										<SelectItem
											// disabled={!getAvailableTimeSlots().includes(item.value)}
											disabled={disabledTimes.includes(item.value)}
											key={item.value}
											value={item.value}
										>
											{item.value}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='duration_in_hours'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-base lg:text-lg text-greyMuted'>
								Pilih Durasi
							</FormLabel>
							<FormControl>
								<Input
									placeholder='Pilih Durasi'
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

export default FormPodcast
