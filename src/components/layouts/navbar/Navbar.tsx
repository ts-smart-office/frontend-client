import { FC } from 'react'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'
import { getUser } from '@/utils/actions'

const Navbar: FC = async () => {
	const user = await getUser()
	return (
		<nav className='z-20 bg-white md:sticky md:top-0 md:shadow-none font-urbanist'>
			<DesktopNav user={user} />
			<MobileNav />
		</nav>
	)
}

export default Navbar
