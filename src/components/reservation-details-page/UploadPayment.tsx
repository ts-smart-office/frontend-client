'use client'
import { uploadPaymentFile } from '@/utils/form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '../ui/form'
import { Button } from '../ui/button'
import CustomUpload from './CustomUpload'
import { apiCancelReservation, apiUploadPayment } from '@/api/reservationApi'
import { useToast } from '../ui/use-toast'
import { useParams, useRouter } from 'next/navigation'
import CountdownTimer from './CountdownUpload'

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
	const form = useForm<z.infer<typeof uploadPaymentFile>>({
		resolver: zodResolver(uploadPaymentFile),
		defaultValues: {
			attachment: null,
		},
	})

	const onSubmit = async (values: z.infer<typeof uploadPaymentFile>) => {
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

	const cancelReservation = async () => {
		await apiCancelReservation(params.id.toString(), {
			_method: 'put',
			status: 'canceledByUser',
		})
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
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-4'
				>
					<CustomUpload form={form} name='attachment' urlImage={urlImage} />
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
									type='button'
									disabled={!disabledCancel}
									onClick={cancelReservation}
									className='w-full bg-rose-400 rounded-full hover:bg-opacity-80 py-6 sm:text-lg hover:bg-rose-400'
								>
									Cancel reservation
								</Button>
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
			{disabledCancel && <CountdownTimer expiredTime={expiredTime} />}
		</div>
	)
}

export default UploadPayment
