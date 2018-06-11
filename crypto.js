const crypto = require('crypto')

const hash = (s = '', method = 'md5', format = 'hex') => {
  const sum = crypto.createHash(method)
  const isBuffer = Buffer.isBuffer(s)
  if (!isBuffer && typeof s === 'object') {
    s = JSON.stringify(sortObject(s))
  }
  sum.update(s, isBuffer ? 'binary' : 'utf8')
  return sum.digest(format)
}

const sortObject = (o) => {
  if (Array.isArray(o)) { return o.sort() }
  if (!o || typeof o !== 'object') {
    return o
  }
  const values = []
  const keys = Object.keys(o)
  return keys.sort().map(
    key => [key, sortObject(o[key])]
  )
}

function hmac (key, s, algorithm = 'sha256', format = 'hex') {
  const hmac = crypto.createHmac(algorithm, key)
  const isBuffer = Buffer.isBuffer(s)
  if (!isBuffer && typeof s === 'object') {
    s = JSON.stringify(sortObject(s))
  }
  hmac.update(s, isBuffer ? 'binary' : 'utf8')
  return hmac.digest(format)
}

function base64 (str) {
  return Buffer.from(str).toString('base64')
}

function generateMac (usercode = (Math.random() + '').split('.')[1]) {
  let ret = ''
  usercode = usercode.split('-').join('')
  if (usercode.length < 12) {
    usercode = hash(
      Array.from(
        Buffer.from(usercode)
      )
    )
  }
  for (var x = 0; x < 6; x++) {
    ret += usercode.substring(x * 2, x * 2 + 2) + ':'
  }
  ret = ret.substring(0, 17)
  return ret
}

exports.sortObject = sortObject
exports.hash = hash
exports.generateMac = generateMac
