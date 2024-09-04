import { FC } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const HeroSection: FC = () => {
	return (
		<div className="w-full flex flex-col justify-center gap-10 sm:gap-14">
			<div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-end pt-24 lg:pt-[88px] lg:py-6 gap-4">
				<h1 className="text-4xl leading-snug md:text-6xl md:leading-snug lg:text-[44px] lg:leading-[64px] xl:text-6xl xl:leading-snug font-semibold font-urbanist">
					Ekosistem Kerja Digital, <br />
					Untuk Lompatan <br />{" "}
					<span className="text-greenBrand">Produktivitas</span> Anda
				</h1>
				<div className="flex flex-col max-w-96 gap-4 xl:gap-11">
					<p className="font-questrial text-base text-muted-foreground">
						Maksimalkan kolaborasi tim Anda dengan layanan ruangan terbaik dari
						kami. Dapatkan update informasi terkini tentang pesanan Anda,
						kapanpun dan dari manapun.
					</p>
					<Button
						className="bg-greenBrand font-urbanist h-14 rounded-full w-2/3 text-base hover:bg-opacity-80 hover:bg-greenBrand"
						size={"lg"}
					>
						Pesan Ruangan Sekarang
					</Button>
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<div className="w-fit flex items-center justify-center gap-2 font-urbanist text-base font-medium p-2 border border-greyMuted rounded-full">
					<div className="bg-greenBrand py-1 px-3 text-white rounded-full">
						Baru
					</div>
					<div className="text-greyMuted">
						Ikon Digital Workspace di Surakarta
					</div>
				</div>
				<div className="w-full grid grid-cols-12 gap-3 lg:gap-6">
					<div className="col-span-5 xl:col-span-3">
						<div className="relative w-full h-40 md:h-[360px] rounded-2xl">
							<Image
								src="/banner-2.jpg"
								alt="banner-1"
								fill
								className="absolute w-full h-full object-cover rounded-2xl"
							/>
						</div>
					</div>
					<div className="xl:col-span-4 col-span-7">
						<div className="relative w-full h-40 md:h-[360px] rounded-2xl">
							<Image
								src="/banner-3.jpg"
								alt="banner-1"
								fill
								className="absolute w-full h-full object-cover rounded-2xl"
							/>
						</div>
					</div>
					<div className="xl:col-span-5 col-span-12">
						<div className="relative w-full h-60 md:h-[360px] rounded-2xl">
							<Image
								src="/banner-1.jpg"
								alt="banner-1"
								fill
								className="absolute w-full h-full object-cover rounded-2xl"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HeroSection
