'use client'
import { clamp } from '@/util/common'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Button from '../Button'
import AlterButton from './AlterButton'
import EmojiField from './EmojiField'
import EmojiLazyLoader from './EmojiLazyLoader'

const MAX_NUM = 5
const MIN_NUM = 1
const DEFAULT_NUM = 3

interface EmojiGeneratorProps {
    emojis: string[]
}

export default function EmojiGenerator({ emojis }: EmojiGeneratorProps) {
    const [inputError, setInputError] = useState<boolean>(false)
    const [num, setNum] = useState<number>(DEFAULT_NUM)
    const [rolling, setRolling] = useState<boolean>(false)
    const canGenerate = !inputError && !rolling

    const validateInput = (num: number) => {
        if (num < MIN_NUM || num > MAX_NUM) return false
        return true
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const parsed = parseInt(value)
        setNum(parsed)
    }

    const handleIncrement = () => {
        setNum((prev) => {
            const n = (prev || 1) + 1
            if (!validateInput(n)) return prev
            return n
        })
    }

    const handleDecrement = () => {
        setNum((prev) => {
            const n = (prev || 1) - 1
            if (n <= 0) return prev
            return n
        })
    }

    useEffect(() => {
        if (!validateInput(num)) {
            setInputError(true)
            return
        }
        setInputError(false)
    }, [num])

    const handleGenerate = () => {
        if (inputError) return
        setRolling(true)
        setTimeout(() => {
            setRolling(false)
        }, 1000)
    }

    return (
        <>
            <div className='flex flex-col gap-20'>
                <div className='w-full flex items-center justify-center'>
                    <div className='flex items-center gap-4'>
                        <span className='font-medium select-none text-xl text-slate-500'>
                            number of emojis
                        </span>
                        <div className='flex items-center gap-1'>
                            <input
                                type='number'
                                min={MIN_NUM}
                                max={MAX_NUM}
                                value={num}
                                onChange={handleInputChange}
                                placeholder={DEFAULT_NUM.toString()}
                                className={twMerge(
                                    'w-16 p-1 rounded-xl',
                                    'transition-colors duration-200 ease-out',
                                    'border-2 border-slate-300',
                                    'text-xl text-center text-slate-600',
                                    'focus:outline-none focus:border-slate-400',
                                    inputError && 'border-red-300 focus:border-red-300'
                                )}
                            />
                            <div className='flex flex-col gap-1'>
                                <AlterButton onClick={handleIncrement} disabled={num >= MAX_NUM}>
                                    {'+'}
                                </AlterButton>
                                <AlterButton onClick={handleDecrement} disabled={num <= MIN_NUM}>
                                    {'-'}
                                </AlterButton>
                            </div>
                        </div>
                    </div>
                </div>
                <EmojiLazyLoader emojis={emojis}>
                    <EmojiField
                        num={clamp(num || 1, MIN_NUM, MAX_NUM)}
                        rolling={rolling}
                        emojis={emojis}
                    />
                    <div className='w-full flex items-center justify-center'>
                        <Button accent='pink' onClick={handleGenerate} disabled={!canGenerate}>
                            generate
                        </Button>
                    </div>
                </EmojiLazyLoader>
            </div>
        </>
    )
}
