/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'tssora.s3.amazonaws.com',
			},
		],
	},
}

export default nextConfig
