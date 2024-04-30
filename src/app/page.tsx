import AboutUs from '@/components/home-page/AboutUs'
import HeroSection from '@/components/home-page/HeroSection'
import SubscriptionSection from '@/components/home-page/subscription/SubscriptionSection'
import FeaturesSection from '@/components/home-page/features/FeaturesSection'
import NewsSection from '@/components/home-page/news/NewsSection'
import RoomSection from '@/components/home-page/rooms/RoomSection'
import Footer from '@/components/layouts/Footer'

export default function Home() {
	return (
		<main className='w-full'>
			<section className='px-4 lg:px-20 2xl:max-w-[1600px] 2xl:mx-auto flex flex-col justify-center'>
				<HeroSection />
			</section>
			<section className='px-4 lg:px-20 2xl:max-w-[1600px] 2xl:mx-auto flex flex-col justify-center'>
				<FeaturesSection />
			</section>
			<section className='px-4 lg:px-20 2xl:max-w-[1600px] 2xl:mx-auto flex flex-col justify-center'>
				<AboutUs />
			</section>
			<section className='bg-blue-50 flex flex-col justify-center mt-32'>
				<RoomSection />
			</section>
			<section className='px-4 lg:px-20 2xl:max-w-[1600px] 2xl:mx-auto flex flex-col justify-center'>
				<NewsSection />
			</section>
			<section className='bg-blue-50 flex flex-col justify-center'>
				<SubscriptionSection />
			</section>
			<footer className='px-4 lg:px-20 2xl:max-w-[1600px] 2xl:mx-auto flex flex-col justify-center'>
				<Footer />
			</footer>
		</main>
	)
}
