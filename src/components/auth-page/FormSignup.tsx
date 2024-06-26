'use client'
import { FC } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '../ui/button'
import { signupSchema } from '@/utils/form-schema'
import Link from 'next/link'

const FormSignup: FC = () => {
	const form = useForm<z.infer<typeof signupSchema>>({
		resolver: zodResolver(signupSchema),
	})

	const onSubmit = (values: z.infer<typeof signupSchema>) => {
		console.log(values)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
				<FormField
					control={form.control}
					name='fullname'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-base lg:text-lg'>Full name</FormLabel>
							<FormControl>
								<Input
									placeholder='Fill your fullname'
									{...field}
									className='border-2 rounded-full border-darkColor focus-visible:ring-0 focus-visible:border-greenBrand text-base lg:text-lg lg:py-6 px-4'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='company'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-base lg:text-lg'>
								Company/Institute
							</FormLabel>
							<FormControl>
								<Input
									placeholder='Fill your institute/company'
									{...field}
									className='border-2 rounded-full border-darkColor focus-visible:ring-0 focus-visible:border-greenBrand text-base lg:text-lg lg:py-6 px-4'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-base lg:text-lg'>
								Email address
							</FormLabel>
							<FormControl>
								<Input
									placeholder='Fill your email address'
									{...field}
									className='border-2 rounded-full border-darkColor focus-visible:ring-0 focus-visible:border-greenBrand text-base lg:text-lg lg:py-6 px-4'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='phone'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-base lg:text-lg'>Phone</FormLabel>
							<FormControl>
								<Input
									placeholder='Fill your phone number'
									{...field}
									className='border-2 rounded-full border-darkColor focus-visible:ring-0 focus-visible:border-greenBrand text-base lg:text-lg lg:py-6 px-4'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-base lg:text-lg'>Password</FormLabel>
							<FormControl>
								<Input
									placeholder='Fill your password'
									type='password'
									{...field}
									className='border-2 rounded-full border-darkColor focus-visible:ring-0 focus-visible:border-greenBrand text-base lg:text-lg lg:py-6 px-4'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='lg:text-lg'>
					Already have an account?{' '}
					<span className='font-medium text-greenBrand'>
						<Link href='/signin'>Sign in</Link>
					</span>
				</div>
				<div className='flex justify-center pt-4'>
					<Button
						type='submit'
						className='bg-greenBrand rounded-full w-1/2 py-6 text-lg hover:bg-opacity-80 hover:bg-greenBrand'
					>
						Sign up
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default FormSignup
