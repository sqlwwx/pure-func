const crypto = require('crypto')
const { randomNumberStr } = require('./number')

export const sortObject = (o) => {
  if (Array.isArray(o)) { return o.sort() }
  if (!o || typeof o !== 'object') {
    return o
  }
  const keys = Object.keys(o)
  return keys.sort().map(
    key => [key, sortObject(o[key])]
  )
}

const updateData = (hash, data, encoding = 'utf8') => {
  const isBuffer = Buffer.isBuffer(data)
  if (!isBuffer && typeof data === 'object') {
    data = JSON.stringify(sortObject(data))
  }
  hash.update(data, isBuffer ? 'binary' : encoding)
}

export const hash = (s = '', method = 'md5', format = 'hex') => {
  const sum = crypto.createHash(method)
  updateData(sum, s)
  return sum.digest(format)
}

export function hmac (key, s, algorithm = 'sha256', format = 'hex') {
  const hmac = crypto.createHmac(algorithm, key)
  updateData(hmac, s)
  return hmac.digest(format)
}

export function base64 (str) {
  return Buffer.from(str).toString('base64')
}

export function generateMac (usercode = randomNumberStr(12)) {
  let ret = ''
  if (usercode.length !== 12 || !/^[a-z0-9]+$/.test(usercode)) {
    usercode = hash(usercode)
  }
  for (var x = 0; x < 6; x++) {
    ret += usercode.substring(x * 2, x * 2 + 2) + ':'
  }
  ret = ret.substring(0, 17)
  return ret
}
