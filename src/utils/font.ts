import { Questrial, Urbanist } from 'next/font/google'

export const fontUrbanist = Urbanist({
	subsets: ['latin'],
	variable: '--font-urbanist',
})

export const fontQuestrial = Questrial({
	subsets: ['latin'],
	weight: '400',
	variable: '--font-questrial',
})
