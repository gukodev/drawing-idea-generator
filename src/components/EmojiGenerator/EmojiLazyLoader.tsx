'use client'
import { Transition } from '@headlessui/react'
import { CircleNotch } from '@phosphor-icons/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import Twemoji from 'react-twemoji'

interface EmojiLazyLoaderProps {
    emojis: string[]
    children: React.ReactNode
}

function Loading({ show }: { show: boolean }) {
    return (
        <Transition
            show={show}
            appear={true}
            enter='transition-all duration-300 ease-out'
            leave='transition-all duration-300 ease-in'
            enterFrom='opacity-0 translate-y-2'
            enterTo='opacity-100 translate-y-0'
            leaveFrom='opacity-100 translate-y-2'
            leaveTo='opacity-0 -translate-y-2'
            className='w-full flex items-center justify-center gap-2 text-slate-400'
        >
            <CircleNotch size={32} weight='bold' className='animate-spin' />
            <span className='text-xl font-medium max-w-72'>loading emojis</span>
        </Transition>
    )
}

export default function EmojiLazyLoader({ emojis, children }: EmojiLazyLoaderProps) {
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const toLoad = emojis.length
    const loaded = useRef<number>(0)
    const [loadedAll, setLoadedAll] = useState<boolean>(false)
    const [showChildren, setShowChildren] = useState<boolean>(false)

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

    useEffect(() => {
        if (!loadedAll) return
        setTimeout(() => {
            setShowChildren(true)
        }, 350)
    }, [loadedAll])

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
            <Loading show={!loadedAll} />
            <Transition
                show={showChildren}
                enter='transition-opacity duration-300 ease-out'
                leave='transition-opacity duration-300 ease-out'
                enterFrom='opacity-0'
                leaveTo='opacity-0'
                enterTo='opacity-100'
                leaveFrom='opacity-100'
                as={Fragment}
            >
                {children}
            </Transition>
        </>
    )
}
