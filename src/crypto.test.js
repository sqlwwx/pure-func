const { hash, sortObject, generateMac, hmac, base64 } = require('./crypto')
const getmac = require('getmac')

/* eslint-env jest */
describe('crypto', () => {
  describe('sortObject', () => {
    it('simple obj', async () => {
      expect(sortObject({ username: 'wwx' })).toEqual([['username', 'wwx']])
      expect(sortObject(['wwx', 'lj'])).toEqual(['lj', 'wwx'])
    })
  })
  describe('hash', () => {
    it('hash null', () => {
      expect(hash()).toEqual('d41d8cd98f00b204e9800998ecf8427e')
    })
    it('hash str', () => {
      expect(hash('wwx')).toEqual('483a70a0179b1c6be6a9e83e22615358')
    })
    it('hash obj', () => {
      expect(hash({ username: 'wwx' })).toEqual(hash([['username', 'wwx']]))
    })
    it('hash buffer', async () => {
      expect(hash(Buffer.from('wwx'))).toEqual('483a70a0179b1c6be6a9e83e22615358')
    })
  })
  it('generateMac', () => {
    expect(getmac.isMac(generateMac())).toEqual(true)
    expect(getmac.isMac(generateMac())).toEqual(true)
    expect(getmac.isMac(generateMac())).toEqual(true)
    expect(getmac.isMac(generateMac('1'))).toEqual(true)
    expect(getmac.isMac(generateMac('2'))).toEqual(true)
    expect(getmac.isMac(generateMac('1234567890123'))).toEqual(true)
    expect(generateMac('123456789abc')).toEqual('12:34:56:78:9a:bc')
    expect(generateMac('123456789abC') !== '12:34:56:78:9a:bc').toEqual(true)
    expect(getmac.isMac(generateMac('a'))).toEqual(true)
    expect(getmac.isMac(generateMac('b'))).toEqual(true)
    expect(getmac.isMac(generateMac('fldjf8r8o34ldskjalfjfd;jfasd'))).toEqual(true)
    let generateMacC = generateMac('c')
    expect(generateMacC !== generateMac('d')).toEqual(true)
    expect(generateMacC !== generateMac('C')).toEqual(true)
    expect(generateMacC === generateMac('c')).toEqual(true)
  })
  it('hmac', async () => {
    expect(hmac('key', 'wwx')).toEqual('e8625f3eeaf93cb7c5ee9e38971f0a5a4700e6dd1e377f83082a8d969d66e816')
    expect(hmac('key', Buffer.from('wwx'))).toEqual('e8625f3eeaf93cb7c5ee9e38971f0a5a4700e6dd1e377f83082a8d969d66e816')
    expect(hmac('key', { 'username': 'wwx' })).toEqual('a328a4759c8acb7899d88d30a3dc195eccfaf134e5f4f120e8ecadcb470347c4')
  })
  it('base64', async () => {
    expect(base64('wwx')).toEqual('d3d4')
  })
})
