export const random = (from, to) => from + Math.floor(Math.random() * (to + 1 - from) - 0.0000001)
export const randomNumberStr = (length = 16) => Math.random().toString().slice(2, length + 2)

// eslint-disable-next-line no-extend-native
Number.prototype.genCode = function (
  characters = 'ABCDEFG1234hijklmnuvwxyzHIJKLMNOPQRSTabcdefgUVWXYZ56789opqrst'
) {
  const charactersLength = characters.length
  let num = this
  let out = ''
  for (let digit = Math.floor(Math.log(num) / Math.log(charactersLength)); digit >= 0; digit--) {
    const digitNum = Math.floor(num / Math.pow(charactersLength, digit))
    out += characters[digitNum]
    num = num - (digitNum * Math.pow(charactersLength, digit))
  }
  if (!out) { return characters[0] }
  return out
}
