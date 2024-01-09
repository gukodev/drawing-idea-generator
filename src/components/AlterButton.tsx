'use client'
import { useAudio } from '@/contexts/AudioContext'
import { onClickWithAudio } from '@/util/audio'
import { twMerge } from 'tailwind-merge'

interface AlterButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}
export default function AlterButton({ children, onClick, ...rest }: AlterButtonProps) {
    const { play } = useAudio()
    return (
        <button
            className={twMerge(
                'inline-flex items-center justify-center w-6 h-4 rounded-md',
                'transition-colors duration-200 ease-out',
                'font-bold bg-slate-200 text-slate-500 hover:bg-slate-300'
            )}
            onClick={(e) => onClickWithAudio(play, { onClick, e })}
            {...rest}
        >
            {children}
        </button>
    )
}
