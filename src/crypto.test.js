const getmac = require('getmac')
const crypto = require('crypto')
const {
  hash, sortObject, generateMac, hmac, base64,
  base64ToUrlSafe, decodeUrlSafeBase64,
  urlSafeBase64,
  encryptData,
  decryptData
} = require('./crypto')

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
    const generateMacC = generateMac('c')
    expect(generateMacC !== generateMac('d')).toEqual(true)
    expect(generateMacC !== generateMac('C')).toEqual(true)
    expect(generateMacC === generateMac('c')).toEqual(true)
  })
  it('hmac', async () => {
    expect(hmac('key', 'wwx')).toEqual('e8625f3eeaf93cb7c5ee9e38971f0a5a4700e6dd1e377f83082a8d969d66e816')
    expect(hmac('key', Buffer.from('wwx'))).toEqual('e8625f3eeaf93cb7c5ee9e38971f0a5a4700e6dd1e377f83082a8d969d66e816')
    expect(hmac('key', { username: 'wwx' })).toEqual('a328a4759c8acb7899d88d30a3dc195eccfaf134e5f4f120e8ecadcb470347c4')
  })
  it('base64', async () => {
    expect(base64('wwx')).toEqual('d3d4')
  })
  it('base64ToUrlSafe', async () => {
    expect(base64ToUrlSafe('+/==')).toEqual('-_==')
  })
  it('urlSafeBase64', async () => {
    expect(base64('a>?')).toEqual('YT4/')
    expect(urlSafeBase64('a>?')).toEqual('YT4_')
    expect(decodeUrlSafeBase64('YT4_').toString()).toEqual('a>?')
  })
  describe('decryptData', () => {
    it('wx', () => {
      const key = 'tiihtNczf5v6AKRyjwEUhQ=='
      const encryptedData = 'CiyLU1Aw2KjvrjMdj8YKliAjtP4gsMZM'
      + 'QmRzooG2xrDcvSnxIMXFufNstNGTyaGS'
      + '9uT5geRa0W4oTOb1WT7fJlAC+oNPdbB+'
      + '3hVbJSRgv+4lGOETKUQz6OYStslQ142d'
      + 'NCuabNPGBzlooOmB231qMM85d2/fV6Ch'
      + 'evvXvQP8Hkue1poOFtnEtpyxVLW1zAo6'
      + '/1Xx1COxFvrc2d7UL/lmHInNlxuacJXw'
      + 'u0fjpXfz/YqYzBIBzD6WUfTIF9GRHpOn'
      + '/Hz7saL8xz+W//FRAUid1OksQaQx4CMs'
      + '8LOddcQhULW4ucetDf96JcR3g0gfRK4P'
      + 'C7E/r7Z6xNrXd2UIeorGj5Ef7b1pJAYB'
      + '6Y5anaHqZ9J6nKEBvB4DnNLIVWSgARns'
      + '/8wR2SiRS7MNACwTyrGvt9ts8p12PKFd'
      + 'lqYTopNHR1Vf7XjfhQlVsAJdNiKdYmYV'
      + 'oKlaRv85IfVunYzO0IKXsyl7JCUjCpoG'
      + '20f0a04COwfneQAGGwd5oa+T8yO5hzuy'
      + 'Db/XcxxmK01EpqOyuxINew=='
      const iv = 'r7BXXKkLb8qrSNn05n0qiA=='
      expect(JSON.parse(decryptData(encryptedData, { iv, key })))
        .toEqual({
          gender: 1,
          language: 'zh_CN',
          nickName: 'Band',
          openId: 'oGZUI0egBJY1zhBYw2KhdUfwVJJE',
          city: 'Guangzhou',
          province: 'Guangdong',
          country: 'CN',
          avatarUrl: 'http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0',
          unionId: 'ocMvos6NjeKLIBqg5Mr9QjxrP1FA',
          watermark: { timestamp: 1477314187, appid: 'wx4f4bc4dec97d474b' }
        })
    })
    it('tt', () => {
      const encryptedData = 'FdbghVAD4vTyopgtMGsK3OVGLR/Q3dbTlL6esHOGFEs3XEKwEMMWbTl1ZrNr2/GbPK902T+CSx/L2oFP8dqOQvlP43FSPXjBjs1JiDwyHTRkt06DTkI2CuOQRCFnyLTEvwS59bI/i6sWJFW/aNRouzqHo2zEuYI4QNk4/ZFzTYhfoe49x/0RSL3Vq/L60PidONUmRR9FoGJMoGfn2bKEogeRJj2Euj/KB8vUhuRU4ZZuMa+pN0Cvsa6Rs6tjpaVoHA9ffFH7ZPmReA1wLsCObNj+6jPwdbtjR7Z3GBe9TKm4S5zc/ogakuA7Eamu/WoC8T4YhUc+/5Cb/ehmsL7S+cLk6TYHqs+82B6irAyjEIBvqdPe5JrmD3zytX2+1qfw'
      const iv = 'OgCZACTz0Eyk00UZrfbwWA=='
      const key = 'McK63aWbE0nYMS/JQx0G7w=='
      expect(Buffer.from(key, 'base64').length).toEqual(16)
      expect(
        JSON.parse(decryptData(encryptedData, { iv, key }))
      ).toEqual({
        nickName: 'wwx1991',
        avatarUrl: 'http://sf1-ttcdn-tos.pstatp.com/img/mosaic-legacy/3793/3131589739~120x256.image',
        gender: 0,
        city: '',
        province: '',
        country: '中国',
        language: '',
        openId: '.PyzymPXM1iOEGNt',
        watermark: {
          appid: 'ttc557b3ea5a7d3ffb', timestamp: 1576073046
        }
      })
    })
  })
  it('encryptData', () => {
    const key = crypto.randomBytes(16)
    const iv = crypto.randomBytes(16)
    const encryptedData = encryptData('secret', { key, iv })
    expect(decryptData(encryptedData, { key, iv })).toEqual('secret')
  })
})
