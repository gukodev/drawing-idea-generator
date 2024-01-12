'use client'
import { EmojiItem } from './EmojiItem'

interface EmojiFieldProps {
    num: number
    rolling: boolean
    emojis: string[]
}

export default function EmojiField({ num, rolling, emojis }: EmojiFieldProps) {
    return (
        <>
            <div className='w-full flex items-center justify-center'>
                <div className='flex items-center justify-center gap-4 flex-wrap'>
                    {Array.from({ length: num }).map((_, i) => (
                        <EmojiItem key={i} rolling={rolling} emojis={emojis} />
                    ))}
                </div>
            </div>
        </>
    )
}
