const { readFileSync } = require('fs')
const path = require('path')
const {
  generateHash,
  verifyPassword,
  createToken,
  verifyToken
} = require('./jwt')

const config = {
  publicKey: readFileSync(path.resolve(__dirname, 'secrets', 'jwt_rsa.pem')),
  privateKey: readFileSync(path.resolve(__dirname, 'secrets', 'jwt_rsa'))
}

/* eslint-env jest */
describe('password', () => {
  let hash0
  let hash1
  let hash2
  let token0
  let token1
  it('checkInput', () => {
    expect(config).toHaveProperty('publicKey')
    expect(config).toHaveProperty('privateKey')
  })
  it('generateHash', async () => {
    hash0 = await generateHash('wwx')
    hash1 = await generateHash('wwx')
    hash2 = await generateHash()
    expect(hash0).toHaveLength(60)
    expect(hash1).toHaveLength(60)
    expect(hash2).toHaveLength(60)
    expect(hash0).not.toBe(hash1)
    expect(
      generateHash(hash0)
    ).rejects.toHaveProperty('message', 'bcrypt tried to hash another bcrypt hash')
  })
  it('verifyPassword', async () => {
    expect(verifyPassword(hash0, 'wwx')).toBe(true)
    expect(verifyPassword(hash1, 'wwx')).toBe(true)
    expect(verifyPassword(hash2, '')).toBe(true)
    expect(verifyPassword(hash0, 'wwx1')).toBe(false)
  })
  it('createToken', () => {
    token0 = createToken({ userId: 1, roles: ['admin'] }, config.privateKey)
    token1 = createToken({ userId: 1, roles: ['admin'] }, config.privateKey)
    expect(token0.length).toBeGreaterThan(20)
    expect(token1.length).toBeGreaterThan(20)
    expect(token0.length).not.toBe(token1)
  })
  it('verifyToken', () => {
    const data0 = verifyToken(token0, config.publicKey)
    const data1 = verifyToken(token1, config.publicKey)
    expect(data0).toHaveProperty('userId', 1)
    expect(data0).toHaveProperty('roles', ['admin'])
    expect(data1).toHaveProperty('userId', 1)
    expect(data1).toHaveProperty('roles', ['admin'])
  })
})
