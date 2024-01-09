import { Audio, Play } from '@/contexts/AudioContext'

interface OnClickWithAudio {
    play: Play
    audio?: Audio
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => any
}

export function onClickWithAudio({ play, audio = 'poin', onClick }: OnClickWithAudio) {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
        if (audio) play(audio)
        if (onClick) onClick(e)
    }
}
