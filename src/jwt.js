const Bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const RECOMMENDED_ROUNDS = 12

/**
 * 校验密码
 * @param hash
 * @param password
 */
const verifyPassword = (hash, password) => {
  return Bcrypt.compareSync(password, hash)
}

/**
 * 生成token
 * @param {object} data 数据
 * @param {string} privateKey 私钥
 */
const createToken = (data, privateKey, expiresIn = '1 days', algorithm = 'RS256') => {
  const { iat, exp, ...signData } = data
  return jwt.sign(
    signData,
    privateKey,
    { expiresIn, algorithm }
  )
}

/**
 * 校验token
 * @param {string} token
 * @param {string} publicKey
 */
const verifyToken = (token, publicKey, algorithms = ['RS256']) => {
  return jwt.verify(
    token,
    publicKey,
    { algorithms }
  )
}

const isBcryptHash = str => {
  const protocol = str.split('$')
  return protocol.length === 4
    && protocol[0] === ''
    && ['2a', '2b', '2y'].indexOf(protocol[1]) > -1
    && /^\d+$/.test(protocol[2])
    && protocol[3].length === 53
}

/**
 * hash password
 *
 */
const generateHash = async (password = '') => {
  if (isBcryptHash(password)) {
    throw new Error('bcrypt tried to hash another bcrypt hash')
  }
  return Bcrypt.hashSync(password, RECOMMENDED_ROUNDS)
}

module.exports = {
  generateHash,
  verifyPassword,
  createToken,
  verifyToken
}
