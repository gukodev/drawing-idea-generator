// script to get emoji names from unicode.org
const path = require('path')
const fs = require('fs')
const { extractEmojis, r } = require('./util')

const EMOJIS_TXT = path.resolve('./src/data/emojis.txt')
const OUTPUT_JSON = path.resolve('./src/data/emojiNames.json')
const URL = 'https://unicode.org/Public/UNIDATA/UnicodeData.txt'

async function main() {
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

    let unicodeData
    try {
        unicodeData = await fetch(URL, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
        }).then((res) => res.text())
    } catch (err) {
        console.error(`failed to fetch unicode data from \`${URL}\``)
        console.error(err)
        return 1
    }

    unicodeData = unicodeData.split('\n')
    console.log(`fetched unicode data from \`${URL}\` (${unicodeData.length})`)

    const emojiNames = {}
    extracted.forEach((emoji) => {
        const codePoint = emoji.codePointAt(0).toString(16).toUpperCase()

        const line = unicodeData.find((line) => line.startsWith(`${codePoint};`))
        if (!line) {
            console.error(`failed to find unicode data for \`${emoji}\``)
            return
        }

        const name = line.split(';')[1].toLowerCase()
        if (!name) {
            console.error(`failed to find name for \`${emoji}\``)
            return
        }

        emojiNames[emoji] = name
    })

    try {
        fs.writeFileSync(OUTPUT_JSON, JSON.stringify(emojiNames))
        console.log(`wrote emoji names to \`${r(OUTPUT_JSON)}\``)
    } catch (err) {
        console.error(`failed to write emoji names to \`${r(OUTPUT_JSON)}\``)
        console.error(err)
        return 1
    }

    return 0
}

main().then((code) => process.exit(code))
