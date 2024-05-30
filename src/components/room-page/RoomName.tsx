import { FC } from 'react'

type TRoomName = {
	name: string
}

const RoomName: FC<TRoomName> = ({ name }) => {
	return <h1 className='font-semibold text-5xl'>{name}</h1>
}

export default RoomName
