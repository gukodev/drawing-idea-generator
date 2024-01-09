'use client'
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'

export const AUDIOS = {
    poin: {
        src: '/audio/poin.mp3',
        volume: 0.2,
    },
} as const
export type Audio = keyof typeof AUDIOS

interface AudioContextValue {
    audioEnabled: boolean
    setAudioEnabled: (enabled: boolean) => void
    play: (audio: Audio) => void
}
export type Play = ReturnType<typeof useAudio>['play']

const AudioContext = createContext<AudioContextValue | undefined>(undefined)

export const useAudio = () => {
    const context = useContext(AudioContext)
    if (!context) {
        throw new Error('useAudio must be used within a AudioProvider')
    }
    return context
}

export function AudioContextProvider({ children }: { children: React.ReactNode }) {
    const [audioEnabled, setAudioEnabled] = useState(true)
    const audios = useRef<Record<Audio, HTMLAudioElement | null>>(
        {} as Record<Audio, HTMLAudioElement | null>
    )

    useEffect(() => {
        Object.entries(AUDIOS).forEach(([audio, props]) => {
            audios.current[audio as Audio] = new Audio(props.src)
            try {
                const currAudio = audios.current[audio as Audio]
                if (!currAudio) throw new Error('audio is null')
                currAudio.volume = props.volume
                currAudio.load()
            } catch (err) {
                audios.current[audio as Audio] = null
                console.log('[audio] failed to load audio', audio, err)
            }
        })
    }, [])

    const play = (audio: Audio) => {
        const currAudio = audios.current[audio]
        if (!currAudio) return
        currAudio.currentTime = 0
        currAudio.play()
    }

    const value: AudioContextValue = {
        audioEnabled,
        setAudioEnabled,
        play,
    }

    return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}
