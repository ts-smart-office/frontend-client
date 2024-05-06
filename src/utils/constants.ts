export const navMenu = [
	{ href: '/', label: 'Home' },
	{ href: '#features', label: 'Features' },
	{ href: '#rooms', label: 'Rooms' },
	{ href: '#news', label: 'News' },
]

export const listRooms = [
	{
		id: ~~(Math.random() * 100) + 1,
		name: 'Meeting Room',
		location: 'Laweyan, Surakarta',
		price: [30, 60],
		isPodcast: false,
		urlDetails: '/room/meeting-room',
	},
	{
		id: ~~(Math.random() * 100) + 1,
		name: 'Amphitheater',
		location: 'Laweyan, Surakarta',
		price: [30, 60],
		isPodcast: false,
		urlDetails: '/room/amphitheater',
	},
	{
		id: ~~(Math.random() * 100) + 1,
		name: 'Podcast Studio',
		location: 'Laweyan, Surakarta',
		price: [150, 200],
		isPodcast: true,
		urlDetails: '/room/podcast',
	},
]

export const featuresContent = [
	{
		iconPath: '/icons/calendar.png',
		title: 'Effortless Reservation',
		subtitle:
			'Seamless booking an intuitive interface and calendar integration.',
	},
	{
		iconPath: '/icons/eye.png',
		title: 'Real-time Availability',
		subtitle:
			'Seamless booking an intuitive interface and calendar integration.',
	},
	{
		iconPath: '/icons/news.png',
		title: 'News Hub for Updates',
		subtitle:
			'Seamless booking an intuitive interface and calendar integration.',
	},
]

export const facilities = [
	'Maximum Capacity 100',
	'LCD Interactive 70',
	'High Lumen Projector',
	'AC',
	'Free Access Wifi',
	'Integrate Digital Ecosystem Tiga Serangkai',
]
