'use client'
import { useEffect, useRef, useState } from 'react'
import Twemoji from 'react-twemoji'

interface EmojiLazyLoaderProps {
    emojis: string[]
    children: React.ReactNode
}

export default function EmojiLazyLoader({ emojis, children }: EmojiLazyLoaderProps) {
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const toLoad = emojis.length
    const loaded = useRef<number>(0)

    const [loadedAll, setLoadedAll] = useState<boolean>(false)

    useEffect(() => {
        if (!wrapperRef.current) return

        wrapperRef.current.childNodes.forEach((node) => {
            const span = node as HTMLSpanElement
            const img = span.querySelector('img')
            if (!img) return
            img.onload = () => {
                loaded.current += 1
                if (loaded.current === toLoad) {
                    setLoadedAll(true)
                    wrapperRef.current?.remove()
                }
            }
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div
                className='absolute top-0 left-0 w-[1px] h-[1px] opacity-0 overflow-hidden flex flex-wrap'
                ref={wrapperRef}
            >
                <Twemoji noWrapper>
                    {emojis.map((emoji, i) => (
                        <span key={i}>{emoji}</span>
                    ))}
                </Twemoji>
            </div>
            {loadedAll && children}
        </>
    )
}
