import { FC } from 'react'
import RoomPage from './Details'
import { getUser } from '@/lib/actions'

const page: FC = async () => {
	const userSession = await getUser()

	return <RoomPage userSession={userSession} />
}

export default page
