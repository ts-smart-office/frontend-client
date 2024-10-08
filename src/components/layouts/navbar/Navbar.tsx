import { FC } from 'react'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'
import { getUser } from '@/lib/actions'

const Navbar: FC = async () => {
	const userSession = await getUser()

	return (
		<nav className='z-20 bg-white md:sticky md:top-0 md:shadow-none font-urbanist'>
			<DesktopNav userSession={userSession} />
			<MobileNav userSession={userSession} />
		</nav>
	)
}

export default Navbar
