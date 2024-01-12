import { choose } from '@/util/common'
import { useEffect, useState } from 'react'
import Twemoji from 'react-twemoji'
import { twMerge } from 'tailwind-merge'

interface EmojiItemProps {
    rolling: boolean
    emojis: string[]
}

export function EmojiItem({ rolling, emojis }: EmojiItemProps) {
    const defaultEmoji = '❓'
    const [text, setText] = useState<string>(defaultEmoji)

    useEffect(() => {
        if (!rolling) return

        const interval = setInterval(() => {
            const emoji = choose(emojis)
            setText(emoji)
        }, 50)
        return () => clearInterval(interval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rolling])

    return (
        <div
            className={twMerge(
                'inline-flex items-center justify-center leading-none select-none text-5xl w-32 h-32 rounded-xl',
                'border-2 border-slate-300',
                'bg-white'
            )}
        >
            <Twemoji>{text}</Twemoji>
        </div>
    )
}
