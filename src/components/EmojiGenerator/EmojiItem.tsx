import { choose } from '@/util/common'
import { getEmojiName } from '@/util/emojis'
import { useMouse } from '@uidotdev/usehooks'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import Twemoji from 'react-twemoji'
import { twMerge } from 'tailwind-merge'
import Tooltip from './Tooltip'

interface EmojiItemProps {
    rolling: boolean
    emojis: string[]
}

export function EmojiItem({ rolling, emojis }: EmojiItemProps) {
    const defaultEmoji = '❓'
    const [emoji, setEmoji] = useState<string>(defaultEmoji)
    const emojiRef = useRef<HTMLDivElement | null>(null)

    const [mouse] = useMouse()
    const [hovered, setHovered] = useState<boolean>(false)

    const isDefaultEmoji = emoji === defaultEmoji
    const emojiName = getEmojiName(emoji)

    const handleEmojiClick = () => {
        if (isDefaultEmoji) return
        navigator.clipboard
            .writeText(emoji)
            .then(() => {
                toast.success('copied to clipboard!')
            })
            .catch(() => {
                toast.error('failed to copy to clipboard!')
            })
    }

    const handleEmojiWheelClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.button !== 1) return
        if (isDefaultEmoji || !emojiName) return

        e.preventDefault()

        const slug = emojiName.replace(/ /g, '-')
        const tab = window.open(`https://emojipedia.org/${slug}/`)
        tab?.focus()
    }

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
            <Tooltip
                text={emojiName || '?'}
                show={hovered && emojiName !== null && !isDefaultEmoji}
                x={mouse.x + 15}
                y={mouse.y + 20}
            />
            <div
                className={twMerge(
                    'inline-flex items-center justify-center leading-none select-none',
                    'text-5xl w-32 h-32 rounded-xl',
                    'border-2 border-slate-300 bg-white',
                    emoji !== defaultEmoji ? 'cursor-pointer' : 'cursor-default'
                )}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={handleEmojiClick}
                onAuxClick={handleEmojiWheelClick}
                ref={emojiRef}
            >
                <span
                    className={twMerge(
                        'transition-all ease-out duration-200',
                        hovered && !isDefaultEmoji ? 'transform scale-90' : 'transform scale-100'
                    )}
                >
                    <Twemoji>{emoji}</Twemoji>
                </span>
            </div>
        </>
    )
}
