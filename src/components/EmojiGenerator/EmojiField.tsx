'use client'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
// @ts-ignore - no types
import randomEmoji from 'random-unicode-emoji'

interface EmojiItemProps {
    rolling: boolean
}
function EmojiItem({ rolling }: EmojiItemProps) {
    const defaultEmoji = '❓'
    const [text, setText] = useState<string>(defaultEmoji)

    useEffect(() => {
        if (!rolling) return

        const interval = setInterval(() => {
            const emoji = randomEmoji.random({ count: 1 })[0]
            setText(emoji)
        }, 50)
        return () => clearInterval(interval)
    }, [rolling])

    return (
        <div
            className={twMerge(
                'inline-flex items-center justify-center leading-none select-none text-5xl w-32 h-32 rounded-xl',
                'border-2 border-slate-300',
                'bg-slate-200'
            )}
        >
            {text}
        </div>
    )
}

interface EmojiFieldProps {
    num: number
    rolling: boolean
}
export default function EmojiField({ num, rolling }: EmojiFieldProps) {
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='flex items-center justify-center gap-4 flex-wrap'>
                {Array.from({ length: num }).map((_, i) => (
                    <EmojiItem key={i} rolling={rolling} />
                ))}
            </div>
        </div>
    )
}
