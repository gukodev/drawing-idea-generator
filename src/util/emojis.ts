import EMOJIS from './../data/emojis.json'

// function extractEmojis(text: string): string[] {
//     const emojiRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g
//     return text.match(emojiRegex) || []
// }

export function getRandomEmoji() {
    return EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
}

export function getRandomEmojis(len: number) {
    return Array.from({ length: len }, getRandomEmoji)
}

export default EMOJIS
