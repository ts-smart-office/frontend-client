'use client'
import { uploadPaymentFile } from '@/utils/form-schema'
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
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const UploadPayment: FC = () => {
	const form = useForm<z.infer<typeof uploadPaymentFile>>({
		resolver: zodResolver(uploadPaymentFile),
		defaultValues: {
			paymentFile: null,
		},
	})

	const onSubmit = (values: z.infer<typeof uploadPaymentFile>) => {
		console.log(values)
	}

	return (
		<div className='w-full flex flex-col'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-4'
				>
					<FormField
						control={form.control}
						name='paymentFile'
						render={({ field: { onChange }, ...field }) => (
							<FormItem>
								<FormLabel className='font-semibold text-2xl'>
									Upload payment
								</FormLabel>
								<FormControl>
									<Input
										size={100}
										type='file'
										placeholder='Upload your payment here'
										onChange={e => {
											if (!e.target.value) return
											onChange(e.target.files?.[0])
										}}
										className='w-full rounded-full'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='flex gap-6'>
						<Button
							type='submit'
							disabled
							className='w-full bg-rose-400 rounded-full hover:bg-opacity-80 py-6 sm:text-lg hover:bg-greenBrand'
						>
							Cancel reservation
						</Button>
						<Button
							type='submit'
							className='w-full bg-greenBrand rounded-full hover:bg-opacity-80 py-6 sm:text-lg hover:bg-greenBrand'
						>
							Make reservation
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default UploadPayment
