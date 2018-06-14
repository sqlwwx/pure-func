const { hash, sortObject, generateMac } = require('./crypto')
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
  })
  it('generateMac', () => {
    expect(getmac.isMac(generateMac())).toEqual(true)
    expect(getmac.isMac(generateMac('1'))).toEqual(true)
    expect(getmac.isMac(generateMac('2'))).toEqual(true)
    expect(getmac.isMac(generateMac('3'))).toEqual(true)
    expect(getmac.isMac(generateMac('a'))).toEqual(true)
    expect(getmac.isMac(generateMac('b'))).toEqual(true)
    expect(getmac.isMac(generateMac('fldjf8r8o34ldskjalfjfd;jfasd'))).toEqual(true)
  })
})
