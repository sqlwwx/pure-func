const crypto = require('crypto')
const { randomNumberStr } = require('./number')

export const sortObject = o => {
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
  let toUpdateData = data
  if (!isBuffer && typeof data === 'object') {
    toUpdateData = JSON.stringify(sortObject(data))
  }
  return hash.update(toUpdateData, isBuffer ? 'binary' : encoding)
}

export const hash = (data = '', method = 'md5', format = 'hex') => {
  return updateData(
    crypto.createHash(method), data
  ).digest(format)
}

export function hmac (key, data, algorithm = 'sha256', format = 'hex') {
  return updateData(
    crypto.createHmac(algorithm, key),
    data
  ).digest(format)
}

export function base64 (str) {
  return Buffer.from(str).toString('base64')
}

export function generateMac (usercode = randomNumberStr(12)) {
  let ret = ''
  if (usercode.length !== 12 || !/^[a-z0-9]+$/.test(usercode)) {
    // eslint-disable-next-line no-param-reassign
    usercode = hash(usercode)
  }
  for (let x = 0; x < 6; x += 1) {
    ret += `${usercode.substring(x * 2, x * 2 + 2)}:`
  }
  ret = ret.substring(0, 17)
  return ret
}

export const base64ToUrlSafe = v => v.replace(/\//g, '_').replace(/\+/g, '-')

export const urlSafeBase64 = str => base64ToUrlSafe(
  Buffer.from(str).toString('base64')
)
