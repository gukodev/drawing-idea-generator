import { Transition } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'

interface TooltipProps {
    text: string
    show: boolean
    x: number
    y: number
}

export default function Tooltip({ text, show, x, y }: TooltipProps) {
    const tcfg = {
        transition: 'transition-[opacity,transform] duration-100',
        from: 'opacity-0 scale-75',
        to: 'opacity-100 scale-100',
    }

    return (
        <Transition
            show={show}
            enter={tcfg.transition}
            leave={tcfg.transition}
            enterFrom={tcfg.from}
            leaveTo={tcfg.from}
            enterTo={tcfg.to}
            leaveFrom={tcfg.to}
            className={twMerge(
                'fixed z-10 rounded-lg p-1 leading-none pointer-events-none select-none',
                'text-sm text-slate-200 border-[1px] border-slate-500 bg-slate-700'
            )}
            style={{
                left: `${x}px`,
                top: `${y}px`,
            }}
        >
            {text}
        </Transition>
    )
}
