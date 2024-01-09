'use client'
import { useAudio } from '@/contexts/AudioContext'
import { onClickWithAudio } from '@/util/audio'
import { twMerge } from 'tailwind-merge'

interface AlterButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    disabled?: boolean
}
export default function AlterButton({ children, onClick, ...rest }: AlterButtonProps) {
    const { play } = useAudio()
    return (
        <button
            className={twMerge(
                'inline-flex items-center justify-center w-6 h-4 rounded-md',
                'transition-all duration-200 ease-out',
                'font-bold bg-slate-200 text-slate-500 hover:bg-slate-300',
                'disabled:bg-slate-300 disabled:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed'
            )}
            onClick={onClickWithAudio({ play, onClick })}
            {...rest}
        >
            {children}
        </button>
    )
}
