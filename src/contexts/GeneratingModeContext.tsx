'use client'
import React, { createContext, useContext, useState } from 'react'

export type GeneratingMode = 'idea' | 'emoji'

interface GeneratingModeContextValue {
    mode: GeneratingMode
    setMode: (mode: GeneratingMode) => void
}

const GeneratingModeContext = createContext<GeneratingModeContextValue | undefined>(undefined)

export const useGeneratingMode = () => {
    const context = useContext(GeneratingModeContext)
    if (!context) {
        throw new Error('useGeneratingMode must be used within a GeneratingModeProvider')
    }
    return context
}

export function GeneratingModeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<GeneratingMode>('idea')

    const value: GeneratingModeContextValue = {
        mode,
        setMode,
    }

    return <GeneratingModeContext.Provider value={value}>{children}</GeneratingModeContext.Provider>
}
