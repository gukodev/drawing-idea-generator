'use client'
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
    ...rest
}: SelectiveButtonProps) {
    const colorAccent = colorAccents[accent]

    return (
        <button
            {...rest}
            className={twMerge(
                'inline-flex items-center justify-center leading-none rounded-xl py-1.5 px-4 border-2',
                'font-sans font-bold text-lg',
                'transition-colors ease-out',
                selected ? colorAccent : 'hover:bg-slate-300 hover:border-slate-400 opacity-50'
            )}
        >
            {children}
        </button>
    )
}
