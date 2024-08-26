import type { Metadata } from 'next'
import '../globals.css'
import { fontQuestrial, fontUrbanist } from '@/utils/font'
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
			<body className={`${fontUrbanist.variable} ${fontQuestrial.variable}`}>
				{children}
				<Toaster />
			</body>
		</html>
	)
}
