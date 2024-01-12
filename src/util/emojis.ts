import EMOJI_NAMES from './../data/emojiNames.json'
import EMOJIS from './../data/emojis.json'

const names = Object.keys(EMOJI_NAMES)

export function getRandomEmoji() {
    return EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
}

export function getRandomEmojis(len: number) {
    return Array.from({ length: len }, getRandomEmoji)
}

export function getEmojiName(emoji: string) {
    if (!names.includes(emoji)) return null
    return EMOJI_NAMES[emoji as keyof typeof EMOJI_NAMES]
}

export default EMOJIS
