'use client'

import { useGeneratingMode } from '@/contexts/GeneratingModeContext'
import EMOJIS from '@/util/emojis'
import EmojiGenerator from './EmojiGenerator'

export default function ModesHandler() {
    const { mode } = useGeneratingMode()

    return (
        <main className='py-10'>
            {mode === 'idea' && <div>idea</div>}
            {mode === 'emoji' && <EmojiGenerator emojis={EMOJIS} />}
        </main>
    )
}
