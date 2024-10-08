import FormSignup from "@/components/auth-page/FormSignup"
import { getUser } from "@/lib/actions"
import Image from "next/image"
import { redirect } from "next/navigation"
import { FC } from "react"

const page: FC = async () => {
	const user = await getUser()
	if (user) {
		return redirect("/")
	}

	return (
		<section className="flex w-full max-w-screen-2xl mx-auto min-h-screen items-stretch justify-center p-4 lg:p-8 font-urbanist">
			<div className="w-full grid grid-cols-4 md:grid-cols-12 gap-6">
				<div className="hidden md:col-span-7 md:flex h-full flex-col justify-between bg-blue-50 p-8 rounded-lg">
					<h1 className="md:text-4xl lg:text-6xl font-semibold">
						Mari Berkolaborasi!
					</h1>
					<div className="relative w-full h-96">
						<Image
							src={"/banner-auth.jpg"}
							alt="banner-auth"
							fill
							className="absolute w-full h-full object-cover rounded-md"
						/>
					</div>
				</div>
				<div className="col-span-4 md:col-span-5 flex items-center">
					<div className="w-full flex flex-col gap-6 lg:gap-2 lg:px-10">
						<h2 className="font-semibold text-5xl text-center">
							<span className="text-greenBrand">Smart</span>Office.
						</h2>
						<div className="flex flex-col lg:gap-2">
							<p className="font-medium text-2xl lg:text-3xl text-center">
								Buat akun baru
							</p>
							<FormSignup />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default page
