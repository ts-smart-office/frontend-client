'use client'
import { FC } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { subscriptionSchema } from '@/utils/form-schema'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const FormSubscription: FC = () => {
	const form = useForm<z.infer<typeof subscriptionSchema>>({
		resolver: zodResolver(subscriptionSchema),
	})

	const onSubmit = (values: z.infer<typeof subscriptionSchema>) => {
		console.log(values)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='w-full max-w-4xl flex flex-col md:flex-row justify-center gap-2 lg:gap-8 max-md:px-4'
			>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem className='flex-1'>
							<FormControl>
								<Input
									placeholder='Isi alamat email Anda'
									{...field}
									className='rounded-full focus-visible:ring-0 focus-visible:border-greenBrand text-base lg:text-lg lg:py-6 px-4'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					className='bg-greenBrand self-center rounded-full w-fit px-8 lg:py-6 text-lg hover:bg-opacity-80 hover:bg-greenBrand'
				>
					Berlangganan Sekarang
				</Button>
			</form>
		</Form>
	)
}

export default FormSubscription
