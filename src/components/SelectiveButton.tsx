'use client'
import { useAudio } from '@/contexts/AudioContext'
import { twMerge } from 'tailwind-merge'

interface SelectiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    selected?: boolean
    accent?: 'purple' | 'red'
}

const colorAccents = {
    purple: 'bg-purple-400 border-purple-500 text-white',
    red: 'bg-red-400 border-red-500 text-white',
}

export default function SelectiveButton({
    children,
    selected = false,
    accent = 'purple',
    onClick,
    ...rest
}: SelectiveButtonProps) {
    const colorAccent = colorAccents[accent]
    const { play } = useAudio()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!selected) play('poin')
        if (onClick) onClick(e)
    }

    return (
        <button
            {...rest}
            className={twMerge(
                'inline-flex items-center justify-center rounded-xl py-1.5 px-4 border-2', // general
                'leading-none font-sans font-medium text-lg select-none', // font/text
                'transition-colors ease-out', // transition
                selected ? colorAccent : 'hover:bg-slate-300 hover:border-slate-400 opacity-50' // color
            )}
            onClick={handleClick}
        >
            {children}
        </button>
    )
}
