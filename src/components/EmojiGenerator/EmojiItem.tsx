import { choose } from '@/util/common'
import { useMouse } from '@uidotdev/usehooks'
import { gemoji } from 'gemoji'
import { useEffect, useState } from 'react'
import Twemoji from 'react-twemoji'
import { twMerge } from 'tailwind-merge'

interface EmojiItemProps {
    rolling: boolean
    emojis: string[]
}

interface NameProps {
    text: string
    show: boolean
    x: number
    y: number
}

function Name({ text, show, x, y }: NameProps) {
    return (
        <div
            className={twMerge(
                'fixed z-10 rounded-lg p-1 leading-none pointer-events-none select-none',
                'text-sm text-slate-200 border-[1px] border-slate-500 bg-slate-700',
                'transition-opacity duration-100',
                show ? 'opacity-100' : 'opacity-0'
            )}
            style={{
                left: `${x}px`,
                top: `${y}px`,
            }}
        >
            {text}
        </div>
    )
}

function getEmojiDescription(emoji: string) {
    const emojiObj = gemoji.find((item) => item.emoji === emoji)
    return emojiObj?.description || ''
}

export function EmojiItem({ rolling, emojis }: EmojiItemProps) {
    const defaultEmoji = '❓'
    const [emoji, setEmoji] = useState<string>(defaultEmoji)

    const [mouse] = useMouse()
    const [hovered, setHovered] = useState<boolean>(false)

    useEffect(() => {
        if (!rolling) return

        const interval = setInterval(() => {
            const emoji = choose(emojis)
            setEmoji(emoji)
        }, 50)
        return () => clearInterval(interval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rolling])

    return (
        <>
            <Name
                text={getEmojiDescription(emoji)}
                show={hovered && getEmojiDescription(emoji).length > 0}
                x={mouse.x + 15}
                y={mouse.y + 20}
            />
            <div
                className={twMerge(
                    'inline-flex items-center justify-center leading-none select-none text-5xl w-32 h-32 rounded-xl',
                    'border-2 border-slate-300',
                    'bg-white'
                )}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <Twemoji>{emoji}</Twemoji>
            </div>
        </>
    )
}
