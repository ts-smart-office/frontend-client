'use client'
import { cancelReservationSchema, uploadPaymentFile } from '@/utils/form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Button } from '../ui/button'
import CustomUpload from './CustomUpload'
import { apiCancelReservation, apiUploadPayment } from '@/api/reservationApi'
import { useToast } from '../ui/use-toast'
import { useParams, useRouter } from 'next/navigation'
import CountdownTimer from './CountdownUpload'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Input } from '../ui/input'

type TUploadPaymentProps = {
	urlImage: string | null
	expiredTime: string
	statusReservation: string
}

const UploadPayment: FC<TUploadPaymentProps> = ({
	urlImage,
	expiredTime,
	statusReservation,
}) => {
	const { toast } = useToast()
	const router = useRouter()
	const params = useParams()
	const formPayment = useForm<z.infer<typeof uploadPaymentFile>>({
		resolver: zodResolver(uploadPaymentFile),
		defaultValues: {
			attachment: null,
		},
	})

	const onSubmitPayment = async (values: z.infer<typeof uploadPaymentFile>) => {
		const { attachment } = values

		const formData = new FormData()
		formData.append('_method', 'PUT')
		formData.append('attachment', attachment)
		if (typeof values.attachment === 'object') {
			await apiUploadPayment(params.id.toString(), formData)
				.then(res => {
					toast({
						description: res.data.message,
					})
					setTimeout(function () {
						router.push('/myreservation')
					}, 1000)
				})
				.catch(error => {
					if (error.response) {
						toast({
							description: error.response.data.message,
						})
					}
				})
		}
	}

	const formCancel = useForm<z.infer<typeof cancelReservationSchema>>({
		resolver: zodResolver(cancelReservationSchema),
	})

	const onSubmitCancel = async (
		values: z.infer<typeof cancelReservationSchema>
	) => {
		let bodyCancel
		if (values.details) {
			bodyCancel = {
				reason: values.reason,
				details: values.details,
			}
		}
		if (!values.details) {
			bodyCancel = {
				reason: values.reason,
				details: null,
			}
		}
		console.log(bodyCancel)

		await apiCancelReservation(params.id.toString(), bodyCancel)
			.then(res => {
				toast({
					description: res.data.message,
				})
				setTimeout(function () {
					router.push('/myreservation')
				}, 1000)
			})
			.catch(error => {
				if (error.response) {
					toast({
						description: error.response.data.message,
					})
				}
			})
	}

	const disabledCancel = statusReservation === 'waitingForPayment'

	return (
		<div className='w-full flex flex-col gap-4'>
			<Form {...formPayment}>
				<form
					onSubmit={formPayment.handleSubmit(onSubmitPayment)}
					className='flex flex-col gap-4'
				>
					<CustomUpload
						form={formPayment}
						name='attachment'
						urlImage={urlImage}
					/>
					{disabledCancel && <CountdownTimer expiredTime={expiredTime} />}
					<div className='flex gap-6'>
						{statusReservation === 'canceledByUser' ? (
							<Button
								type='button'
								disabled
								className='w-full bg-rose-400 rounded-full hover:bg-opacity-80 py-6 sm:text-lg hover:bg-rose-400'
							>
								Cancel by user
							</Button>
						) : (
							<>
								<Button
									type='submit'
									disabled={!!urlImage}
									className='w-full bg-greenBrand rounded-full hover:bg-opacity-80 py-6 sm:text-lg hover:bg-greenBrand'
								>
									Make reservation
								</Button>
							</>
						)}
					</div>
				</form>
			</Form>
			<Dialog>
				<DialogTrigger
					disabled={!disabledCancel}
					className='w-full flex items-center justify-center text-white bg-rose-400 rounded-full hover:bg-opacity-80 sm:text-lg hover:bg-rose-400 h-10 py-6'
				>
					Cancel reservation
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you sure to cancel this reservation?</DialogTitle>
						<DialogDescription>
							After cancel you cannot use this reservation
						</DialogDescription>
					</DialogHeader>
					<div className='w-full flex justify-end'>
						<Form {...formCancel}>
							<form
								onSubmit={formCancel.handleSubmit(onSubmitCancel)}
								className='w-full space-y-6'
							>
								<FormField
									control={formCancel.control}
									name='reason'
									render={({ field }) => (
										<FormItem className='space-y-3'>
											<FormLabel>Select reason cancel reservation</FormLabel>
											<FormControl>
												<RadioGroup
													onValueChange={field.onChange}
													defaultValue={field.value}
													className='flex flex-col space-y-1'
												>
													<FormItem className='flex items-center space-x-3 space-y-0'>
														<FormControl>
															<RadioGroupItem value='Ingin mengubah jadwal reservasi' />
														</FormControl>
														<FormLabel className='font-normal'>
															Ingin mengubah jadwal reservasi
														</FormLabel>
													</FormItem>
													<FormItem className='flex items-center space-x-3 space-y-0'>
														<FormControl>
															<RadioGroupItem value='Salah reservasi ruangan' />
														</FormControl>
														<FormLabel className='font-normal'>
															Salah reservasi ruangan
														</FormLabel>
													</FormItem>
													<FormItem className='flex items-center space-x-3 space-y-0'>
														<FormControl>
															<RadioGroupItem value='Ingin mengubah makanan' />
														</FormControl>
														<FormLabel className='font-normal'>
															Ingin mengubah makanan
														</FormLabel>
													</FormItem>
												</RadioGroup>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={formCancel.control}
									name='details'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													placeholder='Please enter details why reservation canceled'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button
									type='submit'
									className='w-full bg-rose-400 rounded-full hover:bg-opacity-80 py-6 sm:text-lg hover:bg-rose-400'
								>
									Cancel reservation
								</Button>
							</form>
						</Form>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default UploadPayment
