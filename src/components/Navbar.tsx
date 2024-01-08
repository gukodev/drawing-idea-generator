'use client'
import { useGeneratingMode } from '@/contexts/GeneratingModeContext'
import SelectiveButton from './SelectiveButton'

export default function NavBar() {
    const { mode, setMode } = useGeneratingMode()

    return (
        <div className='w-full py-5 border-b-2 border-slate-300 flex items-center justify-between'>
            <h1 className='text-4xl font-bold select-none'>🎨</h1>
            <div className='flex items-center gap-2'>
                <SelectiveButton selected={mode === 'idea'} onClick={() => setMode('idea')}>
                    🤔 idea
                </SelectiveButton>
                <SelectiveButton
                    selected={mode === 'emoji'}
                    onClick={() => setMode('emoji')}
                    accent='red'
                >
                    👩‍🎨 emoji
                </SelectiveButton>
            </div>
        </div>
    )
}
