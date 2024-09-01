export const metadata = {
	title: "Redirecting",
	description: "Redirecting page",
	verification: {
		google: "uNyjdlGK0DkCDOf3ydqwwGis_NtL4iI8wWTxDfrjca8",
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	)
}
