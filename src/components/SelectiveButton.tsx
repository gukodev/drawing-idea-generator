'use client'
import { useAudio } from '@/contexts/AudioContext'
import { twMerge } from 'tailwind-merge'
import Button, { ButtonProps, getAccentColor } from './Button'

type ExtendedButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
interface SelectiveButtonProps extends ExtendedButtonProps {
    selected?: boolean
}

export default function SelectiveButton({
    children,
    selected = false,
    accent = 'purple',
    onClick,
    ...rest
}: SelectiveButtonProps) {
    const color = getAccentColor(accent)
    const { play } = useAudio()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!selected) play('poin')
        if (onClick) onClick(e)
    }

    return (
        <Button
            {...rest}
            className={twMerge(
                selected
                    ? `${color} opacity-100`
                    : 'bg-slate-200 border-slate-300 text-slate-400 enabled:hover:bg-slate-200 enabled:hover:border-slate-300 opacity-50'
            )}
            noAudio
            onClick={handleClick}
        >
            {children}
        </Button>
    )
}
