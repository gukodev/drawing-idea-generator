// script to generate emojis.json from emojis.txt
const path = require('path')
const fs = require('fs')

const EMOJIS_TXT = path.resolve('./src/data/emojis.txt')
const OUTPUT_JSON = path.resolve('./src/data/emojis.json')

function extractEmojis(text) {
    const emojiRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g
    return text.match(emojiRegex) || []
}

function r(path) {
    return path.split('\\').slice(-3).join('\\')
}

function main() {
    let extracted = []
    try {
        const emojis = fs.readFileSync(EMOJIS_TXT, 'utf8')
        extracted = extractEmojis(emojis)
        console.log(`extracted ${extracted.length} emojis from \`${r(EMOJIS_TXT)}\``)
    } catch (err) {
        console.error(`failed to extract emojis from \`${r(OUTPUT_JSON)}\``)
        console.error(err)
        return 1
    }

    try {
        fs.writeFileSync(OUTPUT_JSON, JSON.stringify(extracted))
        console.log(`wrote emojis to \`${r(OUTPUT_JSON)}\``)
    } catch (err) {
        console.error(`failed to write emojis to \`${r(OUTPUT_JSON)}\``)
        console.error(err)
        return 1
    }

    return 0
}

process.exit(main())
