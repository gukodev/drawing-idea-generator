'use client'
import { useAudio } from '@/contexts/AudioContext'
import { onClickWithAudio } from '@/util/audio'
import { twMerge } from 'tailwind-merge'

const colorAccents = {
    ghost: 'bg-transparent border-transparent text-gray-400 enabled:hover:bg-gray-300/50 enabled:hover:text-gray-500',
    gray: 'bg-gray-400 border-gray-500 text-white enabled:hover:bg-gray-300 enabled:hover:border-gray-400',
    red: 'bg-red-400 border-red-500 text-white enabled:hover:bg-red-300 enabled:hover:border-red-400',
    pink: 'bg-pink-400 border-pink-500 text-white enabled:hover:bg-pink-300 enabled:hover:border-pink-400',
    purple: 'bg-purple-400 border-purple-500 text-white enabled:hover:bg-purple-300 enabled:hover:border-purple-400',
    blue: 'bg-blue-400 border-blue-500 text-white enabled:hover:bg-blue-300 enabled:hover:border-blue-400',
    teal: 'bg-teal-400 border-teal-500 text-white enabled:hover:bg-teal-300 enabled:hover:border-teal-400',
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
                'transition-all duration-200 ease-out', // transition
                color, // color
                'disabled:opacity-50 disabled:cursor-not-allowed', // disabled
                className // custom
            )}
            onClick={noAudio ? onClick : onClickWithAudio({ play, onClick })}
        >
            {children}
        </button>
    )
}
