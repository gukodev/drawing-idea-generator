'use client'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import AlterButton from './AlterButton'

export default function EmojiGenerator() {
    const [inputError, setInputError] = useState<boolean>(false)
    const [num, setNum] = useState<number>(3)

    const validateInput = (num: number) => {
        if (num < 1 || num > 5) return false
        return true
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const parsed = parseInt(value)
        setNum(parsed)
    }

    const handleIncrement = () => {
        setNum((prev) => {
            const n = prev + 1
            if (!validateInput(n)) return prev
            return n
        })
    }

    const handleDecrement = () => {
        setNum((prev) => {
            const n = prev - 1
            if (n < 0) return prev
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

    return (
        <div>
            <div className='w-full flex items-center justify-center'>
                <div className='flex items-center gap-4'>
                    <span className='font-medium select-none text-xl text-slate-500'>
                        number of emojis
                    </span>
                    <div className='flex items-center gap-1'>
                        <input
                            type='number'
                            min={1}
                            max={5}
                            value={num}
                            onChange={handleInputChange}
                            placeholder='3'
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
                            <AlterButton onClick={handleIncrement}>{'+'}</AlterButton>
                            <AlterButton onClick={handleDecrement}>{'-'}</AlterButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
