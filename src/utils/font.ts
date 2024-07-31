import { Questrial, Urbanist, Manrope, Roboto } from 'next/font/google'

export const fontUrbanist = Manrope({
	subsets: ['latin'],
	variable: '--font-urbanist',
})

export const fontQuestrial = Roboto({
	subsets: ['latin'],
	weight: '400',
	variable: '--font-questrial',
})
