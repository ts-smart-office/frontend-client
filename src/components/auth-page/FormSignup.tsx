"use client"
import { FC, useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { signupSchema } from "@/utils/form-schema"
import Link from "next/link"
import { apiCsrfToken, apiRegister } from "@/api/authApi"
import { useToast } from "../ui/use-toast"
import { useRouter } from "next/navigation"
import { handleUser } from "@/lib/actions"
import ReCAPTCHA from "react-google-recaptcha"

const FormSignup: FC = () => {
	const form = useForm<z.infer<typeof signupSchema>>({
		resolver: zodResolver(signupSchema),
	})

	const router = useRouter()
	const { toast } = useToast()
	const [loadBtn, setLoadBtn] = useState<boolean>(false)
	const [captchaVerify, setCaptchaVerify] = useState<string | null>()

	const onSubmit = async (values: z.infer<typeof signupSchema>) => {
		const bodyRegister = {
			name: values.name,
			email: values.email,
			company: values.company,
			phone: values.phone,
			password: values.password,
			password_confirmation: values.password_confirmation,
			"g-recaptcha-response": captchaVerify,
		}
		if (captchaVerify) {
			setLoadBtn(true)
			await apiCsrfToken()
			await apiRegister(bodyRegister)
				.then(res => {
					const { id, name, email, role } = res.data.user
					handleUser({ id, name, email, role })
					toast({
						description: res.data.message,
					})
					setTimeout(function () {
						router.push("/")
					}, 1000)
				})
				.catch(error => {
					if (error.response) {
						toast({
							description: error.response.data.message,
						})
					}
				})
				.finally(() => setLoadBtn(false))
		} else {
			toast({
				description: "Please verify youre human!",
			})
		}
	}

	const redirectGoogle = () => {
		window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/redirect`
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-base lg:text-lg">Full name</FormLabel>
							<FormControl>
								<Input
									placeholder="Fill your fullname"
									{...field}
									className="border-2 rounded-full border-darkColor focus-visible:ring-0 focus-visible:border-greenBrand text-base lg:text-lg lg:py-6 px-4"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="company"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-base lg:text-lg">
								Company/Institute
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Fill your institute/company"
									{...field}
									className="border-2 rounded-full border-darkColor focus-visible:ring-0 focus-visible:border-greenBrand text-base lg:text-lg lg:py-6 px-4"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-base lg:text-lg">
								Email address
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Fill your email address"
									{...field}
									className="border-2 rounded-full border-darkColor focus-visible:ring-0 focus-visible:border-greenBrand text-base lg:text-lg lg:py-6 px-4"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-base lg:text-lg">Phone</FormLabel>
							<FormControl>
								<Input
									placeholder="Fill your phone number"
									{...field}
									className="border-2 rounded-full border-darkColor focus-visible:ring-0 focus-visible:border-greenBrand text-base lg:text-lg lg:py-6 px-4"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-base lg:text-lg">Password</FormLabel>
							<FormControl>
								<Input
									placeholder="Fill your password"
									type="password"
									{...field}
									className="border-2 rounded-full border-darkColor focus-visible:ring-0 focus-visible:border-greenBrand text-base lg:text-lg lg:py-6 px-4"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password_confirmation"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-base lg:text-lg">
								Confirm Password
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Fill your password"
									type="password"
									{...field}
									className="border-2 rounded-full border-darkColor focus-visible:ring-0 focus-visible:border-greenBrand text-base lg:text-lg lg:py-6 px-4"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<p className="text-center">Or</p>
				<Button
					type="button"
					onClick={redirectGoogle}
					className="text-darkColor bg-greyMuted/20 rounded-full w-full py-6 text-lg hover:bg-opacity-80 hover:bg-greyMuted/20"
				>
					Google
				</Button>
				<div className="lg:text-lg">
					Sudah punya akun?{" "}
					<span className="font-medium text-greenBrand">
						<Link href="/signin">Sign in</Link>
					</span>
				</div>
				<div className="flex items-center gap-8 pt-4">
					<ReCAPTCHA
						sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
						className="mx-auto"
						onChange={setCaptchaVerify}
					/>
					<Button
						type="submit"
						disabled={loadBtn}
						className={`bg-greenBrand rounded-full w-2/3 lg:w-1/2 py-6 text-lg hover:bg-opacity-80 hover:bg-greenBrand ${
							loadBtn ? "opacity-50 cursor-not-allowed" : ""
						}`}
					>
						{loadBtn ? "Signing up..." : "Sign up"}
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default FormSignup
