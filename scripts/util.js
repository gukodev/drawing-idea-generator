function extractEmojis(text) {
    const emojiRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g
    return text.match(emojiRegex) || []
}

function r(path) {
    return path.split('\\').slice(-3).join('\\')
}

module.exports = {
    extractEmojis,
    r,
}
