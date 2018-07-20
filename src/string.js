const emojiRegex = require('emoji-regex')()

/* eslint-disable no-extend-native */
String.prototype.removeInvalidChars = function () {
  return this.replace(emojiRegex, '')
}
/* eslint-enable no-extend-native */
