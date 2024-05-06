'use client'
import { FC } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { reservationSchema } from '@/utils/form-schema'
import { format } from 'date-fns'
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
import { cn } from '@/lib/utils'
import { CalendarIcon } from '@heroicons/react/24/outline'
import { Calendar } from '../ui/calendar'
import { RadioGroupItem, RadioGroup } from '../ui/radio-group'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../ui/accordion'
import { Checkbox } from '../ui/checkbox'
import { coffeeBreak } from '@/utils/constants'

const FormReservation: FC = () => {
	const form = useForm<z.infer<typeof reservationSchema>>({
		resolver: zodResolver(reservationSchema),
	})

	const onSubmit = (values: z.infer<typeof reservationSchema>) => {
		console.log(values)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
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
											disabled={date => date < new Date('1900-01-01')}
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
									className='border rounded-full border-greyMuted focus-visible:ring-0 focus-visible:border-greenBrand text-base lg:text-lg lg:py-6 px-4'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* <FormField
					control={form.control}
					name='type'
					render={({ field }) => (
						<FormItem className='space-y-3'>
							<FormLabel className='text-base lg:text-lg text-greyMuted'>
								Reservation type
							</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={field.value}
									className='flex flex-col space-y-1'
								>
									<FormItem className='flex items-center space-x-3'>
										<FormControl>
											<RadioGroupItem value='halfday' />
										</FormControl>
										<FormLabel className='font-normal text-base lg:text-lg'>
											<p className='font-semibold'>
												Half-Day (Rp.25.000/person)
											</p>
											<p>Start at 08.00 AM - 12.00 PM</p>
										</FormLabel>
									</FormItem>
									<FormItem className='flex items-center space-x-3'>
										<FormControl className=''>
											<RadioGroupItem value='fullday' />
										</FormControl>
										<FormLabel className='font-normal text-base lg:text-lg flex flex-col'>
											<p className='font-semibold'>
												Full-Day (Rp.60.000/person)
											</p>
											<p>Start at 08.00 AM - 16.00 PM</p>
										</FormLabel>
									</FormItem>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='additional_foods'
					render={({ field }) => (
						<FormItem className='space-y-3'>
							<FormLabel className='text-base lg:text-lg text-greyMuted'>
								Reservation type
							</FormLabel>
							<FormControl>
								<Accordion type='single' collapsible>
									<AccordionItem value='item-1'>
										<AccordionTrigger>Coffee break</AccordionTrigger>
										{coffeeBreak.map(item => (
											<AccordionContent key={item.additional_food_id}>
												<div className='flex gap-2'>
													<Checkbox value={item.additional_food_id} />
													<div className='flex flex-col'>
														<p>
															{item.name} {item.price}
														</p>
														<div className='flex gap-1'>
															{item.details.map(detail => (
																<p key={detail}>{detail}</p>
															))}
														</div>
													</div>
												</div>
											</AccordionContent>
										))}
									</AccordionItem>
								</Accordion>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/> */}
				<div className='flex justify-end pt-4'>
					<Button
						type='submit'
						className='bg-greenBrand rounded-full w-2/3 py-6 text-lg hover:bg-opacity-80 hover:bg-greenBrand'
					>
						Request reservation now
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default FormReservation
