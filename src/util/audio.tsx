import { Audio, Play } from '@/contexts/AudioContext'

interface OnClickWithAudio {
    audio?: Audio
    onClick?: (...args: any[]) => any
    e: React.MouseEvent<HTMLButtonElement>
}

export function onClickWithAudio(play: Play, { audio = 'poin', onClick, e }: OnClickWithAudio) {
    if (audio) play(audio)
    if (onClick) onClick(e)
}
