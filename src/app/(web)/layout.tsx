import type { Metadata } from 'next'
import '../globals.css'
import { fontQuestrial, fontUrbanist } from '@/utils/font'
import Navbar from '@/components/layouts/navbar/Navbar'
import Footer from '@/components/layouts/Footer'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
	title: 'SMART Office',
	description: 'SMART Office Website',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`w-full ${fontUrbanist.variable} ${fontQuestrial.variable} bg-[#F9F9F9]`}
			>
				<Navbar />
				{children}
				<footer className='px-4 lg:px-20 2xl:max-w-[1600px] 2xl:mx-auto flex flex-col justify-center'>
					<Footer />
				</footer>
				<Toaster />
			</body>
		</html>
	)
}
