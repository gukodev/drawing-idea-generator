'use client'
import { useAudio } from '@/contexts/AudioContext'
import { onClickWithAudio } from '@/util/audio'
import { twMerge } from 'tailwind-merge'

const colorAccents = {
    purple: 'bg-purple-400 border-purple-500 text-white hover:bg-purple-300 hover:border-purple-400',
    red: 'bg-red-400 border-red-500 text-white hover:bg-red-300 hover:border-red-400',
    gray: 'bg-gray-400 border-gray-500 text-white hover:bg-gray-300 hover:border-gray-400',
    ghost: 'bg-transparent border-transparent text-gray-400 hover:bg-gray-300/50 hover:text-gray-500',
    pink: 'bg-pink-400 border-pink-500 text-white hover:bg-pink-300 hover:border-pink-400',
    blue: 'bg-blue-400 border-blue-500 text-white hover:bg-blue-300 hover:border-blue-400',
} as const
type ColorAccent = keyof typeof colorAccents

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    accent?: ColorAccent
    noAudio?: boolean
}

export function getAccentColor(accent: ColorAccent) {
    return colorAccents[accent]
}

export default function Button({
    children,
    accent = 'purple',
    onClick,
    className,
    noAudio = false,
    ...rest
}: ButtonProps) {
    const color = getAccentColor(accent)
    const { play } = useAudio()

    return (
        <button
            {...rest}
            className={twMerge(
                'inline-flex items-center justify-center rounded-xl py-1.5 px-4 border-2', // general
                'leading-none font-sans font-medium text-lg select-none', // font/text
                'transition-colors duration-200 ease-out', // transition
                color, // color
                className // custom
            )}
            onClick={noAudio ? onClick : onClickWithAudio({ play, onClick })}
        >
            {children}
        </button>
    )
}
