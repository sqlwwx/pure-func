const emojiRegex = require('emoji-regex')()

// eslint-disable-next-line no-extend-native
String.prototype.removeInvalidChars = function removeInvalidChars () {
  return this.replace(emojiRegex, '')
}
